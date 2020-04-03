<template>
  <div class="fans-container">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <!-- tabs组件 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <div class="fans_list">
            <div class="fans_item" v-for="item in list" :key="item.id.toString()">
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <p>{{item.name}}</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>
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
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="img">
          <div ref="myFansImg" style="width:600px;height:400px"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
// 引入echarts图表
import echarts from 'echarts'

export default {
  name: "my-fans",
  data() {
    return {
      // 默认激活的tabs选项
      activeName: "list",
      reqParams: {
        page: 1,
        per_page: 24
      },
      total: 0,
      list: []
      // 测试头像数据
      //   circleUrl: ""
    };
  },
  // 模板渲染前调用方法,初始化
  created() {
    this.getFansList();
  },
  // 模板渲染完之后调用
  mounted() {
    this.fansChart();
  },
  methods: {
    // 获取粉丝列表
    async getFansList() {
      const {
        data: { data }
      } = await this.$http.get("followers", { params: this.reqParams });
      this.list = data.results;
      this.total = data.total_count;
    },
    // 切换分页
    changePage(newPage) {
      this.reqParams.page = newPage;
      this.getFansList();
    },
    // 粉丝头像图表
    async fansChart() {
      const myChart = echarts.init(this.$refs.myFansImg)
      const option = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            // x坐标
            data: [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            // 图表的每一个柱子的数据
            data: []
          }
        ]
      };
      // 1.获取后台统计数据
      const {data:{data}}=await this.$http.get('statistics/followers')
      // 2.修改配置项中的数据
      // data==={age:{le18:200,....}}
      // xAxis[0].data  追加选项   series[0].data  追加选项
      for(const key in data.age){
            option.xAxis[0].data.push(key.replace('le','小于').replace('gt',('大于')))
            option.series[0].data.push(data.age[key])
      }
      myChart.setOption(option);
    }
  }
};
</script>

<style scoped lang='less'>
.fans_list {
  .fans_item {
    width: 120px;
    height: 170px;
    border: 1px dashed #ddd;
    text-align: center;
    padding-top: 10px;
    display: inline-block;
    margin-right: 30px;
    margin-bottom: 10px;
    p {
      margin: 10px 0;
    }
  }
}
</style>