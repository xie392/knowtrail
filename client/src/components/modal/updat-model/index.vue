<script setup lang="ts">
import { MessagePlugin, type ProgressContext } from 'tdesign-vue-next'
import { computed, ref } from 'vue'
// import { AddIcon } from 'tdesign-icons-vue-next'
import { BASE_URL } from '@/utils/constants'
import { useLogin } from '@/hooks/useLogin'
import { joinUrl } from '@/utils/utils'
import { UserService } from '@/api/user.api'
import { useUserStore } from '@/stores/user'
// import { da } from '@faker-js/faker'

const props = defineProps<{ visible: boolean }>()
const emits = defineEmits(['update:visible', 'save'])

const visible = computed({
    get: () => props.visible,
    set: (value) => emits('update:visible', value)
})

/**
 * 上传模块
 */
const { user } = useLogin()
const userStore = useUserStore()
const files = ref<any[]>([])
const progress = ref<number>(0)
const cover = ref<string>(user.value?.data?.avatar)
const name = ref<string>(user.value?.data?.nick_name)

const handleFail = (error: any) => {
    console.log('error', error)
}

const handleSuccess = (res: any) => {
    // console.log('上传成功', res)
    cover.value = res.response?.data?.url
}

const onProgress = (options: ProgressContext) => {
    progress.value = options.percent
}

const clearCover = () => {
    cover.value = ''
    files.value = []
}

const save = async () => {
    if (!name.value) {
        return MessagePlugin.error('用户名不能为空')
    }
    const { code } = await UserService.updateUserInfoApi(user.value?.data?.id, {
        nick_name: name.value,
        avatar: cover.value
    })

    if (code === 200) {
        MessagePlugin.success('更新成功')
        userStore.updateUserInfo({
            ...user.value.data,
            nick_name: name.value,
            avatar: cover.value
        })
        emits('save', null)
        visible.value = false
    } else {
        MessagePlugin.error('更新失败')
    }
}
</script>

<template>
    <div>
        <t-dialog
            :closeOnEscKeydown="true"
            :footer="false"
            preventScrollThrough
            v-model:visible="visible"
            header="更新用户信息"
            width="450px"
        >
            <div class="max-h-[300px] overflow-y-auto mt-2 mb-5">
                <p class="mb-2 text-[0.87rem] text-[#bab9b9]">头像</p>
                <div
                    class="group w-[110px] h-[110px] relative flex justify-center items-center rounded-lg bg-gray-100 cursor-pointer"
                    v-if="cover"
                >
                    <img :src="joinUrl(cover)" alt="" class="w-full max-h-[120px] object-cover rounded" />
                    <div
                        class="group-hover:flex transition duration-300 hidden w-full h-full justify-center items-center bg-black bg-opacity-50 absolute top-0 left-0"
                    >
                        <t-icon class="text-white text-xl" name="delete" @click="clearCover" />
                    </div>
                </div>
                <t-upload
                    :action="BASE_URL + '/upload/image'"
                    theme="image"
                    showUploadProgress
                    v-model="files"
                    @fail="handleFail"
                    @success="handleSuccess"
                    @progress="onProgress"
                    style="width: 110px"
                    accept="image/png; image/jpeg; image/gif; image/svg+xml; image/webp; image/jpg"
                    :headers="{ Authorization: user?.accessToken }"
                    v-else
                />
                <p class="mb-2 mt-5 text-[0.87rem] text-[#bab9b9]">用户名</p>
                <t-input v-model="name" placeholder="请输入用户名" />
            </div>
            <t-button block @click="save">更新</t-button>
        </t-dialog>
    </div>
</template>

<style scoped lang="scss">
::v-deep(.t-upload__card-item) {
    width: 100%;

    .t-upload__card-container {
        width: 100%;
    }

    .t-upload__card-content {
        width: 100%;
    }
}
</style>
