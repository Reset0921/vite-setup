const apiModules = import.meta.globEager('./modules/*.ts')
const apis: any = {}
Object.keys(apiModules).forEach(item => {
    const moduleName = item.split('./modules/')[1].split('.ts')[0]
    apis[moduleName] = apiModules[item].default
})
export default apis