<template>
    <el-dialog title="管理员添加" :visible="visible" @close="back" width="40%">
        <el-form ref="create" :model="form" :rules="rules" label-width="120px">
            <el-row>
                <el-col :span="16">
                    <el-form-item label="管理名称" prop="rolename">
                        <el-select v-model="form.rolename" placeholder="请选择管理名称">
                            <template v-for="(item, key) in admindata.listdata">
                                <el-option :value="item.id" :label="item.rolename" :key="key"></el-option>
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="管理员编号" prop="roleid">
                        <el-select v-model="form.roleid" placeholder="请选择对应的管理编号">
                            <template v-for="(item, key) in admindata.listdata">
                                <el-option :value="item.id" :label="item.roleid" :key="key"> </el-option>
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="管理员姓名" prop="username">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="管理员密码" prop="userpassword">
                        <el-input type="password" v-model="form.userpassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="再次确认密码" prop="repassword">
                        <el-input  type="password" v-model="form.repassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitform">立即创建</el-button>
                        <el-button @click="back">取消</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </el-dialog>
</template>
<script>
export default {
    data () {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            if (this.form.checkPass !== '') {
                this.$refs.form.validateField('checkPass');
            }
            callback();
            }
        }
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.form.userpassword) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        }
        return {
            visible: true,
            admindata:[],
            form: {
                roleid: '',
                username: '',
                userpassword:'', 
                repassword:"",
                rolename : ''
            },
            rules: {
                roleid: [
                    {required: true, message: '管理员编号不能为空', trigger: 'blur'},
                ],
                rolename: [
                    {required: true, message: '管理员名称不能为空', trigger: 'blur'},
                ],
                username: [
                    {required: true, message: '请输入姓名', trigger: 'blur'},
                    {min: 5, max: 20, message: '用户名长度在 5 到 20 个字符', trigger: 'blur'},
                ],
                 userpassword: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {validator: validatePass2, trigger: 'blur' }
                ],
                repassword: [
                    { validator: validatePass2, trigger: 'blur' }
                    
                ]
            }
        }
    },
    beforeMount () {
        this.getModuleData()
    },
    methods: {
        getModuleData () {
            this.axios.get('/api/role/getData')
            .then((data) => {
             this.admindata = data.data.data
            }).catch((errr) => {
                this.$alert('网络错误请稍后重试', '提示')
            })
        },
        back () {
            this.visible = false
            this.$router.push('/admin/index')
        },
        submitform () {
            this.$refs.create.validate((status) => {
                if (status) {
                    this.axios.post('/api/admin/create', {
                        params: {
                            roleid: this.form.roleid,
                            username: this.form.username,
                            userpassword: this.form.userpassword
                        }
                    }).then((data) => {
                        if (data.data.code === 0) {
                            this.$router.go(-1) 
                        } else {
                            this.$alert(data.data.msg, '提示')
                        }
                         this.$router.go(-1)
                    }).catch(() => {
                        this.$alert('网络错误请稍后重试', '提示')
                    })
                }
            })
        }
    }
}
</script>

