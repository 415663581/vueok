<template>
    <div>
        <!-- <subnav style="margin:10px 0;" :ids="checkedids"></subnav> -->
        <el-table
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectionChange">
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column
        prop="id"
        label="id"
        width="55">
        </el-table-column>
         <el-table-column
        prop="productiontotal"
        label="产品标题"
        width="80">
        </el-table-column>
         <el-table-column
        prop="productionsize"
        label="产品尺码"
        width="80">
        </el-table-column>
         <el-table-column
        prop="productioncolor"
        label="产品颜色"
        width="80">
        </el-table-column>
        <el-table-column
        label="产品图片"
        width="100">
            <template slot-scope="scope">
                <div style="width:40px; height:30px; overflow:hidden">
                <img :src="scope.row.avatarUrl" width="100%"/>
                </div>
            </template>
        </el-table-column>
         <el-table-column
        prop="productionnum"
        label="加购数量"
        width="80">
        </el-table-column> 
        <el-table-column
        prop="username"
        label="用户名"
        width="80">
        </el-table-column>
        <el-table-column
        prop="telphone"
        label="用户电话"
        width="110">
        </el-table-column>
         <el-table-column
        label="添加时间"
        show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.addtime|timeformate('yyyy-mm-dd hh:ii')}}</template>
        </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :pageCount="totalPages"
            :pageSize = "pageSize"
            :pageSizes = "pageSizes"
            :currentPage="currentPage"
            :total="totalRows"
            @current-change="currentChange"
            @size-change="sizeChange"
            >
            </el-pagination>
        </div>
        <router-view name="cart"/>
    </div>
</template>
<script>
import subnav from '@/components/subnav'
import timeformate from  '@/filters/index'
export default {
    data () {
        return {
            tableData: [],
            currentPage: 1,
            totalPages: 1,
            pageSize: 10,
            totalRows: 10,
            pageSizes: [5,10],
            checkedids:[],
            loading: ''
        }
    },
    filters: {
        timeformate
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
    components: {
        subnav
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
            this.axios.get('/api/cart/getData', {
                params: {
                    currentpage: this.currentPage,
                    pagesize: this.pageSize
                }
            }).then((data) => {
                    let dataInfo = data.data.data
                    this.tableData = dataInfo.listdata
                    this.currentPage = parseInt(dataInfo.currentpage)
                    this.totalPages = dataInfo.totalpages
                    this.pageSize = parseInt(dataInfo.pagesize)
                    this.totalRows = dataInfo.totalrows
                    this.loading.close()
            }).catch((error) => {
                    this.loading.close()
            })
        },
        selectionChange (selection) {
            let curids = []
            if (selection.length > 0) {
                selection.forEach((item) => {
                    curids.push(item.id)
                })
            }
            this.checkedids = curids
        }
    },
    watch: {
        $route (to, from) {
            if (to.path == '/cart/index') {
                 this.getData()
            }
        }
    }
}
</script>
<style scoped>
.block .el-pagination{
    background: #fff;
}
</style>
