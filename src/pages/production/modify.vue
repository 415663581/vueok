<template>
    <el-dialog title="角色添加" :visible="visible" @close="back" width="70%">
        <el-form ref="create" :model="form"  label-width="80px">
            <el-tabs :tab-position="'left'" style="height: 430px;" v-model="active">
                <el-tab-pane label="基本信息" name="base">
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="产品分类" prop="categoryid">
                                <el-select v-model="form.categoryid" placeholder="请选择分类">
                                    <template v-for="(item, key) in allCategory">
                                        <el-option :value="item.id" :label="item.categoryname" :key="key">
                                            |-{{'-'.repeat(item.pid.split('-').length)}}{{item.categoryname}}
                                        </el-option>
                                    </template>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="产品分类" prop="productiontitle">
                                <el-input v-model="form.productiontitle"></el-input>
                            </el-form-item>
                            <el-form-item label="产品价格" prop="productionprice">
                                <el-input v-model="form.productionprice"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                        <el-table-column
                        label="产品图片"
                        width="100">
                            <template slot-scope="scope">
                                <div style="width:40px; height:30px; overflow:hidden">
                                <img :src="scope.row.productionphoto" width="100%"/>
                                </div>
                            </template>
                        </el-table-column>
                            <el-form-item label="产品图片" prop="productionphoto">
                                <uploads :productionphoto="form.productionphoto" 
                                @uploaded="uploaded"></uploads>
                                <input type="hidden" v-model="form.productionphoto">
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="动态属性" name="params">
                    <el-form-item label="产品尺码" prop="productionsize">
                        <template v-for="(item, key) in form.productionsize">
                            <el-col :span="2" :key="key" style="margin-left:4px;">
                                <el-input v-model="form.productionsize[key]"></el-input>
                            </el-col>
                        </template>
                        <el-button-group style="margin-left:4px;">
                        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addsize"></el-button>
                        <el-button type="primary" icon="el-icon-remove-outline"  @click="removesize"></el-button>
                        </el-button-group>
                    </el-form-item>
                    <el-form-item label="产品颜色" prop="productioncolor">
                        <template v-for="(item, key) in form.productioncolor">
                            <el-col :span="2" :key="key" style="margin-left:4px;">
                                <el-input v-model="form.productioncolor[key]"></el-input>
                            </el-col>
                        </template>
                        <el-button-group style="margin-left:4px;">
                        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addcolor"></el-button>
                        <el-button type="primary" icon="el-icon-remove-outline"  @click="removecolor"></el-button>
                        </el-button-group>
                    </el-form-item>
                    
                    <!-- <el-form-item label="产品参数" prop="productionparam">
                         <template v-for="(item, key) in form.productionparam">
                            <el-row :key="key" style="width:300px;">
                                <el-col :span="8"  style="margin-left:4px;">
                                    <el-input v-model="item['key']"></el-input>
                                </el-col>
                                <el-col :span="8"  style="margin-left:4px;">
                                    <el-input v-model="item['value']"></el-input>
                                </el-col>
                            </el-row>
                        </template>
                        <el-button-group>
                            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addparams"></el-button>
                            <el-button type="primary" icon="el-icon-remove-outline"  @click="removeparams"></el-button>
                        </el-button-group>
                    </el-form-item> -->
                </el-tab-pane>
                <el-tab-pane label="产品详情" name="detail">
                    <el-form-item label="内容详情" prop="productiondesc">
                       <editor :desc="form.productiondesc" @editfinished="editfinished"></editor>
                    </el-form-item>
                </el-tab-pane>
            </el-tabs>
           
            <el-form-item style="margin-top:10px;">
            <el-button type="primary" @click="submitform">立即创建</el-button>
            <el-button @click="back">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
import uploads from '@/components/uploads'
import editor from '@/components/editor'
export default {
    data () {
        return {
            visible: true,
            allCategory: [],
            active: 'base',
            form: {
                categoryid: '',
                productiontitle: '',
                productionprice: '0.00',
                productionphoto: '',
                productionsize: [''],
                productioncolor: [''],
                productionparam: [{key:'',value:''}],
                productiondesc: '',
                allowmodule: []
            },
        }
    },
    components: {
        uploads,
        editor
    },
    created () {
        this.getCategoryData()
    },
    mounted () {
        this.getData()
    },
    methods: {
        addsize () {
            this.form.productionsize.push('')
        },
        removesize () {
            if (this.form.productionsize.length > 1) {
                this.form.productionsize.pop()
            }
        },
        addcolor () {
            this.form.productioncolor.push('')
        },
        removecolor () {
            if (this.form.productioncolor.length > 1) {
                this.form.productioncolor.pop()
            }
        },
        // addparams () {
        //     this.form.productionparam.push(['', ''])
        // },
        // removeparams () {
        //     if (this.form.productionparam.length > 1) {
        //         this.form.productionparam.pop()
        //     }
        // },
        getCategoryData () {
            this.axios.get('/api/category/getAllData')
            .then((data) => {
                this.allCategory = data.data.data
            }).catch((errr) => {
                this.$alert('网络错误请稍后重试', '提示')
            })
        },
        uploaded (imgurl) {
            this.form.productionphoto = imgurl
        },
        back () {
            this.visible = false
            this.$router.push('/production/index')
        },
        getData () {
            this.axios.get('/api/production/getRow', {
                params: {
                    id: this.$route.query.id[0]
                }
            }).then((data) => {
                alert(data.data.code)
                if (data.data.code === 0) {
                    this.form.categoryid = data.data.data['categoryid']
                    this.form.productiontitle = data.data.data['productiontitle']
                    this.form.productionprice = data.data.data['productionprice']
                    this.form.productionphoto = data.data.data['productionphoto']
                    this.form.productionsize = data.data.data['productionsize'].split('-')
                    this.form.productioncolor = data.data.data['productioncolor'].split('-')
                    //this.form.productionparam = paramsArr
                    this.form.productiondesc = data.data.data['productiondesc']
                    console.log(this.form)
                } else {
                    this.$alert(data.data.msg, '提示')
                    this.$router.back()
                }
            }).catch((error) => {
                    this.$alert('网络错误请稍后重试', '提示')
                    this.$router.back()
            })
        },
         submitform () {
            this.$refs.create.validate((status) => {
                alert(status)
                if (status) {
                    this.axios.post('/api/production/edit',{
                        params:{
                        categoryid: this.form.categoryid,
                        productiontitle: this.form.productiontitle,
                        productionprice: this.form.productionprice,
                        productionphoto: this.form.productionphoto,
                        productionsize:  this.form.productionsize.join('-'),
                        productioncolor: this.form.productioncolor.join('-'),
                        productionparam: this.form.productionparam,
                        productiondesc: this.form.productiondesc
                        }
                    }).then((data) => {
                        if (data.data.code == 0) {
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
        },
        editfinished (content) {
            this.form.productiondesc = content
        },
    }
}
</script>
    