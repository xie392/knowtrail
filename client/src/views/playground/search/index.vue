<script setup lang="ts">
import { ref } from 'vue'
import { SearchIcon } from 'tdesign-icons-vue-next'

const OPTIONS = ['', '', '', 'Student D', 'Student E', 'Student F']

const popupVisible = ref(false)
const selectValue = ref()
const options = ref(OPTIONS)

const onOptionClick = (item: any) => {
    selectValue.value = item
    popupVisible.value = false
}

const onInputChange = (keyword: any) => {
    selectValue.value = keyword
    options.value = new Array(5).fill(null).map((_t, index) => `${keyword} Student ${index}`)
}

const onPopupVisibleChange = (val: boolean) => {
    popupVisible.value = val
}
</script>

<template>
    <div class="w-full min-h-[calc(100vh-64px)] flex justify-center pt-32">
        <t-select-input
            :value="selectValue"
            :popup-visible="popupVisible"
            :popup-props="{ overlayInnerStyle: { padding: '6px' } }"
            placeholder="请输入任意关键词"
            allow-input
            style="width: 600px"
            @input-change="onInputChange"
            @popup-visible-change="onPopupVisibleChange"
        >
            <template #panel>
                <ul class="pt-2 w-[600px]">
                    <li v-for="item in options" :key="item" @click="() => onOptionClick(item)" class="mb-2">
                        {{ item }}
                    </li>
                </ul>
            </template>
            <template #suffixIcon><search-icon /></template>
        </t-select-input>
    </div>
</template>

<style scoped></style>
