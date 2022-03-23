import { createApp } from 'vue'
import App from './App.vue'

/* public less */
import '@/styles/nativeCover.less'
import '@/styles/color.less'
import '@/styles/font.less'

/* px-rem 兼容 */
import 'amfe-flexible/index';

createApp(App).mount('#app')
