<template>
<div class="area">
  <el-tabs v-model="activeName">
    <el-tab-pane label="舒爽好眠" name="life11">
      <SectionTab :section-index="11" :module-index="1"></SectionTab>
    </el-tab-pane>
    <el-tab-pane label="休闲饮食" name="life12" :lazy="true">
      <SectionTab :section-index="12" :module-index="1"></SectionTab>
    </el-tab-pane>
    <el-tab-pane label="居家美食" name="life13" :lazy="true">
      <SectionTab :section-index="13" :module-index="1"></SectionTab>
    </el-tab-pane>
    <el-tab-pane label="收纳有序" name="life14" :lazy="true">
      <SectionTab :section-index="14" :module-index="1"></SectionTab>
    </el-tab-pane>
    <el-tab-pane label="茶具水具" name="life15" :lazy="true">
      <SectionTab :section-index="15" :module-index="1"></SectionTab>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script src="http://gosspublic.alicdn.com/aliyun-oss-sdk-4.4.4.min.js"></script>
<script>
import "../assets/css/area.less"
import SectionTab from '../components/SectionTab'

export default {
  name: "Arealife",
  components: {
      SectionTab
  },
  data() {
    return {
      activeName: "life11"
    };
  },
  methods: {
    
  }
};
</script>
