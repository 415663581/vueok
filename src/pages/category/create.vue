<template>
    <el-dialog title="分类添加" :visible="visible" @close="back" width="40%">
        <el-form ref="create" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="产品分类" prop="pid">
                <el-select v-model="form.pid" placeholder="请选择分类">
                    <el-option :value="0" label="根分类">
                        |--根分类
                    </el-option>
                    <template v-for="(item, key) in alldata">
                        <el-option :value="item.neworder" :label="item.categoryname" :key="key">
                            |-{{'-'.repeat(item.pid.split('-').length)}}{{item.categoryname}}
                        </el-option>
                    </template>
                </el-select>
            </el-form-item>
            <el-form-item label="分类名称" prop="categoryname">
                <el-input v-model.number="form.categoryname"></el-input>
            </el-form-item>
            <el-form-item label="分类排序" prop="categoryorder">
                <el-input v-model.number="form.categoryorder"></el-input>
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
            alldata: [],
            form: {
                pid: '',
                categoryname: '',
                categoryorder: '',
            },
            rules: {
                pid: [
                    {required: true, message: '产品分类不能为空', trigger: 'blur'}
                ],
                categoryname: [
                    {required: true, message: '分类名称不能为空', trigger: 'blur'},
                    {min: 2, max: 30, message: '分类名称长度在 2 到 30 个字符', trigger: 'blur'}
                ],
                categoryorder: [
                    {type: 'number', required: true, message: '分类排序只能是数字', trigger: 'blur'}
                ]
            }
        }
    },
    beforeMount () {
        this.getModuleData()
    },
    methods: {
        getModuleData () {
            this.axios.get('/api/category/getAllData',{
            })
            .then((data) => { 
                this.alldata = data.data.data
            }).catch((error) => {
                this.$alert('网络错误请稍后重试', '提示')
            })
        },
        back () {
            this.visible = false
            this.$router.push('/category/index')
        },
        submitform () {
            this.$refs.create.validate((status) => {
                if (status) {
                    this.axios.post('/api/category/create', {
                        params: {
                            pid: this.form.pid,
                            categoryname: this.form.categoryname,
                            categoryorder: this.form.categoryorder
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
