<template>
  <el-select @change="changeChannel" clearable :value="value" placeholder="请选择">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>
<script>
export default {
  name: "my-channel",
  props: ["value"],
  data() {
    return {
      // 频道ID
      channelId: null,
      // 频道下拉选项
      channelOptions: []
    };
  },
  created() {
    this.getChannelOptions();
  },
  methods: {
    // 选择频道
    changeChannel(value) {
      // 清空的时候值是 ''  ,不符合后台要求 ,应该改为null,代表查询全部
      if (value === "") value = null;
      // 将value数据交给父组件,让父组件给reqParams.channel_id赋值
      this.$emit("input", value);
    },
    // 获取频道下拉选项数据
    async getChannelOptions() {
      // 获取数据后 res ==={data:'响应主体'}
      // 解构(针对res) : 获取到响应数据 data ==={message:'ok',data:{channels:[频道下拉选项数据]}}
      const {
        data: { data }
      } = await this.$http.get("channels");
      // 拿到数据后进行赋值
      //   此时的this.channelOptions=[id:'频道id',name:'频道名称']
      this.channelOptions = data.channels;
    }
  }
};
</script>
<style scoped lang='less'></style>