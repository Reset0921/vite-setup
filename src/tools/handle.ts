

export interface handle {
    fileToJson: (file: File) => Promise<any>,
    fileToBase64: (blob: Blob) => Promise<any>,
    base64toFile: (dataurl: string, fileName: string) => File,
    objSetSeesion: (obj: any) => void,
    downloadBolb: (content: File, fileName: string) => void,
    setVal: (traget: any, source: any) => any,
    getRequest: (urlStr?: string) => any,
}

/**
 * @description 工具相关 
 */
export default {

    /**
    * file to json
    */
    fileToJson(file: File) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = (res: any) => resolve(JSON.parse(res.target));
            reader.onerror = err => reject(err) // 失败回调
            reader.readAsText(new Blob([file]), 'utf-8') // 按照utf-8编码解析
        })
    },

    /**
     * 文件转base64
     * @param {Blob} blob 文件
     */
    fileToBase64: (blob: Blob) => new Promise(resolve => {
        const fileReader = new FileReader();
        fileReader.onload = (e: any) => resolve(e.target.result);
        fileReader.readAsDataURL(blob);
    }),

    /**
     * base64 to file
     */
    base64toFile(dataurl: string, fileName: string) {
        let arr: any = dataurl.split(',');
        let mime: string = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) u8arr[n] = bstr.charCodeAt(n);
        return new File([u8arr], fileName, { type: mime });
    },

    /**
     * obj 遍历存入session
     * @param {Object} obj
     */
    objSetSeesion(obj: any) {
        for (var key in obj) {
            try { sessionStorage.setItem(key, obj[key]) } catch (err) { }
        }
        for (let key in sessionStorage) {
            if (!sessionStorage.getItem(key) || sessionStorage.getItem(key) == 'null' || sessionStorage.getItem(key) == 'undefined') {
                sessionStorage.setItem(key, '')
            }
        }
    },

    /**
     * 下载流文件
     */
    downloadBolb(content: File, fileName: string) {
        const blob = new Blob([content], { type: 'application/octet-stream;charset=UTF-8' });
        const a = document.createElement("a");
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName || '';
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
    },

    /**
     * set val (不新增目标字段，只做赋值) 
     */
    setVal(traget: any, source: any) {
        for (let key in traget) {
            traget[key] = source[key] == undefined ? '' : source[key]
        }
        return traget
    },


    /**
     * 获取URL中的参数名及参数值的集合
     */
    getRequest(urlStr?: string) {
        let url: string | string[] = '';
        let filterUrl = '';
        let theRequest: any = {};
        if (!urlStr) url = window.location.href;
        url = location.href.split("?"); //获取url中"?"符后的字符串
        if (url.length > 1) {
            for (let i = 1; i < url.length; i++) {
                if (i == url.length - 1) filterUrl += url[i];
                else filterUrl += url[i] + "&";
            }
            url = '?' + filterUrl
        } else return {}
        if (url.indexOf("?") != -1) {
            let str = url.substr(1);
            let strs = str.split("&");
            for (let i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }
        }
        for (let key in theRequest) {
            if (!theRequest[key] || theRequest[key] == 'null' || theRequest[key] == 'undefined') {
                theRequest[key] = "";
            }
        }
        return theRequest;
    },

  
}
