import './assets/styles/base.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import { createHead } from '@unhead/vue'

import RouterViews from './components/router-views/index.vue'
import Avatar from '@/components/avatar/index.vue'
import 'animate.css'
import './permission'

const app = createApp(App)
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.use(createHead())
app.component('router-views', RouterViews)
app.component('avatar', Avatar)
app.mount('#app')

// 把警告都关了
// app.config.warnHandler = () => {
//     // console.warn(msg);
// }

declare module 'vue' {
    export interface GlobalComponents {
        RouterViews: typeof RouterViews
        Avatar: typeof Avatar
    }
}
