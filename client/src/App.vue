<script setup lang="ts">
import Header from '@/layout/header/index.vue'
import { HeaderWhiteList } from '@/utils/constants'
</script>

<template>
    <Header v-if="HeaderWhiteList.includes($route.name as string)"></Header>
    <router-views />
</template>
