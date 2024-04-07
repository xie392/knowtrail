<script setup lang="ts">
import { reactive, ref } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import Container from '../components/container/index.vue'
import { UserService } from '@/api/user.api'
import { useRouter, useRoute } from 'vue-router'
import CheckEmail from '../components/check-email/index.vue'
import { useEmail } from '@/hooks/useEmail'
import { validPassword } from '@/utils/validate'
import { joinPath } from '@/utils/utils'
import { CaptchaType, CommonRules } from '@/utils/constants'

const formData = reactive({
    account: '1728129873@qq.com',
    password: '123456qq1',
    confirmPassword: '123456qq1',
    captcha: ''
})
const route = useRoute()
const router = useRouter()
const visable = ref<boolean>(true)

const onSubmit = async ({ validateResult, firstError }) => {
    if (validateResult === true) {
        if (!validPassword(formData.password)) return MessagePlugin.warning('密码强度不够')
        if (formData.password !== formData.confirmPassword)
            return MessagePlugin.warning('两次密码不一致')

        const { success, message } = await useEmail(formData.account, CaptchaType.FORGET)
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

const submit = async () => {
    if (!formData.captcha) return MessagePlugin.warning('验证码不能为空')
    const { code, msg } = await UserService.forgetPasswordApi(formData)
    if (code !== 200) return MessagePlugin.error(msg || '重置失败')
    MessagePlugin.success('重置成功')
    router.push('/login' + joinPath(route.path))
}
</script>

<template>
    <Container>
        <div v-show="visable">
            <h2 class="mb-8 text-center text-xl font-bold">重置密码</h2>
            <t-form
                ref="form"
                :data="formData"
                :colon="true"
                :label-width="0"
                :rules="CommonRules"
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
                            <t-icon name="mark-as-unread" />
                        </template>
                    </t-input>
                </t-form-item>

                <t-form-item name="password">
                    <t-input
                        v-model="formData.password"
                        type="password"
                        clearable
                        placeholder="请输入新密码"
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
                        placeholder="请再次输入新密码"
                        size="large"
                    >
                        <template #prefix-icon>
                            <t-icon name="lock-on" />
                        </template>
                    </t-input>
                </t-form-item>

                <t-form-item>
                    <t-button theme="primary" type="submit" block size="large">重置</t-button>
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
                @submit="submit"
            />
        </div>
    </Container>
</template>
