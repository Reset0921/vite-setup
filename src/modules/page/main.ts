import { createApp } from 'vue'
import App from './App.vue'

/* public less */
import '@/styles/nativeCover.less'
import '@/styles/color.less'
import '@/styles/font.less'

/* utils */
import parse from '@/tools/parse'
import handle from '@/tools/handle'
import globalFunction from '@/tools/globalFunction';


/* px-rem 兼容 */
import 'amfe-flexible/index';

/* install */
const app = createApp(App)
window.app = app.config.globalProperties as app;
Object.keys(globalFunction).forEach(name => window.app['$' + name] = globalFunction[name as keyof typeof globalFunction])
window.app.$parse = parse;
window.app.$handle = handle;
// window.app.$appNative = appNative;
// window.app.$api = api;
// window.app.$moment = moment;
// window.app.$localUtils = localUtils;
// app.use(store);
// app.use(router);
// app.use(Vant);
app.mount('#app')
