<template>
  <div class="publish-container">
    <el-card>
      <div slot="header">
        <my-bread>发布文章</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="120px">
        <el-form-item label="标题">
          <el-input v-model="articleFrom.title" placeholder="请输入文章标题" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item v-model="articleFrom.content" label="内容">
          <!-- 富文本 -->
        </el-form-item>
        <el-form-item v-model="articleFrom.cover.type" label="封面">
          <el-radio-group v-model="radio">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div>
            <!-- 封面组件 -->
          </div>
        </el-form-item>
        <el-form-item label="频道">
          <!-- 频道组件 -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发布文章</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "my-publish",
  data() {
    return {
      // 文章表单数据对象
      articleFrom: {
        title: "",
        content: "",
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      }
    };
  }
};
</script>

<style scoped lang='less'></style>