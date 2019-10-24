<template>
  <div>
    <el-dialog title="管理员密码修改" :visible.sync="dialogFormVisible" @close='handleClose'>
      <el-form :model="form" :rules="rules" ref="create" label-width="100px">
        <el-form-item label="用户名：" prop="username">
          <el-input placeholder="请输入用户名" v-model="form.username" disabled='disabled'></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="userpassword">
          <el-input placeholder="请输入新密码" v-model="form.userpassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="repassword">
          <el-input placeholder="请再次输入密码" v-model="form.repassword" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">确 定</el-button>
            <el-button @click="handleCancel">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
        id:'',
        form: {
            username:'',
            userpassword:'',
            repassword:''
        },
        dialogFormVisible: true,
        rules: {
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
            ],
            userpassword: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
            ],
            repassword: [
                { required: true, message: '请再次输入密码', trigger: 'blur' },
                { validator: (rule,value,callback) => {
                    if( value !=  this.form.userpassword) {
                        callback(new Error('确认密码不正确'))
                    } else {
                        callback()
                    }
                }, trigger: 'blur' }
            ]
        }
    }
  },
  created(){
    this.id  = this.$route.query.id[0]
    this.getData()
  },
  methods:{
        getData () {
            this.axios.get('/api/admin/getRow', {
                params:{
                    id: this.id
                }
            })
            .then( (response) => {
                if (response.data.code === 0) {
                    this.form.username = response.data.data.username
                } else{
                    this.alert(response.data.data.msg)
                }
            })
            .catch((error) => {
                this.$alert('服务器繁忙，请稍后重试')
            })
        },
        handleClose() {
            this.$router.go(-1)
        },
        submit() {
            this.$refs['create'].validate((valid) => {
            if (valid) {
                this.axios.post('/api/admin/edit',{
                    params:{
                        username: this.form.username,
                        userpassword: this.form.userpassword,
                        id: this.id
                    }
                }).then((response)=>{
                    if (response.data.code === 0) {
                        this.$alert('修改成功', '提示', {
                            callback: action => {
                                this.$router.go(-1)
                            }
                        })
                    }
                }).catch((error)=>{
                    this.$alert('网络错误请稍后重试', '提示')
                })
            }
            })
        },
        handleCancel(){
            this.$router.go(-1)
        }
    }
}
</script>
<style scoped>

</style>
