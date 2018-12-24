<template>
<div class="scenic-spot-list">
  <el-row v-if="listMode">
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
            <el-select v-model="sProvince" style="width: 100%" placeholder="请选择省份" v-on:change="getProv($event, true)">
              <el-option v-for="item in provinces" :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-select v-model="sCity" style="width: 100%" placeholder="请选择城市">
              <el-option v-for="item in sCities" :key="item.name" :label="item.name" :value="item.name"></el-option>
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
        <el-table-column prop="fullName" label="景区名称" align="center"></el-table-column>
        <el-table-column prop="scenicLevel.name" label="景区级别" align="center"></el-table-column>
        <el-table-column prop="province" label="所在省份" align="center"></el-table-column>
        <el-table-column prop="city" label="所在城市" align="center"></el-table-column>
        <el-table-column prop="address" label="详细地址" align="center" min-width="150"></el-table-column>
        <el-table-column prop="sort" label="排序值" align="center"></el-table-column>
        <el-table-column label="操作" min-width="250" align="center">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" type="primary" @click="handleUpdate(scope.row)" size="small">编辑景点</el-button>
            <el-button icon="el-icon-delete" @click="handleDelete(scope.row.id)" type="danger" size="small">删除景点</el-button>
            <el-button icon="el-icon-sort" type="warning" @click="handleSort(scope.row)" size="small">修改排序</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination-div" layout="prev, pager, next" :page-count="totalPage" background @current-change="currentPageChanged"></el-pagination>
    </el-row>
  </el-row>
  <el-row v-if="!listMode">
    <el-form ref="spotForm" :model="formData" :rules="formRule" label-width="150px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="景区名称:" prop="fullName">
            <el-input v-model="formData.fullName" placeHolder="请输入景区名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="景区级别:" prop="levelId">
            <el-select v-model="formData.levelId" style="width: 100%" placeholder="请选择景区级别">
              <el-option v-for="item in scenicLevel" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="对应第三方id:" prop="thirdId">
            <el-input v-model="formData.thirdId" placeHolder="请输入第三方id"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="所在省份:" prop="province">
            <el-select v-model="formData.province" style="width: 100%" placeholder="请选择省份" v-on:change="getProv($event)">
              <el-option v-for="item in provinces" :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所在城市:" prop="city">
            <el-select v-model="formData.city" style="width: 100%" placeholder="请选择城市">
              <el-option v-for="item in eCities" :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="景区详细地址:" prop="address">
          <el-input v-model="formData.address" placeHolder="请输入景区详细地址"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="经度:" prop="longitude">
            <el-input v-model="formData.longitude" placeHolder="请从百度地图获取经度"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="纬度:" prop="latitude">
            <el-input v-model="formData.latitude" placeHolder="请从百度地图获取纬度"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="订票须知:" prop="notice">
          <el-input v-model="formData.notice" rows="5" type="textarea" placeHolder="请输入订票须知并将总长度控制在1000字以内"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="交通出行:" prop="wayLine">
          <el-input v-model="formData.wayLine" rows="5" type="textarea" placeHolder="请输入交通出行路线并将总长度控制在1000字以内"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="注意事项:" prop="attention">
          <el-input v-model="formData.attention" rows="5" type="textarea" placeHolder="请输入注意事项并将总长度控制在1000字以内"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="景区介绍:" prop="description">
          <el-input v-model="formData.description" rows="5" type="textarea" placeHolder="请输入景区介绍并将总长度控制在1000字以内"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="百度百科链接:" prop="baikeUrl">
          <el-input v-model="formData.baikeUrl" placeHolder="请输入百度百科链接"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <el-row class="submit-button">
      <el-button type="primary" icon="el-icon-check" @click="clickOnSubmit()">提交</el-button>
      <el-button type="info" icon="el-icon-close" @click="clickOnCancelEdit()">取消</el-button>
    </el-row>
  </el-row>
</div>
</template>

<script>
import allRegion from '../plugins/city'
import '../assets/css/scenic-spot-list.less'
import axios from 'axios'
import API from '../api/api'
import {
  mapGetters
} from 'vuex'

export default {
  name: 'ScenicSpotList',
  data() {
    return {
      keyword: '',
      provinces: allRegion,
      sProvince: '',
      sCity: '',
      sCities: [],
      eCities: [],
      tableData: [],
      totalPage: 1,
      listMode: true,
      formData: {},
      isUpdate: false,
      formRule: {
        fullName: [{
          required: true,
          message: '请输入景区名称',
          trigger: 'blur'
        }],
        levelId: [{
          required: true,
          message: '请选择景区级别',
          trigger: 'blur'
        }],
        thirdId: [{
          required: true,
          message: '请选择第三方id',
          trigger: 'blur'
        }],
        province: [{
          required: true,
          message: '请选择景区所在省份',
          trigger: 'blur'
        }],
        city: [{
          required: true,
          message: '请选择景区所在城市',
          trigger: 'blur'
        }],
        address: [{
          required: true,
          message: '请输入景区详细地址',
          trigger: 'blur'
        }],
        longitude: [{
          required: true,
          message: '请输入经度',
          trigger: 'blur'
        }],
        latitude: [{
          required: true,
          message: '请输入纬度',
          trigger: 'blur'
        }],
        notice: [{
          required: true,
          message: '请输入订票须知',
          trigger: 'blur'
        }],
        wayLine: [{
          required: true,
          message: '请输入交通出行路线',
          trigger: 'blur'
        }],
        attention: [{
          required: true,
          message: '请输入注意事项',
          trigger: 'blur'
        }],
        description: [{
          required: true,
          message: '请输入景区介绍',
          trigger: 'blur'
        }],
        baikeUrl: [{
          required: true,
          message: '请输入百度百科链接',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    ...mapGetters(['scenicLevel'])
  },
  mounted() {
    if (!this.scenicLevel || this.scenicLevel.length === 0) {
      axios.get(API.ScenicLevelPageList, {
        params: {
          pageNum: 1,
          pageSize: 200
        }
      }).then(res => {
        if (res.status === 0) {
          this.$store.dispatch('setScenicLevel', res.data)
        } else {
          this.$message.error('获取数据失败')
        }
      }).catch(error => {
        console.error(error)
        this.$message.error('获取数据失败')
      })
    }
    this.getDataList(1)
  },
  methods: {
    /**
     * 更新景点信息
     */
    handleUpdate(row) {
      this.formData = row
      this.isUpdate = true
      this.listMode = false
    },
    /**
     * 删除景点记录
     */
    handleDelete(rId) {
      console.log(rId)
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.get(API.ScenicSpotDelete, {
          params: {
            id: rId
          }
        }).then(res => {
          if (res.status !== 0) {
            this.$message.error(res.msg)
          } else {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
          this.clickOnRefresh()
        }).catch(() => {
          this.$message.error('删除失败')
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    /**
     * 更新排序值
     */
    handleSort(row) {
      this.$prompt('景点按排序值排倒序', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: row.sort,
        inputPattern: /^[0-9]*$/,
        inputErrorMessage: '请输入整数类型'
      }).then(({
        value
      }) => {
        axios.post(API.ScenicSpotUpdate, {
          sort: value,
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
        console.log('用户取消排序')
      })
    },
    /**
     * 获取数据列表
     */
    getDataList(cp) {
      const params = {
        pageNum: cp,
        pageSize: 20
      }
      if (this.keyword.trim()) {
        params.keyword = this.keyword.trim()
      }
      if (this.sProvince.trim()) {
        params.province = this.sProvince.trim()
      }
      if (this.sCity.trim()) {
        params.city = this.sCity.trim()
      }
      axios.get(API.ScenicSpotPageList, {
        params
      }).then(res => {
        if (res.status === 0) {
          this.tableData = res.data.list
          this.totalPage = res.data.totalPage
        } else {
          this.$message.error('获取数据失败，请稍后重试')
        }
      }).catch(error => {
        console.error(error)
        this.$message.error('获取数据失败，请稍后重试')
      })
    },
    /**
     * 提交新增或修改
     */
    clickOnSubmit() {
      this.$refs.spotForm.validate().then(() => {
        const api = this.isUpdate ? API.ScenicSpotUpdate : API.ScenicSpotInsert
        axios.post(api, this.formData).then(res => {
          if (res.status === 0) {
            this.$message.success('保存成功')
            this.listMode = true
            this.clickOnRefresh()
          }
        }).catch(error => {
          console.error(error)
          this.$message.error('保存失败，请稍后重试')
        })
      }).catch(error => {
        console.log(error)
      })
    },
    /**
     * 取消新增或修改
     */
    clickOnCancelEdit() {
      this.listMode = true
    },
    clickOnRefresh() {
      this.keyword = ''
      this.sProvince = ''
      this.sCity = ''
      this.getDataList(1)
    },
    clickOnSearch() {
      if (!this.keyword.trim() && this.sProvince.trim() && !this.sCity.trim()) {
        this.$message.warning('请输入搜索条件')
      } else {
        this.getDataList(1)
      }
    },
    clickOnAdd() {
      this.formData = {
        city: ''
      }
      this.isUpdate = false
      this.listMode = false
    },
    getProv(prov, isSearch) {
      console.log('prov is ', prov)
      let tempCity = this.getChildren(prov, allRegion, 0)
      if (isSearch) {
        this.sCities = tempCity
        this.sCity = ''
      } else {
        this.formData.city = ''
        this.eCities = tempCity
      }
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
