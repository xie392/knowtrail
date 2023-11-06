<script setup lang="ts">
interface ButtonProps {
    active?: boolean
}

const props = defineProps<ButtonProps>()
</script>

<template>
    <button
        class="p-[2px] px-[6px] rounded"
        :class="props.active ? 'bg-[#dbeafe] text-[#4096ff]' : 'hover:bg-gray-100'"
    >
        <slot></slot>
    </button>
</template>

<style scoped></style>
