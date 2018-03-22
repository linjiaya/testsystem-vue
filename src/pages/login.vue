<template>
  <div class="login">
    <el-row :gutter="20">
      <el-col :offset="4" :span="16">
        <el-form
          ref="form"
          :model="form"
          status-icon
          :rules="rules"
          label-width="70px">
          <el-form-item
            label="用户名"
            prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入用户名">
            </el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password">
            <el-input
              type="password"
              v-model="form.password"
              placeholder="请输入密码">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="success"
              @click="login('ruleForm')">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'login',
  data: function () {
    /*
      @@ data这里要注意格式,注意空格
      @@ data: function () {}
      @@ data () {}
    */
    return {
      msg: 'Welcome to Your Vue.js App',
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login: function () {
      alert('登录成功!')
      this.$router.push({name: 'home'})
    }
  }
}
</script>
<!-- 这里需要有换行，以换行结尾 -->
<style scoped lang="less">
  .loginDiv{
    padding-top: 100px;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
