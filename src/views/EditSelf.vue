<template>
  <input type="text" v-model="title" style="" placeholder="请输入标题">
  <v-md-editor :include-level="[1, 2, 3]" v-model="text" height="calc(100vh - 81px)" :disabled-menus="[]" @upload-image="handleUploadImage" @save="saveText"></v-md-editor>
  <div class="tag">
    <label style="margin-left: 20px;margin-right:20px;">请选择标签:</label>
    <el-radio-group v-model="tag">
      <el-radio-button label="前端"></el-radio-button>
      <el-radio-button label="后端"></el-radio-button>
      <el-radio-button label="大数据"></el-radio-button>
      <el-radio-button label="人工智能"></el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
import {defineComponent, ref, reactive, toRefs, getCurrentInstance} from 'vue'
import Note from '../lib/API/NoteAPI'
import swal from '../lib/swal'
export default defineComponent({
  name: '',
  components: {

  },
  setup(props){
    const {ctx} = getCurrentInstance();
    let title = ref("");
    let text = ref("");
    let tag = ref("");
    let noteid = ctx.$router.currentRoute.value.params.Id;
    Note.getNoteID(noteid).then(res=>{
      title.value = res.data.data[0].title;
      text.value = res.data.data[0].content;
      tag.value = res.data.data[0].tag;
      console.log(title.value,text.value,tag.value);
    })
    let handleUploadImage = (event, insertImage, file)=>{
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      console.log(file[0]);
      let formData = new FormData();
      formData.append("imgFile",file[0]);
      ctx.$axios({
        url:'http://localhost:5000/api/NoteInfo/UpLoadImg',
        method: 'post',
        headers:{ 'Authorization':'Bearer ' + sessionStorage.getItem('token') },
        data: formData
      })
      .then(function (response) {
        console.log(response);
        insertImage({
          url: response.data,
          desc: file[0].name,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
      
    };
    
    let saveText = (text, html)=>{
      console.log(text, html, title.value, tag.value);
      Note.editNote(noteid,title.value,text,tag.value)
      .then(res=>{
        if(res.data.code === 200)
        swal.Success("修改成功");
        ctx.$router.push({
          path: '/home'
        })
      })
      .catch(err=>{
        return err
      })
    }
    return{
      title,
      text,
      tag,
      handleUploadImage,
      saveText
    }
  }
})
</script>

<style scoped>

input[type="text"]{
  width:100vw;
  height:40px;
  border:none;
  border-bottom: 1px solid #e6e6e6;
  outline:none;
  font-size:20px;
  box-sizing:border-box;
  text-indent: 4px;
  caret-color: #cecece;
}

.tag{
  width: 100vw;
  height: 40px;
  background-color: white;
  box-sizing: border-box;
  border-top: 1px solid #dddddd;
}

</style>