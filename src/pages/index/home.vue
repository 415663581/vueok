<template>
  <div class="page">
      <el-row>
        <el-col :span="12">
            <div id="myChart" style="width: 500px;height: 300px"></div>
        </el-col>
        <el-col :span="12">
            <h2>支付比例</h2>
            <div id="myChart2" style="width: 500px;height: 300px"></div>
        </el-col>
      </el-row>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name:'Home',
  data(){
    return {
        xAxisData:[],
        seriesData:[],
        orderSeriesData: []
    }
  },
  mounted(){
      this.getProductionData();
      this.getOrderData();
  },
  methods:{
    getProductionData() {
        this.axios.get('/api/production/getStatisticsData')
        .then((response) => {
            if (response.data.code == 0) {
                for (let i in response.data.data) {
                    this.xAxisData.push(response.data.data[i]['categoryname']);
                    this.seriesData.push(response.data.data[i]['total']);
                }
                this.drawLine();
            } else {
                this.$message('服务器繁忙，请稍后重试');
            }
        })
        .catch(function (error) {
            this.$message('服务器繁忙，请稍后重试');
        })
    },
    getOrderData () {
        this.axios.get('/api/order/getStatisticsData')
        .then((response) => {
            if (response.data.code == 0) {
                for (let i in response.data.data) {
                    if (response.data.data[i]['paymentstatus'] == 0) {
                        this.orderSeriesData.push(
                            {
                                value:response.data.data[i]['total'],
                                name: '未支付'
                            }
                        )
                    } else {
                        this.orderSeriesData.push(
                            {
                                value:response.data.data[i]['total'],
                                name: '已支付'
                            }
                        )
                    }
                    this.drawPie();
                }
                this.drawLine();
            } else {
                this.$message('服务器繁忙，请稍后重试');
            }
        })
        .catch(function (error) {
            this.$message('服务器繁忙，请稍后重试');
        })
    },
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '产品分析' },
            xAxis: {
                data: this.xAxisData
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: this.seriesData
            }]
        });
    },
    drawPie(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart2'))
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:['已支付','未支付']
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: true,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:this.orderSeriesData
                }
            ]
        });
    }
  }
}
</script>
<style scoped>

</style>

