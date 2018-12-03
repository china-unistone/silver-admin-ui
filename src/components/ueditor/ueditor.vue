<template>
  <div>
    <script :id="editorId" type="text/plain" ></script>
  </div>
</template>

<script>
  import '../../../public/ueditor/ueditor.config.js'
  import '../../../public/ueditor/ueditor.all.js'
  import '../../../public/ueditor/lang/zh-cn/zh-cn.js'


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
        editorId: 'editor' + this.id,
        editor: null
      }
    },
    mounted() {
      //初始化UE
        console.log("editorId:"+this.editorId);
      this.editor = UE.delEditor(this.editorId);
      this.editor = UE.getEditor(this.editorId, this.config);
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
