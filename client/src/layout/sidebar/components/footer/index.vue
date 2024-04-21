<script setup lang="ts">
import { useLogin } from '@/hooks/useLogin'
import { useUserStore } from '@/stores/user'
import { joinUrl } from '@/utils/utils'
import { useRouter } from 'vue-router'

const { user } = useLogin()
const userStore = useUserStore()
const router = useRouter()
const options = [
    { content: '个人中心', value: 2, onClick: () => router.push(`/user/${user.value?.data?.id}`) },
    { content: '退出登录', value: 3, onClick: () => userStore.logout() }
]
</script>

<template>
    <div
        class="fixed w-[260px] bottom-0 z-30 px-2 py-2 pb-3 justify-between items-center gap-1 flex flex-col border-t border-gray-200 bg-bgPrimary"
    >
        <!-- <t-button class="w-full">
            <template #icon>
                <t-icon name="user-add" />
            </template>
            开通会员
        </t-button> -->
        <div class="w-full flex justify-between items-center cursor-pointer list py-1 px-2 pr-0">
            <div class="flex items-center gap-2">
                <t-avatar size="24px" :image="joinUrl(user?.data?.avatar)" />
                <span class="text-[0.875rem]">{{ user?.data?.nick_name }}</span>
            </div>
            <!-- <t-popup>
                <t-button shape="square" theme="default" variant="text">
                    <template #icon>
                        <t-icon name="ellipsis" />
                    </template>
                </t-button>
                <template #content>
                    <div class="flex gap-2 items-center min-w-[100px] p-2 rounded-md bg-white">

                    </div>
                </template>
            </t-popup> -->
            <t-dropdown :options="options" placement="bottom" trigger="click" :min-column-width="100">
                <t-button shape="square" theme="default" variant="text">
                    <template #icon>
                        <t-icon name="ellipsis" />
                    </template>
                </t-button>
            </t-dropdown>
        </div>
    </div>
</template>
