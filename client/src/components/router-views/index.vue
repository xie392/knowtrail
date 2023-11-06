<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
    <router-view v-slot="{ Component }">
        <!-- <transition :name="($route.meta.transition as string) ?? 'slide-fade'"> -->
        <keep-alive>
            <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive ?? true" />
        </keep-alive>
        <!-- </transition> -->
        <!-- <transition :name="($route.meta.transition as string) ?? 'slide-fade'"> -->
        <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive === false" />
        <!-- </transition> -->
    </router-view>
</template>

<style lang="scss" scoped>
.slide-fade-enter-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
    transform: translateX(-30px);
    opacity: 0;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}
</style>
