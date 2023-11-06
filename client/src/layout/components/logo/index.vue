<script setup lang="ts">
import { useBaseStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import LightPng from '@/assets/logo-light.png'
import DarkPng from '@/assets/logo-dark.png'
import { useLogin } from '@/hooks/useLogin'

interface LogoProps {
    className?: string
    size?: 'small' | 'medium' | 'large'
}
const props = withDefaults(defineProps<LogoProps>(), {
    size: 'medium'
})

const { theme } = storeToRefs(useBaseStore())
const { isLogin } = useLogin()

const url = computed(() => {
    return theme.value === 'light' ? LightPng : DarkPng
})
</script>

<template>
    <router-link :to="isLogin ? '/workspace/dashboard' : '/'" class="flex items-center h-[24px]">
        <img
            :src="url"
            alt="KownTrail 知迹"
            srcset=""
            class="object-cover"
            :class="[
                props.size === 'small' && 'h-5 w-auto',
                props.size === 'medium' && 'h-6 w-[156px]',
                props.className
            ]"
        />
    </router-link>
</template>

<style scoped></style>
