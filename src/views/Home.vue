<template>
  <!-- 全屏容器 -->
  <el-container class="home-container">
    <!-- 侧边栏 -->
    <el-aside class="my-aside" :width="isOpen?'200px':'60px'">
      <!-- logo -->
      <div class="logo" :class="{minLogo:!isOpen}"></div>
      <!-- 导航菜单 -->
      <el-menu
        :collapse="!isOpen"
        :collapse-transition="false"
        style="border-right:none"
        default-active="1"
        background-color="#002233"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 右侧主体 -->
    <el-container>
      <!-- 头部 -->
      <el-header class="my-header">
        <!-- 图标 -->
        <span class="el-icon-s-fold icon" @click="toggleAside"></span>
        <!-- 文字 -->
        <span class="text">崔总的公司</span>
        <!-- 下拉组件 -->
        <el-dropdown class="my-dropdown" @command="handelClick">
          <span class="el-dropdown-link">
            <img class="user-avatar" :src="userPhoto" alt />
            <span class="user-name">{{userName}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu>
            <!-- <el-dropdown-item @click.native="setting()" icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item @click.native="logout()" icon="el-icon-switch-button">退出登录</el-dropdown-item>-->
            <el-dropdown-item command="setting" icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item command="logout" icon="el-icon-switch-button">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 主体 -->
      <el-main>
        <!-- 二级路由显示的容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import auth from "@/utils/auth";
export default {
  name: "my-home",
  data() {
    return {
      // 侧边栏是不是展开状态,默认是展开
      isOpen: true,
      // 用户名
      userName: "",
      userPhoto: ""
      // 用户头像
    };
  },
  created() {
    // 1.从本地存储中获取数据
    const user = auth.getUser();
    this.userName = user.name;
    this.userPhoto = user.photo;
  },
  methods: {
    // 切换侧边栏的展开与收起
    toggleAside() {
      this.isOpen = !this.isOpen;
    },
    // 跳转个人设置
    setting() {
      this.$router.push("/setting");
    },
    // 退出登录
    logout() {
      // 1.清除用户信息
      auth.delUser();
      // 2.跳转到登录页面
      this.$router.push("/login");
    },
    // 点击下拉菜单的处理函数
    handelClick(command) {
      // 判断点击的是个人设置还是退出登录
      // 原来的逻辑  if判断
      // 此时可以使用elment方法实现
      // command正好就是要执行的函数名称
      this[command]();
    }
  }
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
    background-color: #002233;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url("../assets/logo_admin.png") no-repeat center /
        140px auto;
    }
    // 覆盖background的图片和大小
    .minLogo {
      background-image: url("../assets/logo_admin_01.png");
      background-size: 36px auto;
    }
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