import axios from 'axios'
import { Loading, Message } from 'element-ui';
// import $store from '../vuex/store'
import router from '../router'

const development = process.env.NODE_ENV

// axios配置
axios.defaults.timeout = 30000
// local
axios.defaults.baseURL = development? 'http://47.99.200.198/admin' : '/admin'

axios.defaults.responseType = 'json'

let loadingInstance = null;

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    loadingInstance = Loading.service({fullscreen: true});

    return config;
}, function (error) {
    loadingInstance = Loading.service({fullscreen: true});
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    loadingInstance.close();
    console.log("======config response info: ", response)
    //返回数据判断
    if(!response || !response.data) {
        Message.error('服务器异常')
        return Promise.reject(response);
    }
    // if(response.data.status != 0) {
    //     Message.error(response.data.msg)
    //     return Promise.reject(response);
    // }
    return response.data;
}, function (err) {
    // 对响应错误做点什么
    loadingInstance.close();

    console.log("======config response error: ", err)

    if (err.response.status === 401 ||
        err.response.status === 403) {
        //Message.error('服务器异常')
        router.push({name: 'Login'})
    }

    return Promise.reject(err);
});

export default axios
