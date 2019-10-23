const routers = [
    {
        path: '/',
        name: 'index',
        components: {
            default: resolve => require(['@/pages/index/index'], resolve)
        },
        meta: {
            label: '主页'
        }
    },
    {
        path: '/login',
        name: 'login',
        components: {
            default: resolve => require(['@/pages/login/login'], resolve)
        },
        meta: {
            label: '登录'
        }
    }
]
export default routers
