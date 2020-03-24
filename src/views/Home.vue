<template>
  <!-- 全屏容器 -->
  <el-container class="home-container">
    <!-- 侧边栏 -->
    <el-aside class="my-aside" width="200px">Aside</el-aside>
    <!-- 右侧主体 -->
    <el-container>
      <!-- 头部 -->
      <el-header class="my-header">
        <!-- 图标 -->
        <span class="el-icon-s-fold icon"></span>
        <!-- 文字 -->
        <span class="text">崔总的公司</span>
        <!-- 下拉组件 -->
        <el-dropdown class="my-dropdown">
          <span class="el-dropdown-link">
            <img class="user-avatar" src="../assets/avatar.jpg" alt />
            <span class="user-name">崔倩</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu>
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
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
    line-height: 60px;
    .icon {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
      padding-left: 10px;
    }
    .my-dropdown {
      float: right;
      margin-right: 20px;
      .user-avatar {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .user-name {
        vertical-align: middle;
        font-weight: 700;
        margin-left: 5px;
      }
    }
  }
}
</style>