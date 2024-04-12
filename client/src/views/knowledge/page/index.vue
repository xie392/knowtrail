<script setup lang="ts">
import AomaoEditor from 'aomao/index'
import { useRoute } from 'vue-router'
import { DocService } from '@/api/doc.api'
import { watch, type Ref } from 'vue'
import UserDBStore from '@/db'
import type { DOC } from '@/db/type'
import { liveQuery } from 'dexie'
import { useObservable } from '@vueuse/rxjs'
import { joinUrl } from '@/utils/utils'

const route = useRoute()

const id = route.params.id as string
const doc: Ref<DOC> = useObservable(
    // @ts-ignore
    liveQuery(() => UserDBStore.findOneById(UserDBStore.tables.doc, 'id', id))
)

const getDocDetail = async () => {
    if (!route.params.id) return
    const { data } = await DocService.GetDocByIdApi(route.params.id as string)
    if (!data) return
    const doc = await UserDBStore.findOneById(UserDBStore.tables.doc, 'id', route.params.id as string)
    if (doc) {
        await UserDBStore.update(UserDBStore.tables.doc, 'id', route.params.id as string, {
            ...doc,
            ...data
        })
    } else {
        await UserDBStore.add(UserDBStore.tables.doc, {
            ...data,
            readonly: true
        })
    }
}
watch(
    () => route.params.id,
    () => {
        getDocDetail()
    },
    { immediate: true }
)
</script>

<template>
    <div class="flex w-full">
        <div class="flex-1 h-full flex-col items-center justify-center">
            <div class="w-full max-h-[200px] relative px-10 pt-5" v-if="doc?.readonly && doc?.cover">
                <img :src="joinUrl(doc?.cover)" alt="" class="w-full max-h-[200px] rounded-lg object-cover" />
            </div>
            <!-- 编辑区域 -->
            <AomaoEditor />
        </div>

        <!-- 侧边栏 -->
        <div class="w-[300px] mt-5 min-h-min p-5"></div>
    </div>

    <!-- <div v-if="doc?.readonly">
        111
    </div> -->
</template>

<style scoped></style>
