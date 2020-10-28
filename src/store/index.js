import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)
const findIndex = (list, item) => {
    let insert;
    for (let k = 0; k < list.length; k++)
        if ((list[k].id == item.id && item.id) || list[k] == item)
            return k || 0;
}
const store = new Vuex.Store({
    plugins: [
        createPersistedState({
            storage: {
                getItem: key => uni.getStorageSync(key),
                setItem: (key, value) => uni.setStorageSync(key, value),
                removeItem: key => uni.removeStorageSync(key)
            }
        })
    ],
    state: {
        isIPX: false,
        navbar: 0,
        tabbar: 0,
        isAll: true,
        history: [],
        keyword: '',
        token: '',
        openId: '',
        shareInfo: '',
        user: {},
        collect: false,
        query:{}
    },
    getters: {
        isIPX: state => state.isIPX,
        navbar: state => state.navbar,
        tabbar: state => state.tabbar,
        isAll: state => state.isAll,
        history: state => state.history,
        keyword: state => state.keyword,
        token: state => state.token,
        openId: state => state.openId,
        shareInfo: state => state.shareInfo,
        user: state => state.user,
        collectFlag: state => state.collectFlag,
        query: state => state.query,
    },
    mutations: {
        setIsIPX(state, isIPX = false) {
            state.isIPX = isIPX
        },
        setNavbar(state, navbar = 0) {
            state.navbar = navbar
        },
        setTabbar(state, tabbar = 0) {
            state.tabbar = tabbar
        },
        setIsAll(state, isAll = true) {
            state.isAll = isAll
        },
        setHistory(state, history = []) {
            state.history = history
        },
        setKeyword(state, keyword = '') {
            state.keyword = keyword
        },
        setToken(state, token = '') {
            state.token = token
        },
        setOpenId(state, openId = '') {
            state.openId = openId
        },
        setShareInfo(state, shareInfo = {}) {
            state.shareInfo = shareInfo
        },
        setUser(state, user = {}) {
            state.user = user
        },
        setCollectFlag(state, collectFlag = false) {
            state.collectFlag = collectFlag
        },
        setQuery(state, query = {}){
            state.query = query;
        }
    },
    actions: {
        actHistory({ commit, getters }, keyword) {
            let {history} = getters;
            if (history.includes(keyword)) history.splice(findIndex(history, keyword), 1)
            history.splice(0, 0, keyword)
            commit('setHistory', history.slice(0, 10))
        }
    },
})
export default store