<template>
 <el-table
    :data="NoteData"
    style="width: 100%">
    <el-table-column
      label="日期"
      width="180">
      <template #default="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.time }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="标题"
      width="300"
      prop="title">
    </el-table-column>
    <el-table-column
      label="标签"
      width="180">
      <template #default="scope">
        <el-tag size="medium">{{ scope.row.tag }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="点赞数"
      width="180">
      <template #default="scope">
        <i class="fa fa-heart" style="color:#ff5964"></i>
        <span style="margin-left: 10px">{{ scope.row.likecount }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {defineComponent, ref, reactive, toRefs} from 'vue'
export default defineComponent({
  name: '',
  components: {

  },
  setup(props, ctx){
    let NoteData = reactive([
      {
        ID: 0,
        title: '标题',
        time:'2021-4-15 18:50',
        likecount:1200,
        tag:'前端'
      },
      {
        ID: 1,
        title: '标题1',
        time:'2021-4-15 21:50',
        likecount:1400,
        tag:'后端'
      },
      {
        ID: 2,
        title: '标题2',
        time:'2021-4-15 22:50',
        likecount:1000,
        tag:'大数据'
      }
    ]);
    return{
      NoteData
    }
  }
})
</script>

<style scoped>

</style>