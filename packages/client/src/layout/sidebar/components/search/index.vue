<script setup lang="ts">
import Search from '@/components/search/index.vue'
import DocIcon from '@/components/icon/DocIcon.vue'
import LibraryIcon from '@/components/icon/LibraryIcon.vue'
import templateIcon from '@/components/icon/TemplateIcon.vue'
import DocModal from '@/components/modal/doc-modal/index.vue'
import BooksModal from '@/components/modal/books-modal/index.vue'
import TemplateModal from '@/components/modal/template-modal/index.vue'
// import { DocService } from '@/api/doc.api'
// import { MessagePlugin } from 'tdesign-vue-next'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DocService } from '@/api/doc.api'
import { MessagePlugin } from 'tdesign-vue-next'
import { useDocStore } from '@/stores/doc'
import { storeToRefs } from 'pinia'

interface Options {
    name: string
    icon: any
    divider?: boolean
    onclick: () => void
}

const add_modal = ref<boolean>(false)
const books_modal = ref<boolean>(false)
const template_modal = ref<boolean>(false)

const route = useRoute()
const router = useRouter()
const pid = route.params.pid as string

const docStore = useDocStore()
const { readonly } = storeToRefs(docStore)

const options: Options[] = [
    {
        name: '新建文档',
        icon: DocIcon,
        onclick: async () => {
            console.log('pid', pid)
            if (pid) {
                // 创建知识库
                const { code, data } = await DocService.CreateDocApi({ pid })
                if (code !== 200) return MessagePlugin.error('创建知识库失败')
                // is_cretaed.value = true
                // readonly.value = false
                // doc.value = data
                router.push(`/knowledge/${pid}/${data.id}`)
                return
            }

            add_modal.value = true
        }
    },
    {
        name: '新建知识库',
        icon: LibraryIcon,
        divider: true,
        onclick: () => {
            books_modal.value = true
        }
    },
    { name: '从模板创建', icon: templateIcon, onclick: () => (template_modal.value = true) }
]
</script>

<template>
    <div class="flex w-full px-3 justify-between items-center">
        <Search />
        <t-dropdown placement="right-top" trigger="hover">
            <t-button variant="outline" shape="square">
                <template #icon>
                    <t-icon name="add" size="small" />
                </template>
            </t-button>
            <t-dropdown-menu>
                <t-dropdown-item
                    style="max-width: 150px"
                    v-for="(item, index) in options"
                    :key="index"
                    :value="index"
                    @click="item.onclick"
                >
                    <div class="flex items-center gap-2 px-2 py-1 min-w-[120px]">
                        <component :is="item.icon" size="16px" />
                        <span class="text-[0.9rem]">{{ item.name }}</span>
                    </div>
                    <t-divider v-if="item!.divider" />
                </t-dropdown-item>
            </t-dropdown-menu>
        </t-dropdown>
    </div>

    <!-- 文档 Modal -->
    <DocModal v-model:visible="add_modal" />
    <!-- / 文档 Modal -->

    <!-- 知识库 Modal -->
    <BooksModal v-model:visible="books_modal" />
    <!-- / 知识库 Modal -->

    <!-- 模板 Modal -->
    <TemplateModal v-model:visible="template_modal" />
    <!-- / 模板 Modal -->
</template>

<style scoped></style>
