<template>
    <el-dialog
    title="提示"
    :visible="visible"
    width="30%"
    @close="back"
    center>
    <span>你确定要删除吗</span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="back">取 消</el-button>
        <el-button type="primary" @click="remove">确 定</el-button>
    </span>
    </el-dialog>
</template>
<script>
export default {
    data () {
        return {
            visible: true,
            ids: 0
        }
    },
    beforeMount () {
        this.ids = this.$route.query.id
    },
    methods: {
        back () {
            this.visible = false
            this.$router.go(-1)
        },
        remove () {
            
            // ajax 删除
            this.axios.delete('/api/role/delete', {
                params: {
                    id: this.ids
                }
            }).then ((data) => {
                if (data.data.code == 0) {
                    this.$alert('删除成功', '提示')
                    this.$router.go(-1)
                } else {
                    this.$alert(data.data.msg, '提示')
                }
            }).catch(() => {
                this.$alert('网络错误请稍后重试', '提示')
            })
        }
    }
}
</script>
