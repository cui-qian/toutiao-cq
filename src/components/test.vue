<template>
  <div class="page">
    <header>page-header</header>
    <div class="content">
      <!-- 具名插槽 -->
      <slot name="content" :info="msg"></slot>
    </div>
    <footer>
      <!-- 具名插槽 -->
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: "my-test",
  data() {
    return {
      msg: "哈哈哈"
    };
  }
};
</script>

<style scoped lang='less'></style>