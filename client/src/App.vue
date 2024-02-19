<script setup lang="ts">
import Header from '@/layout/header/index.vue'
import { baseRoutes } from '@/router'
</script>

<template>
    <Header v-if="baseRoutes.find((v) => v.name === $route.name)"></Header>
    <router-views />
</template>
