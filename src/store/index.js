import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import router from '@/router'
Vue.use(Vuex)
const store = new Vuex.Store({
    plugins: [
        persistedState({ storage: window.sessionStorage })
    ],
    state: {
        token: '',
        userInfo: {},
        roleInfo: {},
        moduleInfo: [],
        tabs: [
            {
                label: '控制台',
                name: '/home'
            }
        ]
    },
    getters: {
        lastTab (state) {
            if (state.tabs.length === 1) {
                return state.tabs[0]
            } else {
                return state.tabs[state.tabs.length - 1]
            }
        }
    },
    mutations: {
        setToken (state, value) {
            state.token = value
        },
        initLogin (state, loginInfo) {
            state.userInfo = loginInfo.userInfo
            state.roleInfo = loginInfo.roleInfo
            state.moduleInfo = loginInfo.moduleInfo
        },
        logout (state) {
            state.userInfo = {}
            state.roleInfo = {}
            state.moduleInfo = []
            state.tabs = [
                {
                    label: '控制台',
                    name: '/home'
                }
            ]
        },
        addTabs (state, tabInfo) {
            let flag = false
            state.tabs.forEach((item) => {
                if (item.name === tabInfo.name) {
                    flag = true
                }
            })
            if (!flag) {
                state.tabs.push(tabInfo)
                router.push(tabInfo.name)
            }
        },
        removetabs (state, tabname) {
            state.tabs.forEach((item, key) => {
                if (item.name === tabname) {
                    if (state.tabs.length > 1) {
                        state.tabs.splice(key, 1)
                        let lastone = state.tabs[state.tabs.length - 1]
                        router.push(lastone.name)
                    }
                }
            })
        }
    }
})
export default store
