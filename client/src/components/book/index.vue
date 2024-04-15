<script setup lang="ts">
// import { faker } from '@faker-js/faker'
import { joinUrl } from '@/utils/utils'
import ReadEditor from 'aomao/editor/read.vue'

interface BookProps {
    footer?: boolean
    item: any
}

const props = withDefaults(defineProps<BookProps>(), {
    footer: true
})
</script>

<template>
    <div
        class="py-2 pb-3 px-3 min-w-[200px] border border-gray-300 rounded-lg cursor-pointer hover:shadow-lg transition-all transition-linear duration-400"
    >
        <router-link :to="`/knowledge/${item?.id}`">
            <img
                :src="joinUrl(item?.cover)"
                alt=""
                srcset=""
                class="w-full h-[150px] object-cover rounded-lg"
                v-if="item?.cover"
            />
            <div
                class="w-full h-[150px] bg-gray-100 rounded-lg flex justify-center items-center text-4xl text-gray-300"
                v-else
            >
                {{ item?.title?.split('')[0] }}
            </div>
        </router-link>
        <h2 class="text-[1rem] font-semibold mt-3 mb-1 line-clamp-1">
            {{ item?.title }}
        </h2>
        <p class="text-[0.85rem] line-clamp-2">
            <ReadEditor :content="item?.description ?? '该文章无简介'" />
        </p>
        <div class="mt-3 flex justify-between items-center" v-if="props.footer">
            <avatar />
            <span class="text-[0.75rem] text-gray-400">{{ item?.update_time }}</span>
        </div>
    </div>
</template>

<style scoped></style>
