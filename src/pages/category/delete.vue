<template>
    <el-dialog
    title="提示"
    :visible="visible"
    width="30%"
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
    props:['ids'],
    data () {
        return {
            visible: true
        }
    },
    methods: {
        back () {
            this.visible = false
            this.$router.go(-1)
        },
        remove () {
            let ids = this.$route.query.id
            // ajax 删除
            this.visible = false
            this.$router.go(-1)
        }
    }
}
</script>
