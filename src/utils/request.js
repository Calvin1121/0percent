import Fly from 'flyio/dist/npm/wx'
import store from '../store/index.js'
const API_URL = "http://47.114.135.205:9009/";
// const API_URL = "http://192.168.1.72:9009/";
let fly = new Fly(),
    tokenFly = new Fly();
fly.config = tokenFly.config = {
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}
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
                        request.headers["token"] = token
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
    return new Promise((resolve, reject) => {
        fly.request(url, params, { method }).then(res => {
            if (!no_loading) uni.hideLoading()
            let { code, message, data } = res.data || {};
            if (code != 200 && message) {
                uni.showToast({
                    title: message || '网络异常',
                    icon: 'none'
                })
            }
            uni.stopPullDownRefresh()
            resolve(data || res.data || {})
        }).catch(error => {
            console.log(error)
            if (!no_loading) uni.hideLoading()
            uni.stopPullDownRefresh()
            reject(error)
        })
    })
}
export { $http, getToken };