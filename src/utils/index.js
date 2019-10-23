import store from '@/store/index'
import routerConfig from '@/config/router.config'
export function addRoutes () {
    let child = [
        {
            path: '/home',
            name: 'home',
            components: {
                main: resolve => require(['@/pages/index/home'], resolve)
            },
            meta: {
                label: '控制台',
                name: '/home',
                addtab: true
            }
        },
        {
            path: '/member',
            name: 'member',
            components: {
                main: resolve => require(['@/pages/index/member'], resolve)
            },
            meta: {
                label: '个人中心',
                name: '/member',
                addtab: true
            }
        }
    ]
    if (store.state.moduleInfo.length > 0) {
        let dynamicRouter = []
        store.state.moduleInfo.forEach((item) => {
            let pathinfo = item.modulepath.split('/')
            pathinfo.shift()
            let childrouter = []
            if (item.children) {
                item.children.forEach((childitem) => {
                    let childpathinfo = childitem.modulepath.split('/')
                    childpathinfo.shift()
                    childrouter.push({
                        path: childitem.modulepath,
                        name: childpathinfo[0] + childpathinfo[1],
                        components: {
                            [childpathinfo[0]]: resolve => require(['@/pages/' + childpathinfo[0] + '/' + childpathinfo[1]], resolve)
                        }
                    })
                })
            }

            let currouter = {
                path: item.modulepath,
                name: pathinfo[0] + pathinfo[1],
                components: {
                    main: resolve => require(['@/pages/' + pathinfo[0] + '/' + pathinfo[1]], resolve)
                },
                meta: {
                    label: item.modulename,
                    name: item.modulepath,
                    addtab: true
                }
            }
            if (childrouter.length > 0) {
                currouter.children = childrouter
            }
            dynamicRouter.push(currouter)
        })
        child = child.concat(dynamicRouter)
    }
    const routers = routerConfig
    routers[0]['children'] = child
    return routers
}
