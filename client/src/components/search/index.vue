<script setup lang="ts">
import { ref } from 'vue'

const visible = ref<boolean>(false)
</script>

<template>
    <div
        class="w-[82%] bg-[#eff0f0bf] h-8 rounded-lg cursor-pointer flex justify-between items-center px-3 relative z-50"
        @click="visible = true"
    >
        <div class="flex items-center gap-2">
            <t-icon name="search" size="small" />
            <span class="text-[0.84rem]">搜索</span>
        </div>
        <span class="text-[0.8rem]">Ctrl + K</span>
    </div>
    <t-dialog
        :closeOnEscKeydown="false"
        :closeOnOverlayClick="false"
        :footer="false"
        :header="false"
        showOverlay
        v-model:visible="visible"
        attach="body"
    >
        <p>This is a search</p>
    </t-dialog>
</template>

<style scoped></style>
