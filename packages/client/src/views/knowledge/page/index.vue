<script setup lang="ts">
import AomaoEditor from 'aomao/index'
import { useRoute } from 'vue-router'
import { DocService } from '@/api/doc.api'
import { useDocStore } from '@/stores/doc'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
// import { DocType } from '@/shared'

const { doc, is_cretaed, is_updated } = storeToRefs(useDocStore())
const route = useRoute()

const getDocDetail = async () => {
    if (!route.params.id || is_cretaed.value) return
    const { data } = await DocService.GetDocByIdApi(route.params.id as string)
    doc.value = { ...data, p_id: data.category_id }
    is_cretaed.value = false
    is_updated.value = true
}
getDocDetail()
watch(
    () => route.params.id,
    () => {
        getDocDetail()
    }
)

</script>

<template>
    <div class="flex w-full">
        <AomaoEditor />
        <div class="w-[300px] mt-5 min-h-min p-5"></div>
    </div>
</template>

<style scoped></style>
