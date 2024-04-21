<script setup lang="ts">
import { useRoute } from 'vue-router'
import { DocService } from '@/api/doc.api'
import { STATUS } from '@/shared'
import { MessagePlugin } from 'tdesign-vue-next'
import { omit } from 'lodash-es'
import UserDBStore from '@/db'
import { liveQuery } from 'dexie'
import { useObservable } from '@vueuse/rxjs'
import { ref, type Ref } from 'vue'
import type { DOC } from '@/db/type'
import SaveModal from '@/components/modal/save-modal/index.vue'
// import CollaboratorIcon from '@/components/icon/CollaboratorIcon.vue'
// import { LinkIcon } from 'tdesign-icons-vue-next'
// import { useClipboard } from '@vueuse/core'
// import { useLogin } from '@/hooks/useLogin'

const route = useRoute()
const pid = route.params.pid as string
const id = route.params.id as string

const doc: Ref<DOC> = useObservable(
    // @ts-ignore
    liveQuery(() => UserDBStore.findOneById(UserDBStore.tables.doc, 'id', id))
)

const updateDocReadonly = async (type?: STATUS) => {
    try {
        const docs = await UserDBStore.findOneById(UserDBStore.tables.doc, 'id', id)
        if (type === STATUS.PREVIEW) {
            modalShow.value = true
            // const { code, data } = await DocService.UpdateDocApi(
            //     id,
            //     // @ts-ignore
            //     omit(doc.value, ['create_time', 'update_time', 'author'])
            // )
            // if (code !== 200) return MessagePlugin.error('更新文档失败')
            // await UserDBStore.update(UserDBStore.tables.doc, 'id', id, {
            //     ...docs,
            //     ...data,
            //     readonly: true
            // })
        } else {
            await UserDBStore.update(UserDBStore.tables.doc, 'id', id, {
                ...docs,
                readonly: false
            })
        }
    } catch (error: any) {
        MessagePlugin.error(error.message ?? '未知错误')
    }
}

const modalShow = ref<boolean>(false)

const save = async (options: { tags: string; cover: string }) => {
    const docs = await UserDBStore.findOneById(UserDBStore.tables.doc, 'id', id)

    const { code, data } = await DocService.UpdateDocApi(
        id,
        // @ts-ignore
        {
            ...omit(doc.value, ['create_time', 'update_time', 'author']),
            cover: options.cover,
            tag_type: options.tags
        }
    )
    if (code !== 200) return MessagePlugin.error('更新文档失败')
    await UserDBStore.update(UserDBStore.tables.doc, 'id', id, {
        ...docs,
        ...data,
        readonly: true
    })
}

// const { copy, isSupported } = useClipboard()
// const { user } = useLogin()
// const copyLink = () => {
//     // 生成链接
//     const url = `${window.location.origin}/doc/${id}?token=${user.value?.accessToken?.split(' ')?.[1]}`
//     // 复制链接
//     if (isSupported) {
//         copy(url)
//         MessagePlugin.success('复制成功')
//     } else {
//         MessagePlugin.error('浏览器不支持复制功能')
//     }
// }
</script>

<template>
    <div
        class="w-full h-14 bg-bgPrimary flex justify-between items-center px-5 sticky top-0 z-10 border-b border-gray-200"
    >
        <div>
            <h2 class="max-w-[400px] text-ellipsis whitespace-nowrap overflow-hidden" :title="doc?.title">
                {{ doc?.title }}
            </h2>
        </div>
        <div class="flex gap-2">
            <!-- <t-popup trigger="click" placement="bottom-right">
                <t-button theme="primary" v-show="!doc?.readonly">协作</t-button>

                <template #content>
                    <div class="flex gap-2 items-center min-w-[300px] p-2 rounded-md bg-white">
                        <div class="p-2 bg-[#4b73b3] rounded-md">
                            <CollaboratorIcon class="text-white text-xl" />
                        </div>
                        <div class="flex-1 flex flex-col text-sm">
                            <h4 class="!text-[0.75em] font-semibold m-0">添加协作者</h4>
                            <p class="!text-[0.5em] text-gray-500 p-0 m-0">过链接分享文档给其他人协作编辑</p>
                        </div>
                        <div class="w-[100px] flex justify-end">
                            <t-tooltip content="复制链接">
                                <t-button shape="circle" size="small" @click="copyLink">
                                    <LinkIcon slot="icon" />
                                </t-button>
                            </t-tooltip>
                        </div>
                    </div>
                </template>
            </t-popup> -->

            <t-button theme="primary" v-if="doc?.readonly" @click="updateDocReadonly(STATUS.EDIT)">编辑</t-button>
            <t-button theme="primary" v-else @click="updateDocReadonly(STATUS.PREVIEW)">更新</t-button>
        </div>
    </div>

    <!-- 保存文档 -->
    <SaveModal v-model:visible="modalShow" @save="save" :url="doc?.cover" :tag_type="doc?.tag_type" />
</template>

<style scoped></style>
