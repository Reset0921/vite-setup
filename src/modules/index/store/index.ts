import { createStore } from 'vuex'
const storesFiles = import.meta.globEager('./modules/*.ts');
const stores: any = {};
Object.keys(storesFiles).forEach(item => {
    const storeName: string = item.split('/')[2].split('.ts')[0];
    storesFiles[item].default.namespaced = true;
    stores[storeName] = storesFiles[item].default
})
const store = createStore({ modules: stores })
export default store