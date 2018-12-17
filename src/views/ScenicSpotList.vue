<template>
<div class="scenic-spot-list">
  <el-row class="search-div" :gutter="10">
    <el-col :span="1">
      <el-tooltip placement="right" content="刷新">
        <el-button icon="el-icon-refresh" circle size="mini" type="primary" plain @click="clickOnRefresh"></el-button>
      </el-tooltip>
    </el-col>
    <el-col :span="7">
      <el-input v-model="keyword" class="keyword" placeholder="根据景区名称搜索">
      </el-input>
    </el-col>
    <el-col :span="10">
      <el-row class="area-select" :gutter="5">
        <el-col :span="12">
          <el-select v-model="province" style="width: 100%" placeholder="请选择省份" v-on:change="getProv($event)">
            <el-option v-for="item in provinces" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-select v-model="city" style="width: 100%" placeholder="请选择城市">
            <el-option v-for="item in citys" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="2">
      <el-button type="primary" @click="clickOnSearch">搜索</el-button>
    </el-col>
    <el-col :span="4" class="add-button">
      <el-button type="primary" @click="clickOnAdd">新增景区</el-button>
    </el-col>
  </el-row>
  <el-row class="table-div">
    <el-table :data="tableData" border>
      <el-table-column prop="fullName" label="申请账号" align="center"></el-table-column>
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
import allRegion from '../plugins/city'
import '../assets/css/scenic-spot-list.less'

export default {
  name: 'ScenicSpotList',
  data() {
    return {
      keyword: '',
      provinces: allRegion,
      province: '',
      city: '',
      citys: [],
      tableData: [],
      totalPage: 1
    }
  },
  methods: {
    clickOnRefresh() {

    },
    clickOnSearch() {

    },
    clickOnAdd() {

    },
    getProv(prov) {
      console.log('prov is ', prov)
      let tempCity = this.getChildren(prov, allRegion, 0)
      this.citys = tempCity
      this.city = ''
    },
    currentPageChanged(cp) {
      console.log(cp)
    },
    getChildren(regionName, regionData, level) {
      let tempData = []
      if (level == 0) {
        for (let item of regionData) {
          if (item.name == regionName) {
            tempData = item.sub
          }
        }
      } else {
        let cityData = this.getChildren(this.chooseProv, allRegion, 0)
        return this.getChildren(regionName, cityData, 0)
      }
      return tempData
    },
  }
}
</script>
