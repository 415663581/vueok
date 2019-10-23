<template>
    <div>
        <subnav style="margin:10px 0;" :ids="checkedids"></subnav>
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
        prop="username"
        label=" 用户名"
        width="120">
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
        <router-view name="role"/>
    </div>
</template>
<script>
import subnav from '@/components/subnav'
export default {
    data () {
        return {
            tableData: [],
            currentPage: 1,
            totalPages: 1,
            pageSize: 10,
            totalRows: 10,
            pageSizes: [10, 15, 20],
            checkedids:[],
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
            this.axios.get('/api/user/getData', {
                params: {
                    currentpage: this.currentPage,
                    pagesize: this.pageSize
                }
            })
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
    },
    watch: {
        $route (to, from) {
            if (to.path == '/role/index') {
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
