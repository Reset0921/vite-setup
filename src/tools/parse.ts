
export interface parse {
    deepClone: (obj: any) => any,
    jsonParse: (file: string) => any | string,
    splitArrayByNum: (list: any[], litmit: number) => any[],
    zhOrEn: (str: string) => string,
    zhReplace: (str: string) => string,
    zhEnOrNum: (str: string) => string,
    enOrNum: (str: string) => string,
    nameReplace: (str: string) => string,
    numReplace: (str: string) => string,
    numberLimit: (val: string | number, intLength?: number, decimalLength?: number) => string | number,
    systemType: () => string | boolean,
    operatingEnv: () => string | boolean,
    stringToJson: (val: string) => string,
    formatSeconds: (value: number | string) => any[]
    keyToLowerCase: (obj:any) => any
    parseIntNumber: (value:string | number, type:number) =>number | string
}

/**
 * @description 数据解析相关 
 */

export default {

    /**
    * @description: 操作系统
    * @return {[Array,Boolean]} 操作系统化
    */
    systemType() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            return "ANDROID";
        }else if (isIOS) {
            return "IOS";
        }else{
            return false
        }
    },

    /**
     * 运行环境 weChat/shenJia/false   false:第三方
     */
    operatingEnv() {
        if (window.navigator.userAgent.indexOf('shenJiaServe') > -1) {
            return 'shenJia';
        } else if (window.navigator.userAgent.indexOf('MicroMessenger') > -1) {
            return 'weChat';
        } else {
            return false;
        }
    },

    /**
     * @description: 深拷贝的deepClone
     */
    deepClone(obj: object) {
        return JSON.parse(JSON.stringify(obj))
    },

    /**
     * json parse
     */
    jsonParse(val: string) {
        try { return JSON.parse(val) } catch (err) { return val }
    },

    /**
     * 按指定长度截取数组
     * @param {Array} litmit 数组
     * @param {number} litmit 分隔长度
     * @return {Array} data 返回新数组
     */
    splitArrayByNum(list: any[], litmit: number) {
        var num: number = 0;
        var data: any[] = [];
        for (let i = 0; i < list.length; i++) {
            if (i % litmit == 0 && i != 0) {
                data.push(list.slice(num, i));
                num = i;
            }
            if ((i + 1) == list.length) {
                data.push(list.slice(num, (i + 1)));
            }
        }
        return data;
    },

    /**
     * @description: 只能输入中文和字母replace
     * @param {String} str
     */
    zhOrEn(str: string) {
        try { return str.replace(/[^\u4e00-\u9fa5a-zA-Z]/g, '') } catch (err) { return str }
    },

    /**
     * @description: 禁止输入中文
     * @param {String} str
     */
    zhReplace(str: string) {
        try { return str.replace(/[\u4e00-\u9fa5]/g, '') } catch (err) { return str }
    },

    /**
     * @description: 只能输入中文数字和字母replace
     * @param {String} str
     * @return {String} 
     */
    zhEnOrNum(str: string) {
        try { return str.replace(/[^0-9a-zA-Z\u4e00-\u9fa5]/g, '') } catch (err) { return str }
    },

    /**
     * @description: 只能输入数字和字母replace
     * @return {String} 
     */
    enOrNum(str: string) {
        try { return str.replace(/[^0-9a-zA-Z]/g, '') } catch (err) { return str }
    },

    /**
     * @description: 姓名replace 
     * @return {String} 
     */
    nameReplace(str: string) {
        try { return str.replace(/[^\u4e00-\u9fa5a-zA-Z\.\·\ \-]/g, '') } catch (err) { return str }
    },

    /**
     * @description: 只能输入数字
     * @return {Number} 
     */
    numReplace(val: string) {
        try { return val.replace(/\D/g, '') } catch (err) { return val }
    },

    /**
     * @description: 数字输入限制
     * @param {*} val  
     * @param {Number} intLength 限制整数最大输入长度 默认10位
     * @param {Number} decimalLength 限制小数最大输入长度 默认2位
     * @return {string | number} 
     */
    numberLimit(val: string | number, intLength: number = 10, decimalLength: number = 2) {
        if (val == "") return ""
        val = val.toString()
        val = val.replace(/[^\d.]/g, "")
        if (val.includes('.')) {
            if (val[0] == '.') return "";
            let firstNum = (val.split('.')[0]).toString();
            let lastNum = (val.split('.')[1]).toString();
            if (firstNum.length > intLength) firstNum = firstNum.substring(0, intLength)
            if (lastNum.length > decimalLength) lastNum = lastNum.substring(0, decimalLength)
            return `${firstNum}.${lastNum}`
        } else {
            if (val == '0') val = '0'
            else if ((val.substring(0, 1) == '0')) val = val.substring(1, val.length)
        }
        val = val.toString()
        if (val.length > intLength) {
            val = val.substring(0, intLength)
            return this.numReplace(val)
        } else return this.numReplace(val)
    },

     /**
     * @description: string to json
     * @param {String} 源数据
     * @return {JSON} 
     */
      stringToJson(str:string) {
        try {
            return JSON.parse(str)
        } catch (err) {
            return str
        }
    },
    /* 
    ** 取整数、小数部分
    * type取0表示取整数，反之则取小数部分
     */
    parseIntNumber(value:string | number, type:number){
        if(!value){
            value = '0.00'
        }
        return value.toString().split('.')[type]
    },
     /* 将秒数转换为时分秒格式 */
     formatSeconds(value:number | string) {
        var theTime = parseInt(value.toString());// 秒
        var middle = 0;// 分
        var hour = 0;// 小时

        if (theTime > 60) {
            middle = parseInt((theTime / 60).toString());
            theTime = parseInt((theTime % 60).toString());
            if (middle > 60) {
                hour = parseInt((middle / 60).toString());
                middle = parseInt((middle % 60).toString());
            }
        }
        var result = <number[]>[]
        if (theTime >= 0) {
            result.push(parseInt(theTime.toString()));
        }
        if (middle >= 0) {
            result.push(parseInt(middle.toString()));
        }
        if (hour > 0) {
            result.push(parseInt(hour.toString()));
        }
        return result;
    },
    
    /**
     * json key 转小写 
     */
     keyToLowerCase(obj: any) {
        let lowerCaseParams = {};
        for (var key in obj) {
            lowerCaseParams[key.toLowerCase()] = obj[key];
        }
        return lowerCaseParams
    },
    
}