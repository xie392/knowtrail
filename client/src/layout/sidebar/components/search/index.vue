<script setup lang="ts">
import Search from '@/components/search/index.vue'
</script>

<template>
    <div class="flex w-full px-3 justify-between items-center">
        <Search />
        <t-button variant="outline" shape="square">
            <template #icon>
                <t-icon name="add" size="small" />
            </template>
        </t-button>
    </div>
</template>

<style scoped></style>
