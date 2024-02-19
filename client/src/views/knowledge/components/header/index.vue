<script setup lang="ts">
import type { DOC } from '@/db/type'
import { liveQuery } from 'dexie'
import { useObservable } from '@vueuse/rxjs'
import UserDBStore from '@/db'
import { useRoute } from 'vue-router'

const { id } = useRoute().params as { id: string }

// @ts-ignore
const doc = useObservable<DOC>(liveQuery(() => UserDBStore.findOneById(UserDBStore.tables.doc, 'id', id)))

const updateDocReadonly = async (readonly: boolean) => {
    doc.value &&
        (await UserDBStore.update(UserDBStore.tables.doc, 'id', id, {
            ...doc.value,
            readonly
        }))
}
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
        <div class="flex gap-2" v-if=" ">
            <t-button variant="text">
                <template #icon>
                    <t-icon name="star"></t-icon>
                </template>
            </t-button>
            <t-button theme="primary" v-if="doc?.readonly" @click="updateDocReadonly(false)">编辑</t-button>
            <t-button theme="primary" v-else @click="updateDocReadonly(true)">更新</t-button>
        </div>
    </div>
</template>

<style scoped></style>
