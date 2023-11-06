<script setup lang="ts">
import book from '@/components/book/index.vue'
</script>

<template>
    <div class="py-5">
        <t-swiper class="tdesign-demo-block--swiper" animation="slide" :height="250">
            <t-swiper-item v-for="item in 6" :key="item">
                <div class="h-[250px] w-full">
                    <img
                        src="https://picsum.photos/seed/picsum/1000/250"
                        alt=""
                        srcset=""
                        class="object-cover w-full h-full rounded-lg"
                    />
                </div>
            </t-swiper-item>
        </t-swiper>
        <h2 class="my-5 text-xl font-bold">热门知识库</h2>
        <div class="flex flex-wrap gap-3">
            <book v-for="v in 20" :key="v" class="w-[32.44%]" />
        </div>
    </div>
</template>

<style scoped></style>
