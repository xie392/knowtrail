<script setup lang="ts">
import List from '@/components/list/index.vue'
// import { getNotesApi } from '@/api/playground'

// const init = async () => {
//     const { data } = await getNotesApi()
//     console.log(data)
// }
// init()
</script>

<template>
    <div>
        <List v-for="v in 10" :key="v" />
    </div>
</template>

<style scoped></style>
