<template>
  <div class="article-container">
    <!-- 筛选条件区域 -->
    <el-card>
      <!-- 头部(面包屑) -->
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态:">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
          <el-select
            @change="changeChannel"
            clearable
            v-model="reqParams.channel_id"
            placeholder="请选择"
          >
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker
            is-range
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filterArticle()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果区域 -->
    <el-card style="margin-top:20px">
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果 :</div>
      <!-- 表格-->
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image fit="cover" :src="scope.row.cover.images[0]" style="width:150px;height:100px">
              <div slot="error" class="image-slot">
                <img src="../assets/error.gif" alt style="width:150px;height:100px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              plain
              @click="editArticle(scope.row.id)"
            ></el-button>
            <!-- 删除 -->
            <el-button
              @click="deleteArticle(scope.row.id)"
              type="danger"
              icon="el-icon-delete"
              circle
              plain
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- 当前页码  :current-page="reqParams.page" ; 每页显示多少条  :page-size="reqParams.per_page" ; 切换页面  @current-change="changePager" -->
      <el-pagination
        style="margin-top:20px"
        background
        :page-size="reqParams.per_page"
        layout="prev, pager, next"
        :current-page="reqParams.page"
        :total="total"
        @current-change="changePager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
// import MyBread from "@/components/my-bread"; //这种是局部注册方式
export default {
  // components: { MyBread },  //这种是局部注册方式
  name: "my-article",
  data() {
    return {
      // 筛选条件数据
      reqParams: {
        // 当字段的值为null的时候,这个数据不会发送个后台
        status: null,
        // 频道
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1, //默认第一页
        per_page: 40 //一页显示20条
      },
      // 频道下拉选项数据
      channelOptions: [],
      // 时间选择框 [起始日期,结束日期]
      // 将来:当日期控件选择了日期后动态给 reqParams 中 begin_pubdate 和 end_pubdate 赋值
      dateArr: [],
      // 文章列表
      articles: [],
      // 文章总条数
      total: 0
    };
  },
  created() {
    this.getChannelOptions();
    this.getArticles();
  },
  methods: {
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
    },
    async getArticles() {
      const {
        data: { data }
      } = await this.$http.get("articles", { params: this.reqParams });
      this.articles = data.results;
      this.total = data.total_count;
    },

    // 进行分页
    changePager(newPage) {
      // 根据新的页码 ,重新获取列表数据即可
      this.reqParams.page = newPage;
      this.getArticles();
    },
    // 改变日期
    changeDate(dateArr) {
      // 1.根据选择的时间给起始和结束数据赋值
      // 现在的日期格式是标准日期格式 Date格式
      // 后台接口要求字符串格式的日期   例如 :'2020-10-10'
      // 在给起始和结束数据赋值前 , 转换格式为字符串格式
      // console.log(dateArr);
      // 如果清空日期操作,dateArr等于null
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0];
        this.reqParams.end_pubdate = dateArr[1];
      } else {
        this.reqParams.begin_pubdate = null;
        this.reqParams.end_pubdate = null;
      }
    },

    // 筛选文章
    filterArticle() {
      // 回到第一页
      this.reqParams.page = 1;
      // 根据reqParams进行查询
      this.getArticles();
    },
    // 选择频道
    changeChannel(value) {
      // 清空的时候值是 ''  ,不符合后台要求 ,应该改为null,代表查询全部
      if (value === "") this.reqParams.channel_id = null;
    },

    // 编辑文章
    editArticle(id, row) {
      this.$router.push(`/publish?id=${id}`);
    },
    // 删除
    deleteArticle(id) {
      // 确认框
      this.$confirm("此操作将永久删除该文章, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 点击确认
          try {
            // 发删除请求
            await this.$http.delete(`articles/${id}`);
            // 成功提示
            this.$message.success("删除成功");
            // 更新列表
            this.getArticles();
          } catch (e) {
            // 错误提示
            this.$message.error("删除失败");
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped lang='less'>
</style>