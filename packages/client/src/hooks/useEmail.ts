import { UserService } from '@/api/user.api'
import { validEmail } from '@/utils/validate'
import { useBaseStore } from '@/stores/index'
import { storeToRefs } from 'pinia'
import { CaptchaType } from '@/utils/constants'

interface EmailResult {
    success: boolean
    message: string
}

/**
 * 发送邮箱
 * @param email 邮箱
 * @returns
 */
export async function useEmail(
    email: string,
    type: CaptchaType = CaptchaType.REGISTER
): Promise<EmailResult> {
    // 1. 验证邮箱
    if (!validEmail(email)) {
        return { success: false, message: '邮箱格式不正确' }
    }

    // 2. 是否在 60s 内发送过，如果是，则不再发送
    if (isRecentlySent()) {
        return { success: false, message: '验证码发送过于频繁，请稍后再试' }
    }

    // 3. 发送验证码
    return await sendVerificationCode(email, type)
}

/**
 * 判断是否最近已发送 60s 内
 * @returns {boolean} 如果最近已发送则返回true，否则返回false
 */
function isRecentlySent(): boolean {
    const { lastSentTime } = storeToRefs(useBaseStore())
    // 获取当前时间的时间戳
    const currentTime = new Date().getTime()
    // 判断当前时间与上次发送时间间隔是否小于60000毫秒
    if (lastSentTime && currentTime - lastSentTime.value < 60000) {
        return true
    }
    return false
}

/**
 * 发送验证码到邮箱
 * @param email - 邮箱地址
 * @returns Promise<EmailResult> - Promise对象，包含发送结果和消息
 */
async function sendVerificationCode(email: string, type: CaptchaType): Promise<EmailResult> {
    const { lastSentTime } = storeToRefs(useBaseStore())
    const { code, msg } = await UserService.sendEmailApi({ email }, type)

    if (code === 200) {
        // 更新上次发送时间
        lastSentTime.value = new Date().getTime()
        return { success: true, message: '发送成功，请注意接收邮箱信息' }
    } else {
        return { success: false, message: msg }
    }
}
