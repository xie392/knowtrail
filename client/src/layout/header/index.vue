<script setup lang="ts">
import Logo from '@/layout/components/logo/index.vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import { DocService } from '@/api/doc.api'
// import { useRoute } from 'vue-router'

const nav = [
    { name: '首页', path: '/about', value: 'home' },
    { name: '知识广场', path: '/playground/notes', value: 'notes' }
    // { name: '知识库广场', path: '/playground/books', value: 'books' }
    // { name: '工作台', path: '/workspace', value: 'workspace' },
]

interface LayoutProps {
    className?: string
}
const props = defineProps<LayoutProps>()

const userStore = useUserStore()
const { isLogin } = storeToRefs(userStore)

const router = useRouter()
const keyword = ref('')
const handlerDown = async (value: string) => {
    router.push(`/search?keyword=${value}`)
}
</script>

<template>
    <div class="border-b border-gray-200 h-14 sticky top-0 z-30 bg-bgPrimary overflow-hidden">
        <t-header class="w-full h-full max-w-[1280px] mx-auto mob:hidden" :class="props.className">
            <t-head-menu theme="light" :value="$route.name as string">
                <template #logo>
                    <Logo />
                </template>
                <t-space :size="6">
                    <router-link :to="v.path" v-for="v in nav" :key="v.name">
                        <t-menu-item :value="v.value">
                            {{ v.name }}
                        </t-menu-item>
                    </router-link>
                </t-space>
                <template #operations>
                    <div class="flex items-center">
                        <!-- <router-link to="/search">
                            <t-icon class="t-menu__operations-icon" name="search" />
                        </router-link> -->
                        <t-input
                            clearable
                            placeholder="请输入文档名称"
                            v-model="keyword"
                            class="w-[300px] mr-5"
                            :onEnter="handlerDown"
                        >
                            <template #prefix-icon>
                                <t-icon name="search" size="small" @click="handlerDown(keyword)" />
                            </template>
                        </t-input>

                        <div v-if="isLogin" class="flex items-center gap-6">
                            <t-dropdown
                                :options="[
                                    { content: '工作台', value: 1 },
                                    { content: '个人中心', value: 2 },
                                    { content: '退出登录', value: 3 }
                                ]"
                                placement="bottom"
                                trigger="click"
                                :min-column-width="100"
                            >
                                <t-avatar
                                    image="https://tdesign.gtimg.com/site/avatar.jpg"
                                    size="small"
                                    class="cursor-pointer"
                                />
                            </t-dropdown>
                        </div>
                        <router-link to="/login" v-else>
                            <t-button>登录 / 注册</t-button>
                        </router-link>
                    </div>
                </template>
            </t-head-menu>
        </t-header>
    </div>
</template>

<style scoped></style>
