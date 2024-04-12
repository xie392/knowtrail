<script setup lang="ts">
import { DocService } from '@/api/doc.api'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const visible = ref<boolean>(false)
const keyword = ref<string>('')
const docs = ref<any[]>([])
const router = useRouter()

const getSearchList = async () => {
    const { code, data } = await DocService.SearchApi({ keyword: keyword.value })
    if (code !== 200) return
    docs.value = data.docs
}

watch(keyword, () => {
    getSearchList()
})
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
        <!-- <span class="text-[0.8rem]">Ctrl + K</span> -->
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
        <t-input clearable placeholder="请输入文档名称" v-model="keyword">
            <template #prefix-icon>
                <t-icon name="search" size="small" />
            </template>
        </t-input>

        <div class="w-full max-h-[300px] overflow-y-auto pt-5" v-if="keyword">
            <t-list :split="true" v-if="!!docs.length">
                <t-list-item
                    v-for="(item, index) in docs"
                    :key="index"
                    style="padding-left: 10px"
                    class="hover:bg-gray-100 rounded cursor-pointer"
                    @click="() => router.push(`/doc/${item?.category_id}/${item?.id}`)"
                >
                    <div class="flex gap-2 items-center w-full">
                        <LibraryIcon size="16px" />
                        <span class="ml-1 text-[#8a8f8d] text-[0.9rem] flex items-center">
                            {{ item.user.nick_name }}&nbsp;/&nbsp;{{ item.title }}
                            <span class="ml-1">
                                <t-icon :name="item.status === 1 ? 'earth' : 'https'" />
                            </span>
                        </span>
                    </div>
                </t-list-item>
            </t-list>
            <p class="mt-2 text-[0.87rem] text-[#bab9b9] text-center" v-else>暂无数据</p>
        </div>
    </t-dialog>
</template>

<style scoped></style>
