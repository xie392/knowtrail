<script setup lang="ts">
import Sidebar from '@/layout/sidebar/index.vue'
// import Search from '@/layout/sidebar/components/search/index.vue'
// import Title from './components/title/index.vue'
// import Menu from './components/menu/index.vue'
</script>

<template>
    <div class="flex items-start">
        <div class="h-screen sticky top-0 left-0 bg-bgPrimary z-10 border-r border-gray-200">
            <Sidebar />
            <!--  v-if="$route.name !== 'editor'" -->
            <!-- <Sidebar v-else :footer="false">
                <template #header>
                    <div class="mt-4">
                        <Title class="mb-8"></Title>
                        <Search class="mb-3"></Search>
                        <Menu></Menu>
                    </div>
                </template>
            </Sidebar> -->
        </div>
        <div class="flex-1">
            <router-views />
        </div>
    </div>
</template>

<style scoped>
.header {
    position: static;
}
</style>
