import axios from 'axios'
import qs from 'qs';
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL as string, // 环境变量  
    timeout: 20000,
})

// Add a request interceptor
service.interceptors.request.use(
    (config: any) => {
        if (!config.noQs) {
            config.data = qs.stringify(config.data);
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
service.interceptors.response.use(
    response => {
        let data = response.data;
        return new Promise((resolve, reject) => {
            switch (data.code) {
                case "000000": //正常返回
                    resolve(data);
                    break;
                default:
                    window.app.$dialog.alert({title: '温馨提示',message: data.msg || '网络请求错误，请稍后再试'})
                    reject(data.msg);
                    break
            }
            if (response.config.loading) {
                window.app.$toast.clear()
           }
        })
        
    },
    error => {
        if (error.config.loading) {
            window.app.$toast.clear()
        }
        return Promise.reject(error);
    }
);

export default service