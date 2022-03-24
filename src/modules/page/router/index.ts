import { createRouter, createWebHashHistory } from "vue-router"
// import appLaunch from '@/modules/shuntOrder/utils/appLaunch'
import type { RouteRecordRaw } from 'vue-router';
const routesInstance: any = import.meta.globEager('./modules/*.ts')
const routes: RouteRecordRaw[] = [];
Object.keys(routesInstance).forEach(item => {
    routes.push(...routesInstance[item].default)
})
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        ...routes,
    ],
})
// router.beforeEach((to, from, next) => {
//     if (!window.launched) appLaunch(to, from, next);
//     else {
//          window.app.$store.dispatch('routerStack/saveRoute', { to, from })
//         next();
//     }
// })
export default router