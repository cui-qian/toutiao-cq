<template>
  <div class="images-container">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 内容 -->
      <!-- 按钮栏 -->
      <div class="btn-box">
        <el-radio-group @change="changeCollect" v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          @click="openAddImageDialog()"
          type="success"
          style="float:right"
          size="small"
        >添加素材</el-button>
        <!-- 对话框 -->
        <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
          <span>
            <el-upload
              class="avatar-uploader"
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
              name="image"
              :headers="headers"
              :show-file-list="false"
              :on-success="uploadImageSuccess"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </span>
        </el-dialog>
      </div>
      <!-- 图片列表 -->
      <div class="img_list">
        <div class="img_item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="option" v-if="!reqParams.collect">
            <span
              @click="toggleStatus(item)"
              class="el-icon-star-off"
              :style="{color:item.is_collected?'red':'#fff'}"
            ></span>
            <span @click="deleteImage(item)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="changePage"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import auth from "@/utils/auth";
export default {
  name: "my-image",
  data() {
    return {
      // 查询素材的参数
      reqParams: {
        // 默认查询全部 false  收藏 true
        collect: false,
        page: 1,
        per_page: 10
      },
      // 素材列表,
      images: [],
      // 总条数
      total: 0,
      // 控制对话框显示与隐藏
      dialogVisible: false,
      // 上传成功后的图片地址 ,用来预览上传成功后的图片
      imageUrl: null,
      // 上传组件的请求头headers
      headers: {
        Authorization: `Bearer ${auth.getUser().token}`
      }
    };
  },
  created() {
    this.getImages();
  },
  methods: {
    async getImages() {
      const {
        data: { data }
      } = await this.$http.get("user/images", {
        params: this.reqParams
      });
      this.images = data.results;
      this.total = data.total_count;
    },
    // 切换分页
    changePage(newPage) {
      this.reqParams.page = newPage;
      this.getImages();
    },
    // 切换全部与收藏
    changeCollect() {
      this.reqParams.page = 1;
      this.getImages();
    },
    // 切换添加收藏与取消收藏
    async toggleStatus(item) {
      try {
        const {
          data: { data }
        } = await this.$http.put(`user/images/${item.id}`, {
          collect: !item.is_collected
        });
        // data.collect  修改后的图片状态
        // 提示
        this.$message.success(data.collect ? "添加收藏成功" : "取消收藏成功");
        // 视图 : 更改按钮颜色样式
        // item 就是渲染当前图片中收藏按钮的样式 , 修改item就可驱动视图修改
        item.is_collected = data.collect;
      } catch {
        this.$message.success("操作失败");
      }
    },
    // 删除图片素材
    deleteImage(item) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          try {
            await this.$http.delete(`user/images/${item.id}`);
            this.$message.success("删除成功");
            this.getImages();
          } catch (e) {
            this.$message.error("删除失败");
          }
        })
        .catch(() => {});
    },
    // 打开添加素材的对话框
    openAddImageDialog() {
      // 1.准备对话框
      // 2.打开对话框
      this.dialogVisible = true;
    },
    // 添加素材
    uploadImageSuccess(res) {
      // 预览
      this.imageUrl = res.data.url;
      // 提示
      this.$message.success("上传素材成功");
      // 3s后
      window.setTimeout(() => {
        // 关闭对话框
        this.dialogVisible = false;
        // 跳转第一页
        this.reqParams.page = 1;
        this.getImages();
        // 考虑重新打开对话框时,清除上一次的图片预览
        this.imageUrl = null;
      }, 3000);
    }
  }
};
</script>

<style scoped lang='less'>
.img_list {
  margin-top: 20px;
  .img_item {
    width: 150px;
    height: 150px;
    border: 1px dashed #ddd;
    display: inline-block;
    position: relative;
    margin-left: 50px;
    margin-bottom: 15px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .option {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 30px;
      line-height: 30px;
      text-align: center;
      width: 100%;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.3);
      span {
        margin: 0 20px;
      }
    }
  }
}
</style>