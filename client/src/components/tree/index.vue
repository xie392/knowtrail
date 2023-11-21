<script setup lang="ts">
interface Items {
    label: string
    value: string
    children?: Items[]
}

interface TreeProps {
    items: Items[]
}

const props = defineProps<TreeProps>()
</script>

<template>
    <!-- 树形结构 -->
    ul
</template>

<style scoped></style>
