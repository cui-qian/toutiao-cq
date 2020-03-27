<template>
  <div class="article-container">内容管理</div>
</template>

<script>
export default {
  name: "my-article",
  created() {
    //测试获取后台数据
    this.$http
      .get("articles")
      .then(res => console.log(res.data))
      .catch(() => console.log("失败"));
  }
};
</script>

<style scoped lang='less'></style>