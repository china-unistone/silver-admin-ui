<template>
<div class="menu-list">
  <el-row>
    <el-col :span="4">
      <el-tooltip placement="right" content="刷新">
        <el-button icon="el-icon-refresh" circle size="mini" type="primary" plain @click="clickOnRefresh"></el-button>
      </el-tooltip>
    </el-col>
    <el-col :span="10">
      <el-input v-model="keyword" class="keyword" placeholder="根据cid,类目名称搜索"> 
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </el-col>
  </el-row>
</div>
</template>

<script>
import '../assets/css/menu-list.less'

export default {
  name: 'MenuList',
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    /**
     * 刷新列表
     */
    clickOnRefresh() {

    }
  }
}
</script>
