<template>
    <el-dialog title="收货地址" :visible="visible" @close="back">
        
    </el-dialog>
</template>
<script>
export default {
    data () {
        return {
            visible: true
        }
    },
    methods: {
        back () {
            this.visible = false
            this.$router.go(-1)
        }
    }
}
</script>
