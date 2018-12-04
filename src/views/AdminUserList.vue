<template>
<div class="admin-user-list">
  <div v-if="listMode">
    <el-row>
      <el-col :span="4">
        <el-tooltip placement="right" content="刷新">
          <el-button icon="el-icon-refresh" circle size="mini" type="primary" plain @click="clickOnRefresh"></el-button>
        </el-tooltip>
      </el-col>
      <el-col :span="8">
        <el-input v-model="keyword" class="keyword" placeholder="根据登录名,昵称搜索">
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-search" @click="clickOnSearch">搜索</el-button>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addNewUser">新增用户</el-button>
      </el-col>
    </el-row>
    <el-row class="table-div">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="login" label="账号">
        </el-table-column>
        <el-table-column prop="nickName" label="昵称">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
            <el-button @click="updateRow(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination" layout="prev, pager, next" :page-count="totalPage" background @current-change="currentPageChanged">
      </el-pagination>
    </el-row>
  </div>
  <div v-if="!listMode">
    <el-row>
      <el-col :span="12">
        <el-form ref="userForm" :model="formData" :rules="formRule" label-width="100px" :key="'form' + isAdd">
          <el-form-item label="账号:" prop="login">
            <el-input v-model="formData.login" placeHolder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="昵称:" prop="nickName">
            <el-input v-model="formData.nickName" placeHolder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="电话:" prop="phone">
            <el-input v-model="formData.phone" placeHolder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password" v-if="isAdd">
            <el-input v-model="formData.password" placeHolder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="submit-div">
      <el-button type="primary" @click="clickOnSubmit">提交</el-button>
      <el-button type="primary" @click="clickOnCancel">取消</el-button>
    </el-row>
  </div>
</div>
</template>

<script>
import '../assets/css/admin-user-list.less'
import axios from 'axios'
import API from '../api/api.js'

export default {
  name: 'AdminUserList',
  data() {
    return {
      tableData: [],
      totalPage: 1,
      keyword: '',
      listMode: true,
      isAdd: true,
      formData: {},
      formRule: {
        login: [{
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        }],
        nickName: [{
          required: true,
          message: '请输入昵称',
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          message: '请输入电话号码',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    clickOnSearch() {
      if (!this.keyword || !this.keyword.trim()) {
        this.$message.warning('请输入搜索关键字')
      } else {
        this.getDataList(1)
      }
    },
    clickOnCancel() {
      this.listMode = true
    },
    clickOnRefresh() {
      this.getDataList(1)
    },
    deleteRow(rId) {
      console.log(rId)
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.get(API.AdminUserDelete, {
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
          this.getDataList(1)
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
    updateRow(row) {
      this.formData.id = row.id
      this.formData.login = row.login
      this.formData.nickName = row.nickName
      this.formData.phone = row.phone
      this.isAdd = false
      this.listMode = false
    },
    addNewUser() {
      // 重置所有的formData
      this.formData = {}
      this.isAdd = true
      this.listMode = false
    },
    getDataList(cp) {
      const params = {
        pageNum: cp,
        pageSize: 20
      }
      if (this.keyword && this.keyword.trim()) {
        params.keyword = this.keyword
      }
      axios.get(API.AdminUserPageList, {
        params
      }).then(res => {
        if (res.status !== 0) {
          this.$message.error('获取用户列表失败')
        } else {
          this.tableData = res.data.list
          this.totalPage = res.data.totalPage
        }
      }).catch(() => this.$message.error('获取用户列表失败'))
    },
    clickOnSubmit() {
      this.$refs.userForm.validate().then(() => {
        console.log(this.formData)
        let api = this.isAdd ? API.AdminUserInsert : API.AdminUserUpdate
        axios.post(api, this.formData).then(res => {
          console.log(res)
          if (res.status !== 0) {
            this.$message.error('保存失败')
          } else {
            this.$message.success(res.msg)
            this.getDataList(1)
            this.listMode = true
          }
        }).catch(err => console.log(err))
      }).catch(err => console.log(err))
    },
    currentPageChanged(cp) {
      this.getDataList(cp)
    },
  },
  mounted() {
    this.getDataList(1)
  }
}
</script>
