import { ref } from 'vue'
import { defineStore } from 'pinia'

type themeOptions = 'light' | 'dark'

export const useBaseStore = defineStore(
    'base',
    () => {
        // 页面主题
        const theme = ref<themeOptions>('light')
        // 是否折叠(用于工作台侧边栏的知识库收起展开)
        const collapse = ref<boolean>(false)

        return {
            theme,
            collapse
        }
    },
    {
        persist: true
    }
)
