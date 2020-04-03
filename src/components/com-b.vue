<template>
  <div class="container">
    组件B
    <button @click="fn">b传值给a</button>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus";
export default {
  name: "coma",
  data() {
    return {
      msg: "这是b组件数据"
    };
  },
  methods: {
    fn() {
      eventBus.$emit("b2a", this.msg);
    }
  }
};
</script>

<style scoped lang='less'></style>