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
    console.log('docs.value', docs.value)
    if (docs.value.length >= total.value) stop()
}
getRecommendList()

const loading = ref<boolean>(false)
const loadingRef = ref<HTMLDivElement | null>(null)

const { stop } = useIntersectionObserver(loadingRef, (entries) => {
    if (entries[0].isIntersecting) {
        console.log('loadingRef', total.value)
        if (loading.value) return
        if (docs.value.length >= total.value) return
        params.page++
        getRecommendList(true)
        loading.value = false
    }
})

// watch(loading, (val) => {
//     if (val) {
//         console.log('total.value', total.value, docs.value)

//         if (docs.value.length >= total.value) return
//         params.page++
//         getRecommendList(true)
//         loading.value = false
//     }
// })
</script>

<template>
    <div>
        <div class="min-h-[80vh]">
            <List v-for="v in docs" :key="v" :item="v" />
        </div>
        <div class="w-full h-5 text-center text-sm text-gray-400 pt-5" ref="loadingRef">
            {{ !docs.length || docs.length >= total ? '到底了~' : '加载中...' }}
        </div>
    </div>
</template>

<style scoped></style>
