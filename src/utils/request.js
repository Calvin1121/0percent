import Fly from 'flyio/dist/npm/wx'
import store from '../store/index.js'
const API_URL = "https://bf0.trunshare.com/bf0/";
// const API_URL = "http://192.168.1.72:9009/bf0/";
let fly = new Fly(),
    tokenFly = new Fly();
fly.config = tokenFly.config = {
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}
var timer
const getToken = (request) => {
    uni.showLoading({ title: '加载中' })
    return new Promise(resolve => {
        uni.login({
            success: login => {
                let { code } = login;
                tokenFly.post('/login/getOpenId', { code }).then(token_res => {
                    uni.hideLoading()
                    let { data, code, message } = token_res.data || {};
                    request ? fly.unlock() : null
                    code != 200 && message ? uni.showToast({
                        title: message,
                        icon: 'none'
                    }) : null
                    if (code == 200) {
                        let { openid, token } = data;
                        request ? (request.headers["token"] = token) : null
                        store.commit('setToken', token || '')
                        store.commit('setUser', data)
                        store.commit('setOpenId', openid || '')
                        resolve(request)
                    }

                }).catch(error => {
                    uni.hideLoading()
                    request ? fly.unlock() : null
                })
            }
        })
    })
}
fly.interceptors.request.use(request => {
    if (!store.state.token) {
        fly.lock();
        return getToken(request)
    } else {
        request.headers["token"] = store.state.token;
    }
})
const $http = (url, params = {}, method = 'POST', no_loading = false) => {
    if (!no_loading) uni.showLoading({ title: '加载中' })
    for (let k in params)
        if (!params[k] || k.match(/createTime|loginTime/gi)) delete params[k]
    return new Promise((resolve, reject) => {
        fly.request(url, params, { method }).then(res => {
            let { code, message, data } = res.data || {};
            if (code != 200 && message) {
                uni.showToast({
                    title: message || '网络异常',
                    icon: 'none',
                    mask: code == 401,
                    duration:1500
                })
            }
            if (code == 401) {
                clearTimeout(timer)
                timer = setTimeout(() => uni.navigateTo({
                    url: '/pages/login/index'
                }), 1500)
            }
            if (url.match(/bus\/user\/saveOrUpdat/gi) && code == 200) data.code = code
            uni.stopPullDownRefresh()
            if (!no_loading) uni.hideLoading()
            resolve(data || res.data || {})
        }).catch(error => {
            if (!no_loading) uni.hideLoading()
            uni.stopPullDownRefresh()
            reject(error)
        })
    })
}
export { $http, getToken, API_URL };