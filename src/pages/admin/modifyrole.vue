<template>
  <span>
    <el-dialog title="管理员权限修改" :visible.sync="dialogFormVisible" @close='handleClose'>
      <!-- 表单 -->
      <el-form :model="form" status-icon :rules="rules" ref="create" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名：" prop="username">
          <el-input placeholder="请输入用户名" v-model="form.username" disabled='disabled'></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-select v-model="form.roleid" placeholder="请选择角色">
            <el-option
              v-for="item in roleData"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">确 定</el-button>
            <el-button @click="handleCancel">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </span>
</template>
<script>
export default {
  data() {
    return {
        id: '',
        form: {
            username:'',
            roleData:[],
            roleid:'',
        },
        roleData: [],
        dialogFormVisible: true,
        formLabelWidth: '80px',
        rules: {
            roleid: [
                { required: true, message: '权限不能为空', trigger: 'blur' }
            ]
        }
    }
  },
  created(){
    this.id=this.$route.query.id[0]
    this.axios.get('/api/admin/getRow', {
        params:{
            id: this.id
        }
    })
    .then((response) => {
        if (response.data.code == 0) {
            this.form.roleid = response.data.data.roleid
            this.form.username = response.data.data.username
            this.getRoleData()
        } else{
            this.alert(response.data.data.msg)
        }
    })
    .catch((error) => {
        this.alert('服务器繁忙，请稍后重试')
    })
  },
  methods:{
    getRoleData(){
        this.axios.get('/api/role/getalldata').then((res)=>{
            if(res.data.code === 0){
                this.roleData = res.data.data
            }else{
                this.alert(res.data.data.msg, '提示')
            }
        }).catch((error)=>{
            this.alert('服务器忙，请稍后重试', '提示')
        })
    },
    handleClose(){
        this.$router.go(-1)
    },
    handleCancel(){
        this.dialogFormVisible=false
    },
    submit(ruleForm){
        this.dialogFormVisible = false
        this.$refs['create'].validate((valid) => {
            if (valid) {
                // 提交修改
                this.axios.post('/api/admin/edit',{
                    params:{
                        id: this.id,
                        username: this.form.username,
                        roleid: this.form.roleid
                    }
                }).then((res)=>{
                    if (response.data.code === 0) {
                        // 修改成功
                        this.$alert('修改成功', '提示', {
                            callback: action => {
                                this.dialogTableVisible = false
                                this.$router.go(-1)
                            }
                        })
                    } else {
                        this.dialogTableVisible = false
                        this.$alert(response.data.msg)
                    }
                }).catch((error)=>{
                    this.alert('服务器忙，请稍后重试','error')
                })
            }
      })
    }
  }
}
</script>
<style scoped>

</style>
