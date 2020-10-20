import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)
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
        search: {
            type: '',
            value: ''
        },
        isAll:true
    },
    getters: {
        isIPX: state => state.isIPX,
        navbar: state => state.navbar,
        tabbar: state => state.tabbar,
        search: state => state.search,
        isAll: state => state.isAll,
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
        setSearch(state, search = {
            type: '',
            value: ''
        }) {
            state.search = search
        },
        setIsAll(state, isAll = false) {
            state.isAll = isAll
        },
    },
    actions: {}
})
export default store