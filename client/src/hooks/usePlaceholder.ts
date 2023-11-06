const placeholders = ['请输入内容....', '在这里开始记录吧...']

export const usePlaceholder = () => {
    return placeholders[Math.floor(Math.random() * placeholders.length)]
}
