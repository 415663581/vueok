<template>
    <div>
        <subnav style="margin:10px 0;" :ids="checkedids"></subnav>
        <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectionChange">
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column
        label="管理员编号"
        width="120">
        <template slot-scope="scope">{{ scope.row.roleid }}</template>
       
        </el-table-column>
        <el-table-column
        prop="name"
        label="当前管理员"
        width="120">
        <template slot-scope="scope">{{ scope.row.username}}</template>
        </el-table-column>
        <el-table-column
        prop="address"
        label="管理员名称"
        show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.rolename }}</template>
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
        <router-view name="admin"/>
    </div>
</template>
<script>
import subnav from '@/components/subnav'
import timeformate from  '@/filters/index'
export default {
    data () {
        return {
            tableData: [],
            visible: false,
            currentPage: 1,
            totalPages: 1,
            pageSize: 10,
            totalRows: 10,
            pageSizes: [10, 15, 20],
            checkedids: [],
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
        open (param) {
            this.visible = true
        },
        sizeChange (pagesize) {
            this.pagesize = pagesize
            this.getData()
        },
        currentChange (currentpage) {
            this.currentpage = currentpage
            this.getData()
        },
        getData () {
            this.axios.get('/api/admin/getData', 
                {
                    params: {
                        currentpage: this.currentpage,
                        pagesize: this.pagesize
                    }
                }
            )
                .then((data) => {
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
            if (to.path == '/admin/index') {
                this.getData()
            }
        }
    }
}
</script>
<style>
.block .el-pagination{
    background: #fff;
}
</style>
