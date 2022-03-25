import { AxiosRequestConfig } from 'axios';
declare module 'axios' {
    export interface AxiosRequestConfig {
        loading?: boolean;
        noQs?: boolean,
        timeout?: number, /* 针对多张图片上传设置超时时间延长 */
        noToken?: boolean
    }
}