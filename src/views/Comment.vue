<template>
  <div class="comment-container">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 表格 -->
      <el-table :data="comments">
        <el-table-column label="文章标题" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="评论状态">
          <!-- 值为false->代表正常  true->代表关闭 -->
          <template slot-scope="scope">{{scope.row.comment_status?'关闭':'正常'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" v-if="scope.row.comment_status" type="danger">关闭评论</el-button>
            <el-button size="small" v-else type="success">打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        @current-change="changePage"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "my-comment",
  data() {
    return {
      // 评论列表数据
      comments: [],
      // 参数对象
      reqParams: {
        response_type: "comment",
        page: 1,
        per_page: 20
      },
      // 总条数
      total: 0
    };
  },
  // 组件初始化会执行这个函数 , 而不是写上这个函数组件才能初始化
  created() {
    this.getComments();
  },
  methods: {
    // 获取评论列表
    async getComments() {
      const {
        data: { data }
      } = await this.$http.get("articles", { params: this.reqParams });
      this.comments = data.results;
      this.total = data.total_count;
    },
    // 分页
    changePage(newPage) {
      this.reqParams.page = newPage;
      this.getComments();
    }
  }
};
</script>

<style scoped lang='less'></style>