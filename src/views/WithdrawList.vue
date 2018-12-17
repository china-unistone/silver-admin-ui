<template>
<div class="withdraw-list">
  <!-- <el-row class="export-div">
    <el-upload :action=importApi :on-success="importSucess" :multiple=false :show-file-list=false :limit="1" ref="upload">
      <el-tooltip placement="top" content="导出所有未提现记录">
        <el-button type="primary" @click="clickOnExportOut">导出</el-button>
      </el-tooltip>
      <el-tooltip placement="top" content="导入已提现记录">
        <el-button type="primary">导入</el-button>
      </el-tooltip>
    </el-upload>
  </el-row> -->
  <el-row class="search-div">
    <el-col :span="2">
      <el-tooltip placement="right" content="刷新">
        <el-button icon="el-icon-refresh" circle size="mini" type="primary" plain @click="clickOnRefresh"></el-button>
      </el-tooltip>
    </el-col>
    <el-col :span="8">
      <el-input v-model="keyword" class="keyword" placeholder="根据登录名,持卡人姓名,联系电话搜索">
      </el-input>
    </el-col>
    <el-col :span="10" class="daterang-div">
      <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="dateOptions" value-format="yyyy-MM-dd"></el-date-picker>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" @click="clickOnSearch">搜索</el-button>
    </el-col>
  </el-row>
  <el-row>
    <el-table :data="tableData" border class="withdraw-table">
      <el-table-column prop="login" label="申请账号" align="center"></el-table-column>
      <el-table-column prop="name" label="持卡人姓名" align="center"></el-table-column>
      <el-table-column prop="cardNum" label="卡号" align="center"></el-table-column>
      <el-table-column prop="bank" label="所属银行" align="center"></el-table-column>
      <el-table-column prop="openingBank" label="开户行网点" align="center"></el-table-column>
      <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
      <el-table-column prop="amount" label="申请金额" align="center"></el-table-column>
      <el-table-column prop="actualAmt" label="实际提现金额" align="center"></el-table-column>
      <el-table-column prop="statusStr" label="提现状态" align="center"></el-table-column>
      <el-table-column prop="gmtCreate" label="申请时间" align="center" min-width="120px"></el-table-column>
      <el-table-column fixed="right" label="操作" min-width="150">
        <template slot-scope="scope" v-if="scope.row.status === '0'">
          <el-button icon="el-icon-circle-check" type="primary" @click="handleConfirm(scope.row)" size="small">确认提现</el-button>
          <el-button icon="el-icon-circle-close" @click="handleClose(scope.row.id)" type="danger" size="small">强制关闭</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination-div" layout="prev, pager, next" :page-count="totalPage" background @current-change="currentPageChanged"></el-pagination>
  </el-row>
</div>
</template>

<script>
import axios from "axios"
import API from "../api/api"
import '../assets/css/withdraw.less'
import moment from 'moment'

export default {
  name: "WithdrawList",
  data() {
    return {
      importApi: axios.defaults.baseURL + API.WithdrawImport,
      tableData: [],
      totalPage: 1,
      keyword: '',
      dateRange: [],
      dateOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
            text: "最近一周",
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit("pick", [start, end])
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit("pick", [start, end])
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit("pick", [start, end])
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.clickOnRefresh()
  },
  methods: {
    /**
     * 强制关闭此提现记录
     */
    handleClose(id) {
      this.$confirm('确认关闭此提现记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.get(API.WithdrawClose, {
          params: {
            id
          }
        }).then(res => {
          if (res.status === 0) {
            this.$message.success('保存成功')
          } else {
            this.$message.error('关闭失败')
          }
          this.clickOnRefresh()
        }).catch(error => {
          console.log(error)
          this.$message.error('关闭失败')
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        console.log('取消关闭')
      })
    },
    /**
     * 处理已提现记录，状态改为已提现，并修改实际提现金额
     */
    handleConfirm(row) {
      this.$prompt('请确认提现金额', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: row.amount,
        inputPattern: /^\d+(\.[\d]{1,2})?$/,
        inputErrorMessage: '请输入正确的金额'
      }).then(({
        value
      }) => {
        axios.post(API.WithdrawConfirm, {
          actualAmt: value,
          id: row.id
        }).then(res => {
          if (res.status === 0) {
            this.$message.success('保存成功')
          } else {
            this.$message.error('保存失败')
          }
          this.clickOnRefresh()
        }).catch(error => {
          console.log(error)
          this.$message.error('保存失败')
        })
      }).catch(() => {
        console.log('用户取消确认')
      })
    },
    clickOnExportOut() {
      const elink = document.createElement("a")
      elink.style.display = "none"
      elink.href = axios.defaults.baseURL + API.ExportApplyWithdraw
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
    },
    importSucess(response) {
      console.log("response is", response)
      this.$refs.upload.clearFiles()
      if (response.status == 0) {
        this.$message({
          message: response.data,
          type: "success"
        })
        this.clickOnRefresh()
      } else {
        this.$message.error(response.msg)
      }
    },
    getList(cp) {
      axios
        .get(API.WithdrawPageList, {
          params: {
            pageNum: cp,
            pageSize: 10
          }
        })
        .then(res => {
          if (res.status === 0) {
            this.tableData = res.data.list
            this.totalPage = res.data.totalPage
          } else {
            this.$message.error("获取提现数据失败!")
          }
        })
        .catch(() => {
          this.$message.error("获取提现数据失败!")
        })
    },
    clickOnRefresh() {
      this.dateRange = []
      this.getList(1)
    },
    clickOnSearch() {
      this.searchList(1)
    },
    currentPageChanged(cp) {
      if (this.dateRange.length === 2) {
        this.searchList(cp)
      } else {
        this.getList(cp)
      }
    },
    searchList(cp) {
      const params = {
        pageNum: cp,
        pageSize: 10
      }
      if (this.dateRange.length === 2) {
        params.startDate = moment(this.dateRange[0]).format('YYYY-MM-DDTHH:mm:ss.sssZ')
        params.endDate = moment(this.dateRange[1]).add(1, 'days').format('YYYY-MM-DDTHH:mm:ss.sssZ')
        // params.startDate = this.dateRange[0]
        // params.endDate = this.dateRange[1]
      }
      if (this.keyword) {
        params.keyword = this.keyword
      }
      axios.get(API.WithdrawPageList, {
          params: params
        }).then(res => {
          if (res.status === 0) {
            this.tableData = res.data.list
            this.totalPage = res.data.totalPage
          } else {
            this.$message({
              type: "error",
              message: "搜索失败!"
            })
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "搜索失败!"
          })
        })
    }
  }
}
</script>
