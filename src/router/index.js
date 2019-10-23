import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import {addRoutes} from '@/utils/index'
Vue.use(Router)
const router = new Router({
    mode: 'history'
})
let routers = addRoutes()
router.addRoutes(routers)
router.beforeEach((to, from, next) => {
    if (to.path !== '/login') {
        // 登录验证
        if (!store.state.userInfo.id) {
            router.push('/login')
        }
    }
    if (to.meta.addtab) {
        store.commit('addTabs', {
            label: to.meta.label,
            name: to.meta.name
        })
    }
    next()
})
export default router
