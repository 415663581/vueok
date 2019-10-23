<template>
    <el-dialog
    title="提示"
    :visible="true"
    width="30%"
    center>
        <span>需要注意的是内容是默认不居中的</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="visible = false">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
}
</script>
