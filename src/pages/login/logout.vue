<template>
    <el-dialog
    title="安全退出"
    :visible="dialogVisible"
    width="30%"
    :before-close="logout">
    <span>确定要退出吗</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="logout">确 定</el-button>
    </span>
    </el-dialog>
</template>
<script>
export default {
    data () {
        return {
            dialogVisible: true
        }
    },
    methods: {
        cancel () {
            this.$router.back()
        },
        logout () {
            this.axios.get('/api/common/cleartoken')
            .then((response) => {
                if (response.data.code == 0) {
                    this.$store.commit('logout');
                    this.$router.push('/login');
                } else {
                    this.$alert(response.data.msg, '提示')
                }
            }).catch(function (error) {
                this.$alert('服务器繁忙，请稍后重试', '提示')
            })
        }
    }
}
</script>
