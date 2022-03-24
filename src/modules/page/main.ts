import { createApp } from 'vue'
import App from './App.vue'
import router from '@/modules/page/router/index'
import store from '@/modules/page/store/index'

/* momentjs */
import moment from "moment";
import 'moment/dist/locale/zh-cn'
moment.locale('zh-cn')

/* vant */
import Vant from 'vant';
import 'vant/lib/index.css';

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

// window.app.$api = api;
window.app.$moment = moment;
app.use(store);
app.use(router);
app.use(Vant);
app.mount('#app')
