<template>
    <t-select
        size="small"
        :bordered="false"
        style="min-width: 120px"
        :default-value="defaultValue"
        :get-popup-container="getContainer"
        @change="(value: SelectValue<SelectOption>) => onSelect(value as string)"
    >
        <t-option v-for="item in modeDatas" :value="item" :key="item">
            {{ item }}
        </t-option>
    </t-select>
</template>

<script setup lang="ts">
import type { SelectOption, SelectValue } from 'tdesign-vue-next'

defineProps<{
    // 主题列表
    modeDatas: string[]
    // 默认值
    defaultValue: string
    // 挂载容器
    getContainer?: () => HTMLElement
    // 选择回调
    onSelect: (value: string) => void
}>()

/**
 * 搜索时过滤
 * @param input
 * @param option
 */
// const filter = (input: string, option: { key: string; name: string }) => {
//     input = input.toLowerCase()
//     const key = option.key || ''
//     let name = option.name || ''
//     name = name.toLowerCase()
//     return key.includes(input) || name.includes(input)
// }
</script>
