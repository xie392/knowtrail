<script setup lang="ts">
import Sidebar from '@/layout/sidebar/index.vue'
import Search from '@/layout/sidebar/components/search/index.vue'
import Title from './components/title/index.vue'
import Menu from './components/menu/index.vue'
import Home from './components/home/index.vue'
import Header from './components/header/index.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { CategoryService } from '@/api/category.api'
import UserDBStore from '@/db'

const route = useRoute()
const category = ref<any>(null)
const getCategoryById = async () => {
    const { data } = await CategoryService.GetCategoryByIdApi(route.params.pid as string)
    if (!data) return

    const docs = await UserDBStore.findOneById(UserDBStore.tables.docs, 'id', route.params.pid as string)

    category.value = data

    // 更新文档库
    if (docs) {
        await UserDBStore.update(UserDBStore.tables.docs, 'id', route.params.pid as string, {
            ...docs,
            ...data
        })
    } else {
        await UserDBStore.add(UserDBStore.tables.docs, data)
    }

    data?.doc?.forEach(async (item: any) => {
        const doc = await UserDBStore.findOneById(UserDBStore.tables.doc, 'id', item.id)
        if (doc) {
            await UserDBStore.update(UserDBStore.tables.doc, 'id', item.id, {
                ...doc,
                ...item
            })
        } else {
            await UserDBStore.add(UserDBStore.tables.doc, {
                ...item,
                readonly: true
            })
        }
    })
}

watch(
    route,
    () => {
        getCategoryById()
    },
    { immediate: true }
)
</script>

<template>
    <div class="flex items-start">
        <div class="h-screen sticky top-0 left-0 bg-bgPrimary z-50 border-r border-gray-200">
            <Sidebar :footer="false">
                <template #header>
                    <div class="mt-4">
                        <Title class="mb-8" :category="category" />
                        <Search class="mb-3" />
                        <Menu :key="$route.fullPath + Math.random()" />
                    </div>
                </template>
            </Sidebar>
        </div>
        <div class="flex-1 min-h-screen">
            <Home v-if="!$route.params.id" />
            <div v-else>
                <Header :key="$route.fullPath + Math.random()" />
                <router-views :key="$route.fullPath + Math.random()" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.header {
    position: static;
}
</style>
