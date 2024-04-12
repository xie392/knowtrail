<script setup lang="ts">
import BookIcon from '@/components/icon/BookIcon.vue'

defineProps<{ category: any }>()
</script>

<template>
    <div class="w-full flex justify-between px-3">
        <div class="flex items-center gap-[6px]">
            <BookIcon size="28px" />
            <span
                class="flex text-[0.95rem] font-bold max-w-[110px] whitespace-nowrap overflow-hidden text-ellipsis select-none"
                title="hahh"
            >
                {{ category?.title }}
            </span>
            <!-- 'https'   -->
            <t-icon
                :name="category?.status === 0 ? 'https' : 'earth'"
                style="width: 12px; height: 12px"
                class="icon"
            ></t-icon>
        </div>
        <t-button size="small" shape="square" theme="default" variant="text">
            <template #icon>
                <t-icon name="ellipsis" style="width: 18px; height: 18px" />
            </template>
        </t-button>
    </div>
</template>

<style scoped></style>
