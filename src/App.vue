<template>
<div id="app">
  <router-view v-wechat-title="$route.meta.title" img-set="/static/img/logo.png" />
</div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="less">
.custom-sub-item {
  background: #444 !important;
}
</style>
