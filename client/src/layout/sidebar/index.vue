<script setup lang="ts">
import Header from './components/header/index.vue'
import Search from './components/search/index.vue'
import Menu from './components/menu/index.vue'
import Footer from './components/footer/index.vue'

interface SidebarProps {
    footer?: boolean
}

const props = withDefaults(defineProps<SidebarProps>(), {
    footer: true
})
</script>

<template>
    <div class="w-[260px] relative h-screen py-3">
        <div class="h-[calc(100vh-100px)] overflow-y-auto overflow-x-hidden">
            <Header></Header>
            <slot name="header">
                <t-space class="w-full pt-5" direction="vertical" size="small">
                    <Search />
                    <Menu></Menu>
                </t-space>
            </slot>
        </div>
        <slot name="footer">
            <Footer v-if="props.footer"></Footer>
        </slot>
    </div>
</template>

<style scoped></style>
