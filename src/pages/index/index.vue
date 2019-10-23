<template>
    <el-container>
    <el-aside :width="asidewidth">
        <el-menu
        default-active="1"
        :default-openeds="openeds"
        router
        :collapse="isCollapse"
        >
             <el-submenu index="0">
                 <template slot="title">
                <i class="el-icon-menu"></i>
                <span>后台管理系统</span>
                </template>
             </el-submenu>
            <el-submenu index="1">
                <template slot="title">
                <i class="el-icon-monitor"></i>
                <span>内容管理</span>
                </template>
                <template v-for="(item, key) in navData">
                    <el-menu-item  v-if="item.moduletype == 2" :index="item.modulepath" :key="key">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{item.modulename}}</span>
                    </el-menu-item>
                </template>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                <i class="el-icon-menu"></i>
                <span>平台管理</span>
                </template>
                <template v-for="(item, key) in navData">
                    <el-menu-item  v-if="item.moduletype == 3" :index="item.modulepath" :key="key">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{item.modulename}}</span>
                    </el-menu-item>
                </template>
            </el-submenu>
        </el-menu>
    </el-aside>
    <el-container>
        <el-header>
            <el-row>
                <el-col :span="2">
                    <el-button type="primary" size="medium" :icon="icon" @click="swtichaside" class="asideswitch"></el-button>
                </el-col>
                <el-col :span="14">
                    <el-menu :default-active="defaultactive" class="el-menu-demo" mode="horizontal" router>
                        <el-menu-item  index="/home">
                                控制台
                        </el-menu-item>
                        <template v-for="(item, key) in navData">
                            <el-menu-item v-if="item.moduletype == 1" :index="item.modulepath" :key="key">
                                {{item.modulename}}
                            </el-menu-item>
                        </template>
                    </el-menu>
                </el-col>
                <el-col :span="8">
                    <el-menu  class="el-menu-demo" mode="horizontal" style="float:right;" @select="seclectmenu">
                        <el-menu-item index="1">
                            {{this.$store.state.roleInfo.rolename}} - {{this.$store.state.userInfo.username}}
                        </el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">个人中心</template>
                                <el-menu-item index="/member">个人信息</el-menu-item>
                                <el-menu-item index="/logout">安全退出</el-menu-item>
                            </el-submenu>
                    </el-menu>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-container style="margin-top:5px;">
                <el-header style="height:45px;">
                <el-tabs
                v-model="activeName"
                type="card" 
                closable 
                @tab-remove="removehandle" 
                @tab-click="tabclick"
                >
                    <el-tab-pane
                        v-for="(tab, key) in tabs"
                        :key="key"
                        :label="tab.label"
                        :name="tab.name"
                        style="width:80px;"
                    >
                    </el-tab-pane>
                </el-tabs>
                </el-header>
                <el-main class="elmain">
                    <keep-alive>
                    <router-view name="main"/>
                    </keep-alive>
                </el-main>
            </el-container>
        </el-main>
        <el-footer>Footer</el-footer>
    </el-container>
    </el-container>
</template>
<script>
import routerConfig from '@/config/router.config.js'
import {addRoutes} from '@/utils/index'
export default {
    data () {
        return {
            icon: 'el-icon-d-arrow-left',
            asidewidth: '200px',
            openeds: [1],
            isCollapse: false,
            navData: this.$store.state.moduleInfo
        }
    },
    computed: {
        tabs () {
            return this.$store.state.tabs
        },
        activeName: {
            get () {
                return this.$route.path
            },
            set () {
                return this.$route.path
            }
        },
        defaultactive () {
            if (this.$route.path === '/') {
                return '/home'
            } else {
                return this.$route.path
            }
        }
    },
    beforeMount () {
        // 挂载动态路由
        let routers = addRoutes()
        this.$router.addRoutes(routers)
    },
    mounted () {
        if (this.$route.path === '/') {
            this.$router.push('/home')
        } 
    },
    methods: {
        swtichaside () {
            if (this.isCollapse) {
                this.isCollapse = false
                this.asidewidth = '200px'
                this.icon = 'el-icon-d-arrow-left'
            } else {
                this.isCollapse = true
                this.asidewidth = '64px'
                this.icon = 'el-icon-d-arrow-right'
            }
        },
        handleOpen (key, keyPath) {
            console.log(key, keyPath)
        },
        seclectmenu (index, indexpath) {
            if (index === '/logout' ) {
                this.$confirm('你确定要退出吗?', '提示', {
                    confirmButtonText: '退出',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.$store.commit('logout')
                    this.$router.push('/login')
                }).catch(() => {
                    this.$message ({
                        message: '取消退出',
                        type: 'success'
                    })
                })
            }
            if (index === '/member') {
                this.$router.push('/member')
            }
        },
        removehandle (name) {
            this.$store.commit('removetabs', name)
        },
        tabclick (tab) {
            this.$router.push(tab.name)
        }
    }
}
</script>
<style scoped>
.el-container{
    height: 100%;
}
.el-header{ background: #fff; }
.el-aside{
    height: 100%;
    background: #fff;
}
.el-main{
    background: #f0f0f0;
    padding:0px;
}
.elmain{
    padding:0 20px;
    margin-top:10px;
}
.el-menu{
    height: 100%;
}
.asideswitch{
    margin-top:10px;
}
.main-container{
    padding: 5px;
    height: 400px;
    overflow: auto;
}
.el-tabs{
    padding-top:5px;
}
.el-tabs >>> .el-tabs__header{
    margin:0;
}
.el-tabs >>> .is-active{
    background: #f0f0f0;
}
</style>
