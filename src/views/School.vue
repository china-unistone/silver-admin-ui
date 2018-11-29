<template>
<div class="area">
  <el-tabs v-model="activeName">
    <el-tab-pane label="平台规则" name="top">
      <SectionTab :section-index="1" :module-index="4"></SectionTab>
    </el-tab-pane>
    <el-tab-pane label="新手必备" name="life" :lazy="true">
      <SectionTab :section-index="2" :module-index="4"></SectionTab>
    </el-tab-pane>
    <el-tab-pane label="高手进阶" name="home" :lazy="true">
      <SectionTab :section-index="3" :module-index="4"></SectionTab>
    </el-tab-pane>
    <el-tab-pane label="经验分享" name="fashion" :lazy="true">
      <SectionTab :section-index="4" :module-index="4"></SectionTab>
    </el-tab-pane>
    <el-tab-pane label="视频教程" name="art" :lazy="true">
      <SectionTab :section-index="5" :module-index="4"></SectionTab>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script src="http://gosspublic.alicdn.com/aliyun-oss-sdk-4.4.4.min.js"></script>
<script>
import "../assets/css/area.less"
import SectionTab from '../components/SectionTab'

export default {
  name: "School",
  components: {
      SectionTab
  },
  data() {
    return {
      activeName: "top"
    };
  },
  methods: {
    
  }
};
</script>
