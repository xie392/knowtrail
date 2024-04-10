import { EngineInterface } from '@aomao/engine'
import { Ref } from 'vue'

// 编辑器
export interface EditorOptionsInterface {
  // 编辑器实例
  editor: EngineInterface
  // 语言
  mode: Ref<string>
  // 主题
  theme: Ref<string>
  // 是否换行
  lineWrapping: Ref<boolean>
  // 代码
  code: Ref<string>
  // 是否自动聚焦
  isFocus?: Ref<boolean>
  // 保存
  onSave: (mode: string, code: string, theme: string, lineWrapping: boolean) => void
}

// 主题
export interface ThemeOptionsInterface {
  // 主题列表
  modeDatas: string[]
  // 默认值
  defaultValue: string
  // 挂载容器
  getContainer?: () => HTMLElement
  // 选择回调
  onSelect: (value: string) => void
}

// 语言
export interface ModeOptionsInterface {
  // 语言列表
  modeDatas: Array<{
    value: string
    syntax: string
    name: string
    alias?: string[] | undefined
  }>
  // 默认值
  defaultValue: string
  // 挂载容器
  getContainer?: () => HTMLElement
  // 选择回调
  onSelect: (value: string) => void
}
