<script setup lang="ts">
import AomaoEditor from 'aomao/index'
import { useDocStore } from '@/stores/doc'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import type { Docs } from '@/models/doc'

const docStore = useDocStore()
const { doc, readonly } = storeToRefs(docStore)
const { pid, id } = useRoute().params
// const data = ref<Docs>()

/**
 * 初始化
 */
const init = async () => {
    if (doc.value.id === id) {
        readonly.value = false
    } else {
        readonly.value = true
    }
}
init()
</script>

<template>
    <div class="w-full">
        <div class="flex w-full">
            <AomaoEditor />
            <!-- 侧边栏 -->
            <div class="w-[300px] mt-5 min-h-min p-5"></div>
        </div>
    </div>
</template>

<style scoped></style>
@/stores/doc
