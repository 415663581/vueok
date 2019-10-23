<template>
    <div>
        <div class="container-page">
            <el-breadcrumb separator="/">
            <el-breadcrumb-item to="/member">会员中心</el-breadcrumb-item>
            <el-breadcrumb-item>我的订单</el-breadcrumb-item>
            </el-breadcrumb>
            <el-table
            :data="listData"
            border
            style="width: 100%">
            <el-table-column type="expand" style="padding:0;">
                <template slot-scope="props">
                    <el-table
                            :data="props.row.children"
                            style="width: 100%; margin:0; padding:0;"
                            border
                            >
                            <el-table-column
                            prop="productionphoto"
                            label="图片">
                            <template slot-scope="scope">
                                <div class="cover-img">
                                <img :src="scope.row.productionphoto" width="50"/>
                                </div>
                            </template>
                            </el-table-column>
                            <el-table-column
                            prop="productiontitle"
                            label="标题"
                            width="180">
                            </el-table-column>

                            <el-table-column
                            prop="productionprice"
                            label="价格">
                            </el-table-column>
                            <el-table-column
                                prop="productionsize"
                                label="尺码"
                                width="180">
                            </el-table-column>
                            <el-table-column
                            prop="productioncolor"
                            label="颜色"
                            width="180">
                            </el-table-column>
                        </el-table>
                </template>
            </el-table-column>
            <el-table-column
                label="订单号"
                prop="ordersn">
            </el-table-column>
            <el-table-column
                label="订单金额"
                prop="totalprice">
            </el-table-column>
            <el-table-column
                label="订单状态">
                <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.paymentstatus == 1" >已支付</el-tag>
                <el-tag type="warning" v-else>待支付</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                label="订单时间"
                prop="addtime">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                <router-link
                :to="{path:'/payment',query:{ordersn:scope.row.ordersn}}"
                v-if="scope.row.paymentstatus == 0"
                class="el-button el-button--success el-button--small"
                >继续支付</router-link>
                </template>
            </el-table-column>
            </el-table>
            <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :pageCount="totalPages"
            :pageSize = "pageSize"
            :pageSizes = "pageSizes"
            :currentPage="currentPage"
            :total="totalRows"
            @current-change="currentChange"
            @size-change="sizeChange"
            class="margin-bottom-10 margin-top-10"
            >
            </el-pagination>
        </div>
        <router-view name="orders"/>
    </div>
</template>
<script>
export default {
    data () {
        return {
            ids: [],
            listData: [],
            currentPage: 1,
            totalPages: 1,
            pageSize: 10,
            totalRows: 10,
            pageSizes: [10, 15, 20],
            loading: ''
        }
    },
    beforeMount () {
        this.loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        })
        this.getData()
    },
    mounted () {
        this.getData()
    },
    methods: {
        sizeChange (pagesize) {
            this.pageSize = pagesize
            this.getData()
        },
        currentChange (currentpage) {
            this.currentPage = currentpage
            this.getData()
        },
        getData () {
            this.axios.get('/api/order/getAllData', {params:{
                accountid: this.$store.state.userInfo.id,
                pagesize:this.pageSize,
                currentpage: this.currentPage,
            }})
            .then((data) => {
                if (data.data.code == 0) {
                    let dataInfo = data.data.data
                    this.listData = dataInfo.listdata
                    this.totalRows = dataInfo.totalrows
                    this.currentPage = parseInt(dataInfo.currentpage)
                    this.pageSize = parseInt(dataInfo.pagesize)
                    this.totalPages = dataInfo.totalpages
                    this.loading.close()
                } else {
                    this.$alert(data.data.msg, '提示')
                }
            })
            .catch((error) => {
                this.loading.close()
                this.$router.push('/error')
            })
        }
    },
    watch: {
        $route (to, from) {
            if (to.path == '/orders/index') {
                 this.getData()
            }
        }
    }
}
</script>
<style scoped>
.container-page{
    padding-bottom: 20px;
}
.container-page >>> .el-breadcrumb{
    height: 50px;
    line-height: 50px;
}
</style>
