<template>
 <el-table
    :data="NoteData"
    style="width: 100%">
    <el-table-column
      label="日期"
      width="200">
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
        <span style="margin-left: 10px">{{ scope.row.likeNumber }}</span>
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
  <div>
    <el-pagination
      background
      :current-page="page"
      layout="prev, pager, next"
      @current-change="change"
      page-size="10"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {defineComponent, ref, reactive, toRefs,getCurrentInstance} from 'vue'
import Note from '../lib/API/NoteAPI'
import Swal from 'sweetalert2'
export default defineComponent({
  name: '',
  components: {

  },
  setup(props){
    const {ctx} = getCurrentInstance();
    let NoteData = reactive([]);
    let page =ref(1);
    let total = ref(10);
    Note.getNoteSelf(page.value,10).then(res=>{
      console.log(res.data.data);
      let i;
      total.value = res.data.total;
      for(i=0;i<res.data.data.length;i++){
        NoteData[i] = res.data.data[i];
        NoteData[i].title = res.data.data[i].title;
        NoteData[i].time = res.data.data[i].time.replace(/T/g, ' ').replace(/.[\d]{3}Z/, ' ');
        NoteData[i].tag = res.data.data[i].tag;
        NoteData[i].likeNumber = res.data.data[i].likeNumber;
      }
    });
    let change = function(index){
      console.log(index);
    }
    let handleEdit = (index,row)=>{
      console.log(index);
      let see = ctx.$router.resolve({
        path: `/editnote/${row.id}`,
      });
      window.open(see.href, '_blank')
    }
    let handleDelete = (index,row)=>{
      console.log(index,row.id);
      Swal.fire({
        icon:'warning',
        title: '你确定删除吗？',
        showCancelButton: true,
        confirmButtonText: '确定',
        confirmButtonColor:'red',
        cancelButtonText: "取消"
  }).then((result) => {
    if (result.isConfirmed) {
      Note.deleteNote(row.id).then(res=>{
        if(res.data.code === 200){
          Swal.fire({
            title:'删除成功', 
            icon:'success',
            timer: 1500
          })
          location.reload();
        }
      })
      
    } else if (result.isDenied) {
      Swal.close()
    }
  })
    }
    return{
      NoteData,
      page,
      total,
      change,
      handleEdit,
      handleDelete
    }
  }
})
</script>

<style scoped>

</style>