<template>
<div class="scenic-level">
  <el-row v-if="listMode">
    <el-row class="search-div">
      <el-col :span="1">
        <el-tooltip placement="right" content="刷新">
          <el-button icon="el-icon-refresh" circle size="mini" type="primary" plain @click="clickOnRefresh"></el-button>
        </el-tooltip>
      </el-col>
      <el-col class="add-button" :span="23">
        <el-button type="primary" icon="el-icon-plus" @click="onClickAdd">新增级别</el-button>
      </el-col>
    </el-row>
    <el-row class="table-div">
      <el-table :data="tableData" border>
        <el-table-column prop="name" label="级别" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button icon="el-icon-circle-check" type="primary" @click="handleUpdate(scope.row)" size="small">编辑</el-button>
            <el-button icon="el-icon-circle-close" @click="handleDelete(scope.row.id)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </el-row>
  <el-row v-if="!listMode">
    <el-form ref="levelForm" :model="formData" :rules="formRule" label-width="150px">
      <el-form-item label="级别:" prop="name">
        <el-input v-model="formData.name" placeHolder="请输入级别"></el-input>
      </el-form-item>
    </el-form>
    <el-row class="submit-button">
      <el-button type="primary" icon="el-icon-check" @click="clickOnSubmit()">提交</el-button>
      <el-button type="info" icon="el-icon-close" @click="clickOnCancelEdit()">取消</el-button>
    </el-row>
  </el-row>
</div>
</template>

<script>
import '../assets/css/scenic-level.less'
import axios from 'axios'
import API from '../api/api'

export default {
  name: 'ScenicLevel',
  data() {
    return {
      tableData: [],
      listMode: true,
      isUpdate: false,
      formData: {
        name: ''
      },
      formRule: {
        name: [{
          required: true,
          message: '请输入级别',
          trigger: 'blur'
        }]
      }
    }
  },
  mounted() {
    this.clickOnRefresh()
  },
  methods: {
    handleUpdate(row) {
      this.formData.name = row.name
      this.formData.id = row.id
      this.isUpdate = true
      this.listMode = false
    },
    handleDelete(rId) {
      console.log(rId)
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.get(API.ScenicLevelDelete, {
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
     * 点击刷新按钮
     */
    clickOnRefresh() {
      axios.get(API.ScenicLevelPageList, {
        params: {
          pageNum: 1,
          pageSize: 200
        }
      }).then(res => {
        if (res.status === 0) {
          this.tableData = res.data
          this.$store.dispatch('setScenicLevel', res.data)
        } else {
          this.$message.error('获取数据失败')
        }
      }).catch(error => {
        console.error(error)
        this.$message.error('获取数据失败')
      })
    },
    /**
     * 新增级别
     */
    onClickAdd() {
      this.formData.name = ''
      this.isUpdate = false
      this.listMode = false
    },
    /**
     * 提交新增或修改
     */
    clickOnSubmit() {
      this.$refs.levelForm.validate().then(() => {
        const api = this.isUpdate ? API.ScenicLevelUpdate : API.ScenicLevelInsert
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
     * 取消修改或新增
     */
    clickOnCancelEdit() {
      this.listMode = true
    },
  }
}
</script>
