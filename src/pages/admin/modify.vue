<template>
    <el-dialog title="管理员密码修改" :visible="visible" @close="back" width="40%">
        <el-form ref="create" :model="form"  :ref="form" :rules="rules" label-width="120px">
            <el-row>
                <el-col :span="16">
                    <el-form-item label="管理名称" prop="rolename">
                        <el-select v-model="form.rolename">
                            <template v-for="(item, key) in listdata">
                                <el-option :value="item.id" :label="item.rolename" :key="key"></el-option>
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="管理员编号" prop="roleid">
                        <el-select v-model="form.roleid" >
                            <template v-for="(item, key) in listdata">
                                <el-option :value="item.id" :label="item.roleid" :key="key"> </el-option>
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="管理员姓名" prop="username">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="修改密码" prop="userpassword">
                        <el-input type="password" v-model="form.userpassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
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
            id:0,
            listdata:[],
            form: {
                roleid: '',
                username: '',
                userpassword:'', 
                rolename : ''
            },
            rules: {
                userpassword: [
                    
                     { validator: validatePass2, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                    
                ]
            }
        }
    },
    beforeMount () {
        this.getModuleData()
        let ids = this.$route.query.id
        this.id = ids[0]
        this.getData()
    },
    methods: {
        getModuleData () {
            this.axios.get('/api/role/getData',{
                 params: {
                    id: this.$store.state.roleInfo['id']
                }
            })
            .then((data) => {
                this.listdata = data.data.data.listdata
                console.log(this.listdata);
            }).catch((errr) => {
                this.$alert('网络错误请稍后重试', '提示')
            })
        },
        getData () {
            this.axios.get('/api/admin/getRow', {
                params: {
                    id: this.id
                } 
            }).then ((data) => {
                if (data.data.code === 0) {
                    this.form.rolename = data.data.data.rolename
                    this.form.roleid = data.data.data.roleid
                    this.form.username = data.data.data.username
                } else {
                    this.$alert(data.data.msg, '提示')
                    this.$router.go(-1)
                }
            }).catch ((error) => {

            })
        },
        back () {
            this.visible = false
            this.$router.push('/admin/index')
        },
        submitform () {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    this.$refs.create.validate((status) => {
                        if (status) {
                            this.axios.post('/api/admin/edit', {
                                params: {
                                    userpassword: this.form.userpassword
                                }
                            }).then((data) => {
                                if (data.data.code === 0) {
                                    this.$alert('修改成功', '提示')
                                    this.$router.go(-1) 
                                } else {
                                    this.$alert(data.data.msg, '提示')
                                }
                            }).catch((error) => {
                                this.$alert('网络错误请稍后重试', '提示')
                            })
                        }
                    })
                }else {
                    console.log("error")
                }
            })
        }
    }
}
</script>
