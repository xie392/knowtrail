<script setup lang="ts">
import { reactive, ref } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import Container from '../components/container.vue'
import { UserService } from '@/api/user.api'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import CheckEmail from '../components/check-email.vue'
import { useEmail } from '@/hooks/useEmail'
import { validPassword } from '@/utils/validate'
import { joinPath } from '@/utils/utils'

const formData = reactive({
    account: '1728129873@qq.com',
    password: '123456qq',
    confirmPassword: '123456qq',
    captcha: ''
})
const rules = {
    account: [{ required: true, message: '账号不能为空', type: 'warning' }],
    captcha: [{ required: true, message: '邮箱验证码不能为空', type: 'warning' }],
    password: [{ required: true, message: '密码不能为空', type: 'warning' }],
    confirmPassword: [{ required: true, message: '确认密码不能为空', type: 'warning' }]
}
const userStore = storeToRefs(useUserStore())
const route = useRoute()
const router = useRouter()
const visable = ref<boolean>(true)

const onSubmit = async ({ validateResult, firstError }) => {
    if (validateResult === true) {
        if (!validPassword(formData.password)) return MessagePlugin.warning('密码强度不够')
        if (formData.password !== formData.confirmPassword)
            return MessagePlugin.warning('两次密码不一致')

        const { success, message } = await useEmail(formData.account)
        if (success) {
            visable.value = false
            MessagePlugin.success(message)
        } else {
            MessagePlugin.warning(message)
        }
    } else {
        MessagePlugin.warning(firstError)
    }
}

const register = async () => {
    if (!formData.captcha) return MessagePlugin.warning('验证码不能为空')
    const { code, data, msg } = await UserService.RegisterApi(formData)
    if (code !== 200) return MessagePlugin.error(msg || '注册失败')
    userStore.user.value = data
    userStore.isLogin.value = true
    route.query?.redirect ? router.push(route.query.redirect as string) : router.push('/')
}
</script>

<template>
    <Container>
        <div v-show="visable">
            <h2 class="mb-8 text-center text-xl font-bold">账户注册</h2>
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
                        placeholder="请输入邮箱"
                        size="large"
                    >
                        <template #prefix-icon>
                            <!-- user-1   -->
                            <t-icon name="mark-as-unread" />
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

                <t-form-item name="confirmPassword">
                    <t-input
                        v-model="formData.confirmPassword"
                        type="password"
                        clearable
                        placeholder="请再次输入密码"
                        size="large"
                    >
                        <template #prefix-icon>
                            <t-icon name="lock-on" />
                        </template>
                    </t-input>
                </t-form-item>

                <t-form-item>
                    <t-button theme="primary" type="submit" block size="large">注册</t-button>
                </t-form-item>
            </t-form>
            <p class="mt-5 flex justify-between">
                <router-link
                    :to="'/login' + joinPath($route.fullPath)"
                    class="text-textLink text-[0.89rem]"
                    >登录</router-link
                >
            </p>
        </div>
        <div v-show="!visable">
            <CheckEmail
                :email="formData.account"
                v-model:captcha="formData.captcha"
                @close="visable = true"
                @submit="register"
            />
        </div>
    </Container>
</template>
