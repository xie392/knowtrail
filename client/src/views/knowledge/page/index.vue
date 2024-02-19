<script setup lang="ts">
import AomaoEditor from 'aomao/index'
import { useRoute } from 'vue-router'

const { id } = useRoute().params as { id: string }

const getDocDetail = async () => {
    if (!id) return

    // 获取

}
getDocDetail()
</script>

<template>
    <div class="flex w-full">
        <AomaoEditor />
        <div class="w-[300px] mt-5 min-h-min p-5"></div>
    </div>
</template>

<style scoped></style>
