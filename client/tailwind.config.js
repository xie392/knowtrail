/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue}",
  ],

  theme: {
    screens: {
      'mob': { 'min': '320px', 'max': '768px' },
      'pc': { 'min': '768px' },
    },
    extend: {
      colors: {
        /** @description 主题色 */
        main: 'var(--brand-main)',

        /** @description 字体颜色 */
        textPrimary: 'var(--td-text-color-primary)',
        textSecondary: 'var(--td-text-color-secondary)',
        textLink: 'var(--td-text-color-link)',

        /** @description 背景颜色 */
        bgPrimary: 'var(--td-bg-color-container)',
        bgSecondary: 'var(--td-bg-color-secondarycontainer)',
        bgPage: 'var(--td-bg-color-page)',
        bgComponent: 'var(--td-bg-color-component)',

        /** @description 边框颜色 */
        border: 'var(--td-component-border)',
        stroke: 'var(--td-component-stroke)',

        /** @description 阴影配置 */
        shadow1: 'var(--td-shadow-1)',
        shadow2: 'var(--td-shadow-2)',
        shadow3: 'var(--td-shadow-3)',
      }
    },
  },
  plugins: [],
}