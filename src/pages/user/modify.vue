<template>
  <span>
    <el-dialog title="用户修改" :visible.sync="dialogFormVisible" @close='handleClose'>
      <!-- 表单 -->
      <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名：" prop="username">
          <el-input placeholder="请输入用户名" v-model="form.username" ></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="telphone">
          <el-input placeholder="请输入用户名" v-model="form.telphone" ></el-input>
        </el-form-item>
        <el-form-item label="认证状态">
            <el-switch
              v-model="form.authority"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            <el-button @click="handleCancel">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </span>
</template>
<script>
export default {
  name:'useredit',
  data() {
    return {
      form: {
        username:'',
        telphone:'',
        authority:'',
        id:''
      },
      dialogFormVisible: true,
      formLabelWidth: '80px',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        telphone: [
          { required: true, message: '请手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为11位数字', trigger: 'blur' }
        ]
      }
    }
  },
  created(){
    this.getData();
  },
  methods:{
    getData () {
          let id=this.$route.query.id[0]
          //用户默认数据
          this.axios.get('/api/user/getRow',{
              params:{id:id}
          })
          .then(response=>{
              if(response.data.code == 0){
                  this.form.username = response.data.data.username
                  this.form.telphone = response.data.data.telphone
                  this.form.authority = response.data.data.authority
                  this.form.id = response.data.data.id
              }else{
                  this.$message(response.data.msg, Error)
              }
          })
          .catch(function(err){
              this.$message('服务器繁忙，请稍后重试');
          }.bind(this))
    },
    postAdimnData(){
      this.axios.post('/api/user/edit',{
        params:{
          id:this.form.id,
          username:this.form.username,
          telphone:this.form.telphone,
          authority:this.form.authority
        }
      }).then((res)=>{
        // 修改成功
        this.$message('修改成功','success')
      }).catch((error)=>{
        this.$message('服务器忙，请稍后重试','error')
      })
    },
    handleClose(){
      this.$router.go(-1)
    },
    handleCancel(){
      this.dialogFormVisible=false
    },
    submitForm(ruleForm){
      this.dialogFormVisible = false
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // 提交修改
          this.postAdimnData()
        } else {
          this.message('服务器忙，请稍后重试','error')
          return false;
        }
      });
    }
  }
}
</script>
<style scoped>

</style>
