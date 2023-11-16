<script setup lang="ts">
import Logo from '@/layout/components/logo/index.vue'
</script>

<template>
    <div class="flex justify-center items-center min-h-screen flex-col">
        <div class="mb-8 flex justify-center">
            <Logo class-name="h-6 w-[200px]" />
        </div>
        <div class="container w-[400px] px-8 py-10 rounded-xl">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.container {
    box-shadow: rgb(0 0 0/10%) 0 0 10px;
}
</style>
