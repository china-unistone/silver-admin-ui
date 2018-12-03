<template>
<div class="area">
  <el-tabs v-model="activeName">
    <el-tab-pane label="拉新素材" name="top">
      <SectionTab :section-index="31" :module-index="3"></SectionTab>
    </el-tab-pane>
    <el-tab-pane label="早安心语" name="life" :lazy="true">
      <SectionTab :section-index="32" :module-index="3"></SectionTab>
    </el-tab-pane>
    <el-tab-pane label="小店" name="home" :lazy="true">
      <SectionTab :section-index="33" :module-index="3"></SectionTab>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script src="http://gosspublic.alicdn.com/aliyun-oss-sdk-4.4.4.min.js"></script>
<script>
import "../assets/css/area.less"
import SectionTab from '../components/SectionTab'

export default {
  name: "Source",
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
