<template>
  <div class="my-cover">
    <!-- 图片按钮 -->
    <div class="btn_img" @click="openDialog">
      <!-- 保证父组件传入的图片地址是空的时候, 就显示默认图 -->
      <img :src="value||coverImageUrl" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="720px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 切换按钮 -->
          <el-radio-group @change="changeCollect" v-model="reqParams.collect" size="small">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 素材列表 -->
          <div class="img_list">
            <div
              :class="{selected:item.url===selectedImageUrl}"
              @click="selectedImage(item.url)"
              class="img_item"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <!-- 分页组件 -->
          <el-pagination
            @current-change="changePage"
            backgroundd
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            hide-on-single-page
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            name="image"
            :headers="headers"
            :show-file-list="false"
            :on-success="uploadImageSuccess"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import auth from "@/utils/auth";
import defaultImg from "../assets/default.png";
export default {
  name: "my-cover",
  // 父传给子的图片地址
  props: ["value"],
  data() {
    return {
      // 控制对话框显示与隐藏
      dialogVisible: false,
      // 当前tabs组件激活的选项卡name的属性值
      activeName: "image",
      // 筛选条件对象
      reqParams: {
        // 素材库列表类型(全部&收藏)
        collect: false,
        page: 1,
        per_page: 8
      },
      // 总条数
      total: 0,
      // 图片素材列表
      images: [],
      // 选中的图片地址
      selectedImageUrl: null,
      // 请求头
      headers: {
        Authorization: `Bearer ${auth.getUser().token}`
      },
      // 上传的图片地址
      uploadImageUrl: null,
      // 封面地址
      coverImageUrl: defaultImg
    };
  },
  methods: {
    // 对话框的打开与关闭
    openDialog() {
      this.dialogVisible = true;
      // 只有用户打开了对话框,才有选择素材的需求,再去加载数据才是合理的
      // 每次打开对话框都可以拿到最新的素材数据
      this.getImages();
      // 重置数据
      this.selectedImageUrl = null;
      this.uploadImageUrl = null;
      this.activeName = "image";
    },
    // 获取图片列表
    async getImages() {
      const {
        data: { data }
      } = await this.$http.get("user/images", { params: this.reqParams });
      this.total = data.total_count;
      this.images = data.results;
    },
    // 切换全部与收藏
    changeCollect() {
      this.reqParams.page = 1;
      this.getImages();
    },
    // 分页功能
    changePage(newPage) {
      this.reqParams.page = newPage;
      this.getImages();
    },
    // 选中图片
    selectedImage(url) {
      this.selectedImageUrl = url;
    },
    // 上传图片成功的方法
    uploadImageSuccess(res) {
      this.uploadImageUrl = res.data.url;
      this.$message.success("上传图片成功");
    },
    // 确认图片
    confirmImage() {
      if (this.activeName === "image") {
        // 激活素材库
        if (!this.selectedImageUrl) {
          return this.$message.warning("请先选中一张图片");
        }
        // 预览
        // this.coverImageUrl = this.selectedImageUrl;
        // 提交给父组件,让父组件给绑定的数据赋值
        this.$emit("input", this.selectedImageUrl);
      }
      if (this.activeName === "upload") {
        // 激活上传图片
        if (!this.uploadImageUrl) {
          return this.$message.warning("请先上传一张图片");
        }
        // 预览
        // this.coverImageUrl = this.uploadImageUrl;
        // 提交给父组件,让父组件给绑定的数据赋值
        this.$emit("input", this.uploadImageUrl);
      }
      // 关闭对话框
      this.dialogVisible = false;
    }
  }
};
</script>

<style scoped lang='less'>
// 图片按钮
.btn_img {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
// 素材列表
.img_list {
  margin-top: 20px;
  .img_item {
    position: relative;
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 15px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    // 给 .img_item 加上一个selected类名 这个类加一个伪元素
    &.selected::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url("../assets/selected.png") no-repeat
        center / 50px 50px;
    }
  }
}
</style>