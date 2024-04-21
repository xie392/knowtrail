<script setup lang="ts">
import { type EngineInterface } from '@aomao/engine'
import Toolbar from '../toolbar'
import { onUnmounted, ref, watch, type Ref } from 'vue'
import { defaultPCToolbarItems } from 'aomao/config'
import { useFocus } from '@vueuse/core'
import { debounce } from '@/utils/utils'
import { createEditor } from 'aomao/utils/createEditor'
import UserDBStore from '@/db'
import { liveQuery } from 'dexie'
import { useObservable } from '@vueuse/rxjs'
import type { DOC } from '@/db/type'
import { useRoute } from 'vue-router'
import { cloneDeep } from 'lodash-es'
import { download } from '../utils/download'
import { onMounted } from 'vue'
import { createSocket } from '@/utils/socket'
import { useLogin } from '@/hooks/useLogin'
import type { Socket } from 'socket.io-client'

interface EditorProps {
    toolbarClassName?: string
    /** 是否开启协作 */
    collaboration?: boolean
    /** 是否开启编辑 */
    readonly?: boolean
}

const route = useRoute()
const id = route.params.id as string

const doc: Ref<DOC> = useObservable(
    // @ts-ignore
    liveQuery(async () => await UserDBStore.findOneById(UserDBStore.tables.doc, 'id', id))
)

const props = withDefaults(defineProps<EditorProps>(), {})

const editor = ref<EngineInterface | null>()
const editorRef = ref<HTMLDivElement | null>(null)
const titleRef = ref<HTMLDivElement | null>(null)

const debounceSave = debounce(async (options: any) => {
    const docs = cloneDeep(doc.value)
    await UserDBStore.update(UserDBStore.tables.doc, 'id', id, {
        ...docs,
        ...options
    })
}, 1000)

const init = () => {
    if (!editorRef.value) return
    if (editor.value) return

    const engine: EngineInterface | null = createEditor(editorRef.value, {
        readonly: props.collaboration ? true : false ?? doc.value?.readonly ?? true,
        placeholder: doc.value?.readonly ? '' : '请输入内容'
    })
    if (!engine) return
    engine.setValue(doc.value?.content)

    engine.on('change', () => {
        debounceSave({ content: engine.model.toValue() })
        if (wsSocket.value) {
            wsSocket.value.emit('content', {
                id: doc.value?.id,
                userId: user.value?.data?.id,
                content: engine.model.toValue()
            })
        }
    })
    editor.value = engine
}

const saveTitle = async (e: FocusEvent) => {
    const title = (e.target as HTMLDivElement)!.textContent as string
    debounceSave({ title })

    if (wsSocket.value) {
        wsSocket.value.send('title', {
            id: doc.value?.id,
            userId: user.value?.data?.id,
            title
        })
    }
}

watch(doc, (newVal, oldVal) => {
    init()
    if (editor.value && newVal?.readonly !== oldVal?.readonly) {
        editor.value.readonly = doc.value?.readonly ?? true
    }
    if (editor.value) editor.value.readonly && download()
})

const { user } = useLogin()
const wsSocket = ref<Socket | null>(null)

const initCollaboration = () => {
    let token = route.query?.token as string
    token = token ? 'Bearer ' + token : user.value?.accessToken
    // console.log('token', token)
    const socket = createSocket(token)

    socket.on('docUpdate', function (data) {
        console.log('docUpdate', data)
    })

    socket.on('content', function (data) {
        console.log('docUpdate', data)
    })

    wsSocket.value = socket
}

onMounted(() => {
    if (props.collaboration) {
        initCollaboration()
    }
})

onUnmounted(() => editor.value?.destroy())
</script>

<template>
    <div class="w-full pb-10">
        <div
            class="w-full fixed z-10 flex items-center px-3 bg-bgPrimary justify-center min-h-[40px] border-b border-gray-200"
            v-if="!doc?.readonly"
            :class="props.toolbarClassName"
        >
            <Toolbar
                v-if="editor"
                :engine="editor as EngineInterface"
                :items="defaultPCToolbarItems"
                :readonly="doc?.readonly"
            />
        </div>

        <div class="px-10 mx-auto" :class="!doc?.readonly && 'pt-[50px]'">
            <div class="pt-8" :class="doc?.readonly && 'pt-0'">
                <div
                    class="editor-title focus-visible:outline-none text-[28px] font-bold mb-5 border-b pb-2 break-all"
                    :class="!doc?.readonly && 'cursor-text'"
                    data-placeholder="未命名文档"
                    @keydown.enter.prevent="useFocus(editorRef!, { initialValue: true })"
                    :contentEditable="!doc?.readonly"
                    @blur="saveTitle"
                    :textContent="doc?.title"
                    ref="titleRef"
                />
            </div>
            <div class="mt-3" ref="editorRef"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../style/base.scss';
</style>
