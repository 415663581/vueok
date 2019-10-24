<template>
  <div>
      <el-table :data="orderData" height="550" border style="width: 100%">
        <el-table-column prop="username" label="用户名" width="100"></el-table-column>
        <el-table-column prop="telphone" label="手机号" width="180"></el-table-column>
        <el-table-column prop="ordersn" label="订单编号"></el-table-column>
        <el-table-column prop="totalprice" label="订单金额"></el-table-column>
        <el-table-column prop="paymentstatus" label="订单状态">
          <template slot-scope="props">
            <el-button type="success" v-if="props.row.paymentstatus==1" plain size="mini">已支付</el-button>
            <el-button type="danger" v-else plain size="mini">未支付</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="addtime" label="下单时间">
          <template slot-scope="scope">{{ scope.row.addtime|timeformate('yyyy/MM/dd hh:mm:ss') }}</template>
        </el-table-column>
        <el-table-column prop="type" label="订单类型"></el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="rowsTotal" >
      </el-pagination>
  </div>
</template>
<script>
import timeformate from "@/filters/index";
export default {
  name: "OrdersIndex",
  data() {
    return {
      currentPage: 1,
      pageSize: 8,
      rowsTotal: 0,
      orderData: []
    };
  },
  filters: {
    timeformate
  },
  created() {
    this.getData();
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData() //获取对应数据
    },
    getData() {
      this.axios
        .get("/api/order/getAllData", {
          params: {
            currentpage: this.currentPage,
            pagesize: this.pagesize
          }
        })
        .then(res => {
          if (res.data.code == 0) {
            const data = res.data.data;
            // 初始化数据
            this.orderData = data.listdata;
            this.currentPage = parseInt(data.currentpage);
            this.pageSize = parseInt(data.pagesize);
            this.rowsTotal = parseInt(data.totalrows);
          } else {
            this.$msg.error(this);
          }
        })
        .catch(error => {
          this.$msg.error(this);
        });
    }
  }
};
</script>
<style scoped>
</style>
