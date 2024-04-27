<script setup lang="ts">
import { CategoryService } from '@/api/category.api'
import { UserService } from '@/api/user.api'
import { useLogin } from '@/hooks/useLogin'
import { joinUrl } from '@/utils/utils'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import UpdateModel from '@/components/modal/updat-model/index.vue'

const route = useRoute()
const userInfo = ref<any>(null)

const getUserInfo = async () => {
    const { data } = await UserService.getUserInfoApi(route.params.id as string)
    if (!data) return
    // console.log(data)
    userInfo.value = data
}
getUserInfo()

const recentCategory = ref<any[]>([])
const getUserCategory = async () => {
    const { data } = await CategoryService.GetUserCategoryApi(route.params.id as string, { page: 1, limit: 6 })
    if (!data) return
    // console.log(data)
    recentCategory.value = data.list
}
getUserCategory()

const { user } = useLogin()

const visable = ref<boolean>(false)
</script>

<template>
    <div class="w-full h-full pt-10">
        <div class="w-full max-w-[1000px] mx-auto">
            <div class="flex mb-10">
                <div class="mr-5">
                    <img
                        :src="joinUrl(userInfo?.avatar)"
                        class="w-[100px] h-[100px] rounded-full object-cover"
                        alt=""
                        srcset=""
                    />
                </div>
                <div class="flex flex-col justify-center flex-1">
                    <p>
                        <span class="text-gray-400">昵称：</span>
                        <span>{{ userInfo?.nick_name }}</span>
                    </p>
                    <p>
                        <span class="text-gray-400">邮箱：</span>
                        <span>{{ userInfo?.email }}</span>
                    </p>
                </div>
                <div class="flex items-center" v-if="user?.data.id === $route.params.id">
                    <t-button class="flex" @click="visable = true"> 编辑资料 </t-button>
                </div>
            </div>

            <h1 class="text-xl font-bold mb-5">知识库</h1>
            <div class="flex gap-3 flex-wrap" v-if="recentCategory.length != 0">
                <Book class="w-1/3" :footer="false" v-for="v in recentCategory" :key="v" :item="v" />
            </div>
            <div class="flex justify-center text-gray-300" v-else>无数据</div>
        </div>

        <UpdateModel v-model:visible="visable" @save="getUserInfo" />
    </div>
</template>
