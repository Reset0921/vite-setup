import type { Moment } from 'moment'
import type { handle } from '@/tools/handle'
import type { parse } from '@/tools/parse'
import type { RouteLocation, Router } from 'vue-router';
import type { Store } from 'vuex';
declare global {
    interface app extends Record<string, any> {
        $api: api,
        $moment: (inp?: moment.MomentInput, strict?: boolean) => Moment,
        $handle: handle,
        $parse: parse,
        $store: Store<any>,
        $router: Router,
        $route: RouteLocation,
    }
    interface Window {
        app: app
        
    }
}
