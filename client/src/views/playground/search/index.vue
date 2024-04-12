<script setup lang="ts">
import { DocService } from '@/api/doc.api'
import List from '@/components/list/index.vue'
import { useIntersectionObserver } from '@vueuse/core'
import { reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const docs = ref<any[]>([])
const total = ref<number>(0)
const params = reactive({ page: 1, limit: 15 })
const route = useRoute()

const getSearchList = async (isUpdate: boolean = false) => {
    const { code, data } = await DocService.SearchApi({ ...params, keyword: (route.query?.keyword as string) ?? '' })
    if (code !== 200) return
    total.value = data.total
    docs.value = isUpdate ? [...docs.value, ...data.docs] : data.docs
    if (docs.value.length >= total.value) stop()
}
// getSearchList()

const loading = ref<boolean>(false)
const loadingRef = ref<HTMLDivElement | null>(null)

const { stop } = useIntersectionObserver(loadingRef, (entries) => {
    if (entries[0].isIntersecting) {
        if (loading.value) return
        if (docs.value.length >= total.value) return
        params.page++
        getSearchList(true)
        loading.value = false
    }
})

watch(
    () => route.query.keyword,
    () => {
        getSearchList()
    },
    { immediate: true }
)
</script>

<template>
    <div class="max-w-[800px] mx-auto pt-10">
        <div v-if="!!docs.length">
            <List v-for="v in docs" :key="v" :item="v" />
        </div>
        <div class="w-full h-5 text-center text-sm text-gray-400 pt-5" v-else>没有找到对应的文档...</div>
        <!-- <div class="w-full h-5 text-center text-sm text-gray-400 pt-5" ref="loadingRef"></div>
            {{ !docs.length || docs.length >= total ? '到底了~' : '加载中...' }}
        </div> -->
    </div>
</template>

<style scoped></style>
