<template>
  <div class="login-container">
    <el-card class="box-card">
      <img src="../assets/logo_index.png" alt />
    </el-card>
  </div>
</template>

<script>
export default {
  name: "my-login"
};
</script>

<style scoped lang='less'>
// 全屏容器
.login-container {
  // 让宽高直接继承窗口的宽高
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: url("../assets/login_bg.jpg") no-repeat center / cover;
  .box-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 200px;
      margin: 0 auto 20px;
    }
  }
}
</style>