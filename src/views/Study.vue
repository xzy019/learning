<template>
  <div id="main"></div>
  <div id="studyTable">
    <el-button type="success" icon="el-icon-plus" @click="dialogFormVisible = true"></el-button>
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

  <el-dialog title="新增学习记录" v-model="dialogFormVisible">
  <el-form :model="addStudy">
    <el-form-item label="学习时间" :label-width="formLabelWidth">
      <el-input v-model="addStudy.StudyTime" style="width:220px" autocomplete="off" placeholder="请输入学习时间"></el-input>
      分钟
    </el-form-item>
    <el-form-item label="记录类型" :label-width="formLabelWidth">
      <el-select v-model="addStudy.Type" placeholder="请选择记录类型">
        <el-option label="前端" value="前端"></el-option>
        <el-option label="后端" value="后端"></el-option>
        <el-option label="大数据" value="大数据"></el-option>
        <el-option label="人工智能" value="人工智能"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </span>
  </template>
  </el-dialog>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from "vue";
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
    let addStudy = reactive({
      StudyTime:'',
      Type: ''
    })
    let handleEdit = (index,row)=>{
      console.log(index,row);
    }
    let handleDelete = (index,row)=>{
      console.log(index,row);
    }
    return {
      StudyData,
      handleEdit,
      handleDelete,
      dialogFormVisible: ref(false),
      addStudy
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