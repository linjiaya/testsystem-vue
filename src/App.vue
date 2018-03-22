<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /************* examMain1.vue **************/
  .examDiv {
    .el-radio__input, .el-checkbox__input{
      opacity: 0;
      margin-left: -24px;
    }
    .el-radio__label {
      white-space: pre-wrap;
    }
  }
}

</style>
