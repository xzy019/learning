<template>
  <div id="main"></div>
  <div id="studyTable">
    <el-table :data="StudyData" style="width: 100%">
      <el-table-column label="学习时间" width="180">
        <template #default="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.StudyTime }}分钟</span>
        </template>
      </el-table-column>
      <el-table-column label="记录类型" prop="Type"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from "vue";
import * as echarts from "echarts";
import { color } from "echarts";
export default defineComponent({
  name: "",
  components: {},
  setup(props, ctx) {
    let StudyData = reactive([
      {
        ID:0,
        StudyTime:'25',
        Type: '学习'
      },
      {
        ID:1,
        StudyTime:'20',
        Type: '学习'
      },
      {
        ID:3,
        StudyTime:'45',
        Type: '学习'
      }
    ]);
    let handleEdit = (index,row)=>{
      console.log(index,row);
    }
    let handleDelete = (index,row)=>{
      console.log(index,row);
    }
    return {
      StudyData,
      handleEdit,
      handleDelete
    };
  },
  mounted(){
    let myChart =this.$echarts.init(
      document.getElementById("main")
    );
    // 绘制图表
    myChart.setOption({
      title: {
        text: '学习记录一览表'
      },
      tooltip: {},
      xAxis: {
          data: ['前端', '后端', '人工智能', '大数据']
      },
      yAxis: {},
      series: [{
          name: '学习时间',
          type: 'bar',
          data: [40, 20, 36, 10],
          itemStyle: {
            normal: {
　　　　　　　　//这里是重点
                color: function(params) {
                	//注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                    var colorList = ['#ff5964','#a2d5f2','#ffda77','#1bd1a5'];
                    return colorList[params.dataIndex];
                }
            }
        }
      }],
    });
  }
});
</script>

<style scoped>
#main{
  display: inline-block;
  width: 50%;
  height: 400px;
  box-sizing: border-box;
}
#studyTable{
  display: inline-block;
  width: 50%;
  box-sizing: border-box;
  height: 100vh;
  float: right;
}
</style>