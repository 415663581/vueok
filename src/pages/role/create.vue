<template>
    <el-dialog title="角色添加" :visible="visible" @close="back">
        <el-form ref="create" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="角色名称" prop="rolename">
                <el-input v-model="form.rolename"></el-input>
            </el-form-item>
            <el-form-item label="角色排序" prop="roleorder">
                <el-input v-model.number="form.roleorder"></el-input>
            </el-form-item>
            <el-form-item label="角色权限" prop="allowmodule">
                <el-checkbox-group v-model="form.allowmodule">
                        <template v-for="(item, key) in allModules">
                        <el-checkbox :label="item.id" :key="key">{{item.modulename}}</el-checkbox>
                        </template>
                </el-checkbox-group>
            </el-form-item>
             <el-form-item>
                <el-button type="primary" @click="submitform">立即创建</el-button>
                <el-button @click="back">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
export default {
    data () {
        return {
            visible: true,
            allModules: [],
            form: {
                rolename: '',
                roleorder: '',
                allowmodule: []
            },
            rules: {
                rolename: [
                    {required: true, message: '角色名称不能为空', trigger: 'blur'},
                    {min: 2, max: 10, message: '角色名称长度在 2 到 20 个字符', trigger: 'blur'}
                ],
                roleorder: [
                    {type: 'number', required: true, message: '角色排序只能是数字', trigger: 'blur'}
                ],
                allowmodule: [
                    {required: true, message: '角色权限不能为空', trigger: 'blur'}
                ]
            }
        }
    },
    beforeMount () {
        this.getModuleData()
    },
    methods: {
        getModuleData () {
            this.axios.get('/api/role/getRow', {
                params: {
                    id: this.$store.state.roleInfo['id']
                }
            }).then((data) => {
                this.allModules = data.data.data.moduleData
            }).catch((errr) => {
                this.$alert('网络错误请稍后重试', '提示')
            })
        },
        back () {
            this.visible = false
            this.$router.push('/role/index')
        },
        submitform () {
            this.$refs.create.validate((status) => {
                if (status) {
                    this.axios.post('/api/role/create', {
                        params: {
                            rolename: this.form.rolename,
                            roleorder: this.form.roleorder,
                            allowmodule: this.form.allowmodule
                        }
                    }).then((data) => {
                        if (data.data.code === 0) {
                            this.$alert('添加成功', '提示')
                            this.$router.go(-1)
                        } else {
                            this.$alert(data.data.msg, '提示')
                        }
                    }).catch(() => {
                        this.$alert('网络错误请稍后重试', '提示')
                    })
                }
            })
        }
    }
}
</script>
