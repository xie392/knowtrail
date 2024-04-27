<script setup lang="ts">
import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import { joinUrl } from '@/utils/utils'
import { ref } from 'vue'
import { watch } from 'vue'

const props = defineProps<{ item: any }>()

const content = ref('该文章无简介')

watch(
    () => props.item,
    (val) => {
        // 转为 html字符串转为 html 格式
        const html = new DOMParser().parseFromString(val?.content, 'text/html')
        content.value = html.body.textContent ?? '该文章无简介'
    },
    { immediate: true }
)

// console.log(props.item)
</script>

<template>
    <div class="w-full border-b border-gray-100 last:border-transparent py-5">
        <!-- Header -->
        <div class="flex-1 flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
                <avatar
                    :url="joinUrl(item?.user?.avatar) ?? faker.image.avatar()"
                    :user="item?.user"
                    :name="item?.user?.nick_name"
                />
            </div>
            <div class="flex items-center text-[0.8rem] text-gray-400">
                <span>{{ dayjs(item?.create_time).format('YYYY-MM-DD HH:mm') }}</span>
            </div>
        </div>
        <!-- Body -->
        <div class="flex gap-1 mb-2 min-h-[100px]">
            <router-link :to="`/doc/${item?.category_id}/${item?.id}`" target="_blank" class="flex-1">
                <h1
                    class="text-md font-bold mb-2 text-ellipsis whitespace-nowrap overflow-hidden w-[calc(100%-10px)] hover:text-main transition-all duration-400"
                >
                    {{ item?.title }}
                </h1>
                <p class="text-[0.85rem] text-ellipsis overflow-hidden line-clamp-2 mt-3">
                    {{ content }}
                </p>
            </router-link>
            <div class="w-[180px] flex h-full items-center justify-end" v-if="item?.cover">
                <img
                    :src="joinUrl(item?.cover)"
                    alt=""
                    srcset=""
                    height="auto"
                    class="rounded w-[160px] h-[100px] object-cover"
                />
            </div>
        </div>
        <!-- Footer -->
        <!-- <t-space :size="2">
            <t-button theme="default" variant="text" size="small">
                <template #icon>
                    <t-icon name="thumb-up-2" class="text-textPrimary" />
                </template>
                {{ useFormatNumber(faker.number.int(100000)) }}
            </t-button>
            <t-button theme="default" variant="text" size="small">
                <template #icon>
                    <t-icon name="star" class="text-textPrimary" />
                </template>
                {{ useFormatNumber(faker.number.int(100000)) }}
            </t-button>
            <t-button theme="default" variant="text" size="small">
                <template #icon>
                    <t-icon name="arrow-right-circle" class="text-textPrimary" />
                </template>
                查看原文
            </t-button>
        </t-space> -->
    </div>
</template>

<style scoped></style>
