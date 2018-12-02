<template>
<div class="area">
  <el-tabs v-model="activeName">
    <el-tab-pane label="精品家电" name="life16">
      <SectionTab :section-index="16" :module-index="1"></SectionTab>
    </el-tab-pane>
    <el-tab-pane label="智能厨房" name="life17" :lazy="true">
      <SectionTab :section-index="17" :module-index="1"></SectionTab>
    </el-tab-pane>
    <el-tab-pane label="洁净卧室" name="life18" :lazy="true">
      <SectionTab :section-index="18" :module-index="1"></SectionTab>
    </el-tab-pane>
    <el-tab-pane label="装修达人" name="life19" :lazy="true">
      <SectionTab :section-index="19" :module-index="1"></SectionTab>
    </el-tab-pane>
    <el-tab-pane label="精美客厅" name="life20" :lazy="true">
      <SectionTab :section-index="20" :module-index="1"></SectionTab>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script src="http://gosspublic.alicdn.com/aliyun-oss-sdk-4.4.4.min.js"></script>
<script>
import "../assets/css/area.less"
import SectionTab from '../components/SectionTab'

export default {
  name: "Areahome",
  components: {
      SectionTab
  },
  data() {
    return {
      activeName: "life16"
    };
  },
  methods: {
    
  }
};
</script>
