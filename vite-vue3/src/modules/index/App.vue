<template>
    <router-view class="router-view" v-slot="{ Component, route }">
        <transition :name="state.transitionName">
            <keep-alive :include="state.keepAlive">
                <component :is="Component" :key="route.name" />
            </keep-alive>
        </transition>
    </router-view>
</template>

<script lang="ts" setup>
import { computed, reactive, toRefs, watch, getCurrentInstance } from 'vue'
import { Router } from 'vue-router';
import { Store } from 'vuex';

        const app: app = <any>getCurrentInstance()?.proxy
        const router = <Router>app.$router;
        const store = <Store<unknown>>app.$store;
        const state = reactive({
            transitionName: 'slide-left',
            keepAlive: [],
            routeRecords: [],
        })
        watch(router.currentRoute, (to:any, from) => {
            if (to.meta.index >= from.meta.index || !from.name) state.transitionName = 'slide-left';
            else state.transitionName = 'slide-right';
        })
</script>

<style lang="less" scope>
.router-view {
    background: #f5f5f5;
    font-size: 14px;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    /*  */
    transition: all 400ms cubic-bezier(0.6, 0, 0.1, 1);
    -webkit-transition: all 400ms cubic-bezier(0.6, 0, 0.1, 1);
    -moz-transition: all 400ms cubic-bezier(0.6, 0, 0.1, 1);
    -ms-transition: all 400ms cubic-bezier(0.6, 0, 0.1, 1);
    -o-transition: all 400ms cubic-bezier(0.6, 0, 0.1, 1);
    /*  */
    transform: translate3d(0, 0, 0);
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    /*  */
    will-change: transform;
    backface-visibility: hidden;
    perspective: 1000;
}
/* // 页面后退
// enter 定义进入过渡的开始状态 在元素被插入之前生效 */
.slide-right-enter-from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0%);
}

/* // 页面前进 */
.slide-left-enter-from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
}
</style>
