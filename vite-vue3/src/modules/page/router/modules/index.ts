import type { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        name: 'index',
        path: '/index',
        meta: {
            title: '首页'
        },
        component: () => import('@/modules/page/views/index.vue')
    },
]
export default routes
