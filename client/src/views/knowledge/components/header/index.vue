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

const route = useRoute()
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
            <t-button variant="text">
                <template #icon>
                    <t-icon name="star"></t-icon>
                </template>
            </t-button>
            <t-button theme="primary" v-if="doc?.readonly" @click="updateDocReadonly(STATUS.EDIT)">编辑</t-button>
            <t-button theme="primary" v-else @click="updateDocReadonly(STATUS.PREVIEW)">更新</t-button>
        </div>
    </div>

    <!-- 保存文档 -->
    <SaveModal v-model:visible="modalShow" />
</template>

<style scoped></style>
