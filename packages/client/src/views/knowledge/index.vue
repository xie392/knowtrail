<script setup lang="ts">
import Sidebar from '@/layout/sidebar/index.vue'
import Search from '@/layout/sidebar/components/search/index.vue'
import Title from './components/title/index.vue'
import Menu from './components/menu/index.vue'
import Home from './components/home/index.vue'
import Header from './components/header/index.vue'
</script>

<template>
    <div class="flex items-start">
        <div class="h-screen sticky top-0 left-0 bg-bgPrimary z-50 border-r border-gray-200">
            <Sidebar :footer="false">
                <template #header>
                    <div class="mt-4">
                        <Title class="mb-8" />
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
