<template>
  <div class="container">组件A{{str}}</div>
</template>
<script>
import eventBus from "@/utils/eventBus";
export default {
  name: "coma",
  data() {
    return {
      str: ""
    };
  },
  created() {
    eventBus.$on("b2a", data => {
      this.str = data;
    });
  }
};
</script>
<style scoped lang='less'></style>