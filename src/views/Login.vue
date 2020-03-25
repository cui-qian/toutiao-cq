<template>
  <div class="login-container">
    <el-card class="my-card">
      <img src="../assets/logo_index.png" alt />
      <!-- 表单项:文字说明 -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width:240px;margin-right:'8px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login()" type="primary" style="width:100%">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import auth from "@/utils/auth.js";
export default {
  name: "my-login",
  data() {
    // 自定义校验函数
    const checkMobile = (rule, value, callback) => {
      // 校验value的值
      // 格式: 1开头 ; 第二个数字是3-9之间 ; 9个数字结尾
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback();
      } else {
        callback(new Error("手机号格式不正确!"));
      }
    };
    return {
      // 登录表单数据
      loginForm: {
        mobile: "13911111111",
        code: "246810"
      },
      //   校验规则对象
      loginRules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          // 指定一个自定义校验函数,失去焦点后触发
          {
            validator: checkMobile,
            trigger: "blur"
          }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { len: 6, message: "请输入6位验证码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 登录函数,对整体表单进行验证
    login() {
      //   this.$refs.loginForm 就是组件实例   valid 代表整体表单是否校验成功
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 校验成功,进行登录
          this.$http
            .post("authorizations", this.loginForm)
            .then(res => {
              // 登录成功
              // 存储用户信息
              auth.setUser(res.data.data);
              // 跳转到首页
              this.$router.push("/");
            })
            .catch(() => {
              //   错误提示
              this.$message.error("手机号或验证码错误");
            });
        }
      });
    }
  }
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
  background: url("../assets/login_bg1.jpg") no-repeat center / cover;
  .my-card {
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