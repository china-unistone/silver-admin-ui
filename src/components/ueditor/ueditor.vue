<template>
  <div>
    <script id="editor" type="text/plain" ></script>
  </div>
</template>

<script>
  import '../../../static/ueditor/ueditor.config.js'
  import '../../../static/ueditor/ueditor.all.js'
  import '../../../static/ueditor/lang/zh-cn/zh-cn.js'
  import "../../../static/ueditor/themes/default/css/ueditor.css"


  export default {
    name: "UEditor",
    props: {
      id: {
          type: String
      },
      config: {
          type: Object
      },
      form:  {
          type: Object
      },
    },
    data() {
      return {
        editor: null
      }
    },
    mounted() {
      //初始化UE
      const _this = this;
      this.editor = UE.delEditor("editor");
      this.editor = UE.getEditor('editor',this.config);
      this.editor.addListener("ready", function () {
          // alert(_this.config.initialFrameHeight)
          // var content = _this.config.initialFrameHeight;
          //   _this.editor.setContent(content); // 确保UE加载完成后，放入内容。
      });
    },
    destoryed() {
      this.editor.destory();
    },
    methods:{
      getUEContent: function(){
       return this.editor.getContent();
      },
      getContentTxt: function(){
        return this.editor.getContentTxt();
      }
    }
  }
</script>
