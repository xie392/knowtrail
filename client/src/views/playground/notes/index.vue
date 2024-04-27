<script setup lang="ts">
import { DocService } from '@/api/doc.api'
import List from '@/components/list/index.vue'
import { useIntersectionObserver } from '@vueuse/core'
// import { watch } from 'vue'
import { reactive, ref } from 'vue'

const docs = ref<any[]>([])
const total = ref<number>(0)
const params = reactive({ page: 1, limit: 15 })
const getRecommendList = async (isUpdate: boolean = false) => {
    const { code, data } = await DocService.GetRecommendListApi(params)
    if (code !== 200) return
    total.value = data.total
    docs.value = isUpdate ? [...docs.value, ...data.docs] : data.docs
    // console.log('推荐列表', docs.value)
    if (docs.value.length >= total.value) stop()
}
getRecommendList()

const loading = ref<boolean>(false)
const loadingRef = ref<HTMLDivElement | null>(null)

const { stop } = useIntersectionObserver(loadingRef, (entries) => {
    if (entries[0].isIntersecting) {
        if (loading.value) return
        if (docs.value.length >= total.value) return
        params.page++
        getRecommendList(true)
        loading.value = false
    }
})
</script>

<template>
    <div>
        <div class="min-h-[80vh] mx-auto">
            <List v-for="v in docs" :key="v" :item="v" />
            <span v-if="!docs.length" class="w-full h-5 text-center text-sm text-gray-400 pt-5">暂无数据</span>
        </div>
        <div class="w-full h-5 text-center text-sm text-gray-400 pt-5" ref="loadingRef">
            <span v-if="!!docs.length">
                {{ docs.length >= total ? '到底了~' : '加载中...' }}
            </span>
        </div>
    </div>
</template>

<style scoped></style>
