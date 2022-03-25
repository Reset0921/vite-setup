import type { RouteLocationNormalized as routeType, NavigationGuardNext as nextType } from 'vue-router';
export default (to: routeType, from: routeType, next: nextType) => {
    window.launched = true;
    next()
    
}