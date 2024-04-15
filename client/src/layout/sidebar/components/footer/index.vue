<script setup lang="ts">
import { useLogin } from '@/hooks/useLogin'
import { joinUrl } from '@/utils/utils'

const { user } = useLogin()
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
            <t-button shape="square" theme="default" variant="text">
                <template #icon>
                    <t-icon name="ellipsis" />
                </template>
            </t-button>
        </div>
    </div>
</template>
