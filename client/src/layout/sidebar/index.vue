<script setup lang="ts">
import Header from './components/header/index.vue'
import Search from './components/search/index.vue'
import Menu from './components/menu/index.vue'
import Footer from './components/footer/index.vue'

interface SidebarProps {
    footer?: boolean
    header?: boolean
}

withDefaults(defineProps<SidebarProps>(), { footer: true, header: true })
</script>

<template>
    <div class="w-[260px] relative h-screen">
        <div class="overflow-y-auto overflow-x-hidden pt-3" :class="footer ? 'h-[calc(100vh-112px)]' : 'h-screen pb-0'">
            <Header v-if="header" />
            <slot name="header">
                <t-space class="w-full pt-5" direction="vertical" size="small">
                    <Search />
                    <Menu />
                </t-space>
            </slot>
        </div>
        <slot name="footer">
            <Footer v-if="footer"></Footer>
        </slot>
    </div>
</template>

<style scoped></style>
