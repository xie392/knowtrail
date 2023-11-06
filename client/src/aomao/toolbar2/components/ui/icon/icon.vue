<script setup lang="ts">
import { IconName, IconMap } from './index'

interface IconProps {
    name: IconName
}

const props = defineProps<IconProps>()
</script>

<template>
    <span
        class="leading-[0] inline-block text-center align-[-.125rem] text-inherit font-normal"
        v-html="IconMap[props.name]"
    >
    </span>
</template>

<style scoped></style>
