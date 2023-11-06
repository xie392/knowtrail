<script setup lang="ts">
import Header from '@/layout/header/index.vue'
// import { Layout } from 'tdesign-vue-next'
// import { useRouter, useRoute } from 'vue-router'
// import { useUserStore } from './stores/user'
// import { storeToRefs } from 'pinia'
// import { onMounted } from 'vue'
// import { useLogin } from '@/hooks/useLogin'

// const router = useRouter()
// const route = useRoute()
// const { isLogin } = useLogin()

// const init = () => {
//     const path = route.path
//     console.log("path", path,isLogin.value)
//     if (isLogin.value && path === '/') {
//         router.push('/workspace/dashboard')
//     }
// }
// onMounted(() => init())

// 白名单
const whiteList: string[] = ['home', 'playground', 'notes', 'books', 'read']
</script>

<template>
    <Header v-if="whiteList.includes($route.name as string)"></Header>
    <router-views />
</template>
