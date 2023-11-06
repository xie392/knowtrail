<script setup lang="ts">
import Collapse from './components/collapse.vue'

const menus = [
    { name: '开始', icon: 'time', path: '/workspace/dashboard' },
    { name: '收藏', icon: 'star', path: '/workspace/collections' },
    { name: '关注', icon: 'user-add', path: '/workspace/focus' },
    { name: '模板', icon: 'template', path: '/workspace/templates' }
]
</script>

<template>
    <t-menu width="100%" :value="$route.path">
        <t-menu-item
            :value="item.path"
            v-for="item in menus"
            :key="item.name"
            @click="$router.push(item.path)"
        >
            <template #icon>
                <t-icon :name="item.icon" style="width: 16px; height: 16px" />
            </template>
            {{ item.name }}
        </t-menu-item>

        <t-divider />

        <Collapse />
    </t-menu>
</template>

<style scoped>
::v-deep(.t-collapse-panel__header) {
    background-color: var(--td-brand-color-light);
    cursor: pointer;
    color: var(--td-brand-color);
    padding: 7px 10px 7px 16px;
    user-select: none;
}
</style>
