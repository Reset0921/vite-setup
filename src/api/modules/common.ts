
import request from '../request'
export default {
       /**
     * @description: 上传图片接口
     * @params {confit} 其他参数config.loading决定是否自动关闭加载提示
     */
        imgUpload<T>(data:any,config:any){
            return request({
                baseURL: import.meta.env.VITE_APP_MERP as string,
                url: '/imgFile/imgUpload',
                data,
                loading: true,
                method: 'POST',
                noQs: true,
                timeout: 60 * 1000, /* 针对多张图片上传设置超时时间延长 */
            })
        },
         /**
     * @description:获取个人信息
     */
     obtainAccountInformation<T>(params:T,type:string) {
        return request({
            baseURL: import.meta.env.VITE_APP_MERP as string,
            url: '/account/obtainAccountInformation',
            params,
            loading: true,
            method: 'GET',
        })
    }             
   

}
