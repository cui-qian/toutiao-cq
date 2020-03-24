<template>
  <!-- 全屏容器 -->
  <el-container class="home-container">
    <!-- 侧边栏 -->
    <el-aside class="my-aside" width="200px">Aside</el-aside>
    <!-- 右侧主体 -->
    <el-container>
      <!-- 头部 -->
      <el-header class="my-header">Header</el-header>
      <!-- 主体 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "my-home"
};
</script>

<style scoped lang='less'>
.home-container {
  // 全屏容器
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .my-aside {
    background-color: #002244;
  }
  .my-header {
    border-bottom: 1px solid #ddd;
  }
}
</style>