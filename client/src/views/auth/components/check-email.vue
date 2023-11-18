<script setup lang="ts">
import { computed } from 'vue'
import { useEmail } from '@/hooks/useEmail'
import { MessagePlugin } from 'tdesign-vue-next'

const props = defineProps<{ captcha: string; email: string }>()
const emits = defineEmits(['update:captcha', 'close', 'submit'])

const captcha = computed({
    get() {
        return props.captcha
    },
    set(value) {
        emits('update:captcha', value)
    }
})

const sendEmail = async () => {
    const { success, message } = await useEmail(props.email)
    success ? MessagePlugin.success(message) : MessagePlugin.error(message)
}
</script>

<template>
    <div class="flex w-full relative justify-center items-center mb-8">
        <div class="absolute left-[-15px] top-0">
            <t-button variant="text" theme="primary" @click="emits('close')">
                <template #icon>
                    <t-icon name="arrow-left" />
                </template>
                返回
            </t-button>
        </div>
        <h2 class="text-center text-xl font-bold">邮箱验证</h2>
    </div>
    <div class="flex flex-col gap-5">
        <t-input v-model="captcha" clearable placeholder="请输入验证码" size="large">
            <template #prefix-icon>
                <t-icon name="code" />
            </template>
        </t-input>
        <t-button theme="primary" size="large" block @click="emits('submit')">验证</t-button>
    </div>
    <p class="mt-5 flex text-[0.89rem]">
        没有收到验证码？
        <span class="text-textLink cursor-pointer select-none" @click="sendEmail">重新发送</span>
    </p>
</template>

<style scoped></style>
