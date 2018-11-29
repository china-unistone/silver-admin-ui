<template>
<div class="area">
  <el-tabs v-model="activeName">
    <el-tab-pane label="专区头条" name="top">
      <SectionTab :section-index="1" :module-index="1"></SectionTab>
    </el-tab-pane>
    <el-tab-pane label="品质生活" name="life">
      <SectionTab :section-index="2" :module-index="1"></SectionTab>
    </el-tab-pane>
    <el-tab-pane label="居家物品" name="home">
      <SectionTab :section-index="3" :module-index="1"></SectionTab>
    </el-tab-pane>
    <el-tab-pane label="够范儿" name="fashion">
      <SectionTab :section-index="4" :module-index="1"></SectionTab>
    </el-tab-pane>
    <el-tab-pane label="文艺风" name="art">
      <SectionTab :section-index="5" :module-index="1"></SectionTab>
    </el-tab-pane>
    <el-tab-pane label="一单品一故事" name="story">
      <SectionTab :section-index="6" :module-index="1"></SectionTab>
    </el-tab-pane>
    <el-tab-pane label="创意生活" name="poetry">
      <SectionTab :section-index="7" :module-index="1"></SectionTab>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script src="http://gosspublic.alicdn.com/aliyun-oss-sdk-4.4.4.min.js"></script>
<script>
import "../assets/css/area.less"
import SectionTab from '../components/SectionTab'

export default {
  name: "Area",
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
