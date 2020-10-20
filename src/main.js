import Vue from 'vue'
import App from './App'
import store from './store'
Vue.prototype.$store = store
import fly from './utils/request'

Vue.prototype.$http = fly;
Vue.config.productionTip = false

import navbar from '@/components/navbar.vue'
Vue.component('navbar',navbar)
import tabbar from '@/components/tabbar.vue'
Vue.component('tabbar',tabbar)
import search from '@/components/search.vue'
Vue.component('search',search)
import item from '@/components/item.vue'
Vue.component('item',item)
App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()