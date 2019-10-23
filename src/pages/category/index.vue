<template>
    <div>
        <subnav style="margin:10px 0;" :ids="checkedids"></subnav>
        <el-table
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%; background:#fff;"
        @selection-change="selectionChange">
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column
        prop="pid"
        label="PID"
        width="120">
        </el-table-column>
        <el-table-column
        label="分类名称"
        width="120">
            <template slot-scope="scope">
                |-{{'-'.repeat(scope.row.pid.split('-').length)}}
                {{scope.row.categoryname}}
            </template>
        </el-table-column>
        <el-table-column
        prop="categoryorder"
        label="分类排序"
        width="120">
        </el-table-column>
        <el-table-column
        label="添加时间"
        show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.addtime|timeformate('yyyy-mm-dd')}}</template>
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
        <router-view name="category"/>
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
            checkedids: []
        }
    },
    filters: {
        timeformate
    },
    beforeMount () {
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
            this.pageSize = pagesize
            this.getData()
        },
        currentChange (currentpage) {
            this.currentPage = currentpage
            this.getData()
        },
        getData () {
            this.axios.get('/api/category/getData', 
                {
                    params: {
                        currentpage: this.currentPage,
                        pagesize: this.pageSize
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
                }).catch((error) => {
                    console.log(error)
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
    }
}
</script>
<style scoped>
.block .el-pagination{
    background: #fff;
}
</style>
