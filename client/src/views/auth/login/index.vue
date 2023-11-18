<script setup lang="ts">
import { reactive } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import GithubIcon from '@/components/icon/GithubIcon.vue'
import Container from '../components/container.vue'
import { UserService } from '@/api/user.api'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { joinPath } from '@/utils/utils'

const formData = reactive({ account: '123@qq.com', password: '123456' })
const rules = {
    account: [{ required: true, message: '账号不能为空', type: 'warning' }],
    password: [{ required: true, message: '密码不能为空', type: 'warning' }]
}
const userStore = storeToRefs(useUserStore())
const route = useRoute()
const router = useRouter()

const onSubmit = async ({ validateResult, firstError }) => {
    if (validateResult === true) {
        const { code, data, msg } = await UserService.LoginApi(formData)
        if (code !== 200) return MessagePlugin.error(msg || '登录失败')
        userStore.user.value = data
        userStore.isLogin.value = true
        route.query?.redirect ? router.push(route.query.redirect as string) : router.push('/')
    } else {
        MessagePlugin.error(firstError)
    }
}
</script>

<template>
    <Container>
        <h2 class="mb-8 text-center text-xl font-bold">账户登录</h2>
        <!-- TODO: 增加 github 登录 -->
        <!-- <div class="flex justify-center">
            <t-button block size="large" variant="outline" theme="default">
                <template #icon>
                    <github-icon size="22px" class="mr-2" />
                </template>
                Github
            </t-button>
        </div>
        <t-divider>或</t-divider> -->
        <t-form
            ref="form"
            :data="formData"
            :colon="true"
            :label-width="0"
            :rules="rules"
            @submit="onSubmit"
            class="max-w-[350px]"
        >
            <t-form-item name="account">
                <t-input
                    v-model="formData.account"
                    clearable
                    placeholder="请输入用户名或邮箱"
                    size="large"
                >
                    <template #prefix-icon>
                        <t-icon name="user-1" />
                    </template>
                </t-input>
            </t-form-item>

            <t-form-item name="password">
                <t-input
                    v-model="formData.password"
                    type="password"
                    clearable
                    placeholder="请输入密码"
                    size="large"
                >
                    <template #prefix-icon>
                        <t-icon name="lock-on" />
                    </template>
                </t-input>
            </t-form-item>

            <t-form-item>
                <t-button theme="primary" type="submit" block size="large">登录</t-button>
            </t-form-item>
        </t-form>
        <p class="mt-5 flex justify-between">
            <router-link
                :to="'/register' + joinPath($route.fullPath)"
                class="text-textLink text-[0.89rem]"
                >注册</router-link
            >
            <router-link
                :to="'/forget' + joinPath($route.fullPath)"
                class="text-textSecondary text-[0.89rem]"
                >重置密码</router-link
            >
        </p>
    </Container>
</template>
