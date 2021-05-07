<template>
  <div id="main"></div>
  <div id="studyTable">
    <el-button
      type="success"
      icon="el-icon-plus"
      @click="
        dialogFormVisible = true;
        addedit = '新增学习记录';
      "
    ></el-button>
    <el-table :data="StudyData" style="width: 100%">
      <el-table-column label="学习时间" width="180">
        <template #default="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.studyTime }}分钟</span>
        </template>
      </el-table-column>
      <el-table-column label="记录类型" prop="type"></el-table-column>
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

  <el-dialog :title="addedit" v-model="dialogFormVisible">
    <el-form :model="addStudy">
      <el-form-item label="学习时间" :label-width="formLabelWidth">
        <el-input
          v-model="addStudy.StudyTime"
          style="width: 220px"
          autocomplete="off"
          placeholder="请输入学习时间"
        ></el-input>
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
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  getCurrentInstance,
  onMounted,
} from "vue";
import Study from "../lib/API/StudyAPI";
import Swal from "sweetalert2";
export default defineComponent({
  name: "",
  components: {},
  setup(props) {
    const { ctx } = getCurrentInstance();
    let StudyData = reactive([
      {
        id: 0,
        studyTime: "",
        type: "",
      },
    ]);
    let page = ref(1);
    let qdtime = ref(0);
    let hdtime = ref(0);
    let dsjtime = ref(0);
    let aitime = ref(0);
    let addStudy = reactive({
      StudyTime: "",
      Type: "",
      id: 0,
    });
    let addedit = ref("");
    let dialogFormVisible = ref(false);
    let handleEdit = (index, row) => {
      addedit.value = "编辑学习记录";
      dialogFormVisible.value = true;
      console.log(index, row);
      addStudy.StudyTime = row.studyTime;
      addStudy.Type = row.type;
      addStudy.id = row.id;
    };
    Study.getStudy(page.value, 10).then((res) => {
      let i;
      for (i = 0; i < res.data.data.length; i++) {
        StudyData[i] = res.data.data[i];
        StudyData[i].id = res.data.data[i].id;
        StudyData[i].studyTime = res.data.data[i].studyTime;
        StudyData[i].type = res.data.data[i].type;
        if (res.data.data[i].type === "前端") {
          qdtime.value = qdtime.value + parseInt(res.data.data[i].studyTime);
        } else if (res.data.data[i].type === "后端") {
          hdtime.value = hdtime.value + parseInt(res.data.data[i].studyTime);
        } else if (res.data.data[i].type === "大数据") {
          dsjtime.value =
            dsjtime.value + parseInt(res.data.data[i].studyTime);
        } else if (res.data.data[i].type === "人工智能") {
          aitime.value = aitime.value + parseInt(res.data.data[i].studyTime);
        }
      }
      console.log(qdtime.value,hdtime.value,dsjtime.value,aitime.value);
      let myChart = ctx.$echarts.init(document.getElementById("main"));
      myChart.setOption({
        title: {
          text: "学习记录一览表",
        },
        tooltip: {},
        xAxis: {
          data: ["前端", "后端", "人工智能", "大数据"],
        },
        yAxis: {},
        series: [
          {
            name: "学习时间",
            type: "bar",
            data: [qdtime.value, hdtime.value, aitime.value, dsjtime.value],
            itemStyle: {
              normal: {
                //这里是重点
                color: function (params) {
                  //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = ["#ff5964", "#a2d5f2", "#ffda77", "#1bd1a5"];
                  return colorList[params.dataIndex];
                },
              },
            },
          },
        ],
      });
    });
    let onSubmit = () => {
      if (addedit.value === "新增学习记录") {
        Study.createStudy(addStudy.StudyTime, addStudy.Type).then((res) => {
          console.log(res);
          location.reload();
        });
      }
      if (addedit.value === "编辑学习记录") {
        Study.editStudy(addStudy.id, addStudy.StudyTime, addStudy.Type).then(
          (res) => {
            console.log(res);
            location.reload();
          }
        );
      }
      dialogFormVisible.value = false;
    };
    let handleDelete = (index, row) => {
      console.log(index, row);
      Swal.fire({
        icon: "warning",
        title: "你确定删除吗？",
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.isConfirmed) {
          Study.deleteStudy(row.id).then((res) => {
            if (res.data.code === 200) {
              Swal.fire({
                title: "删除成功",
                icon: "success",
                timer: 1500,
              });
              location.reload();
            }
          });
        } else if (result.isDenied) {
          Swal.close();
        }
      });
    };
      
      // 绘制图表
      
    return {
      StudyData,
      handleEdit,
      handleDelete,
      dialogFormVisible,
      addStudy,
      addedit,
      onSubmit,
    };
  },
  mounted() {},
});
</script>

<style scoped>
#main {
  display: inline-block;
  width: 50%;
  height: 400px;
  box-sizing: border-box;
}
#studyTable {
  display: inline-block;
  width: 50%;
  box-sizing: border-box;
  height: 100vh;
  float: right;
}
</style>