<script setup lang="ts">
import AomaoEditor from 'aomao/index'
import { useRoute } from 'vue-router'
import { DocService } from '@/api/doc.api'
import { watch } from 'vue'
import UserDBStore from '@/db'

const route = useRoute()
const getDocDetail = async () => {
    if (!route.params.id) return
    const { data } = await DocService.GetDocByIdApi(route.params.id as string)
    const doc = await UserDBStore.findOneById(UserDBStore.tables.doc, 'id', route.params.id as string)
    if (doc) {
        await UserDBStore.update(UserDBStore.tables.doc, 'id', route.params.id as string, {
            ...doc,
            ...data
        })
    } else {
        await UserDBStore.add(UserDBStore.tables.doc, {
            ...data,
            readonly: true
        })
    }
}
watch(
    () => route.params.id,
    () => {
        getDocDetail()
    },
    { immediate: true }
)
</script>

<template>
    <div class="flex w-full">
        <!-- 编辑区域 -->
        <AomaoEditor />

        <!-- 侧边栏 -->
        <div class="w-[300px] mt-5 min-h-min p-5"></div>
    </div>
</template>

<style scoped></style>
