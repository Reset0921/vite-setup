import { createRouter, createWebHashHistory } from "vue-router"
import appLaunch from '@/modules/page/utils/appLaunch'
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
router.beforeEach((to, from, next) => {
    if (!window.launched) appLaunch(to, from, next);
    else {
        /* 处理路由信息 */
        next();
    }
})
export default router