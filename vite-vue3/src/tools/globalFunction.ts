/**
 * 挂载全局函数
 * 调用方法： $FunctionName()
 */
 export default {
    /**
     * loading 封装处理 
     */
    loading(message: string, config = {
        type: 'loading',
        message: '加载中',
        overlay: false,
        forbidClick: true,
        duration: 0,
    }) {
        if (message) config.message = message;
        window.app.$toast(config);
    },
}