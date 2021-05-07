<template>
  <div style="width:1200px;background-color: white;margin: 0 auto;">
    <div class="top">
      <h1 style="margin:0;padding:12px 0">{{note.title}}
        <el-tag effect="dark" v-show="note.tag === '前端'">#前端</el-tag>
        <el-tag effect="dark" class="v-middle" type="success" v-show="note.tag==='后端'">#后端</el-tag>
        <el-tag effect="dark" type="warning" v-show="note.tag==='大数据'">#大数据</el-tag>
        <el-tag effect="dark" type="danger" v-show="note.tag==='人工智能'">#人工智能</el-tag>
      </h1>
      <div>
        由
        <span class="text-color">{{note.nickname}}</span>
        于
        <span class="text-color">{{note.time}}</span>
        发布

        
      </div>
      <div>
        
      </div>
    </div>
    <div class="middle box-content">
      <v-md-editor style="width:800px" v-model="note.text" mode="preview"></v-md-editor>
    </div>
    <div class="comment box-border">
      <div class="comment_top">
        <input type="text" v-model="comment">
        <Button :bcolor="'#409eff'" :msg="'评论'" :icon="'fa fa-comment'" @click="submitComment"/>
      </div>
      <div class="comment_body">
        <ul v-loading="loading">
          <li v-for="(item,index) of commentInfo"
          :key="index">
            <div>
              <img src="../assets/logo.png" alt="">
              <span>{{item.writer.nickName}}</span>
            </div>
            <div style="margin-left: 72px;">
              {{item.comment}}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, reactive, toRefs, getCurrentInstance} from 'vue'
import Button from '@/components/Button.vue'
import Note from '../lib/API/NoteAPI'
import Comment from '../lib/API/CommentAPI'
import swal from '../lib/swal';
export default defineComponent({
  name: '',
  components: {
    Button
  },
  setup(props){
    const {ctx} = getCurrentInstance();
    let noteid = ctx.$router.currentRoute.value.params.Id;
    let comment = ref("");
    let commentInfo = reactive([]);
    let note = reactive({
      title: '',
      text: '',
      tag: '',
      time: '',
      nickname: ''
    });
    let loading = ref(true);
    Note.getNoteID(noteid).then(res=>{
      console.log(res.data.data[0]);
      note.title = res.data.data[0].title;
      note.text = res.data.data[0].content;
      note.tag = res.data.data[0].tag;
      note.time = res.data.data[0].time.replace(/T/g, ' ').replace(/.[\d]{3}Z/, ' ');
      note.nickname = res.data.data[0].writer.nickName;
    })
    let page = ref(1)
    Comment.getComment(page.value,10,noteid).then(res=>{
      console.log(res.data.data);
      for(var i = 0;i<res.data.data.length;i++){
        commentInfo[i] = res.data.data[i];
        commentInfo[i].comment = res.data.data[i].comment;
        commentInfo[i].writer.nickName = res.data.data[i].writer.nickName;
      }
      console.log(commentInfo);
      loading.value = false;
    })
    let submitComment = function(){
      Comment.createComment(noteid,comment.value).then(res=>{
        location.reload();
        return res
      }).catch(err=>{
        swal.Error();
      })
    }
    return{
      note,
      comment,
      submitComment,
      commentInfo,
      loading
    }
  }
})
</script>

<style scoped>
.top{
  border-bottom: 1px solid #e6e6e6;
  padding-left: 54px;
  padding-bottom:12px;
}
.middle{
  display: inline-block;
  width: 800px;
}
.comment{
  display: inline-block;
  width: 380px;
  padding: 5px;
  border-left: 1px solid #e6e6e6;
}
.comment_top{
  position: relative;
  width: 100%;
  height: 50px;
}
.comment_top input{
  margin: 0;
  padding: 0;
  border-bottom: 2px solid #409eff;
  border-left: none;
  border-top: none;
  border-right: none;
  outline: none;
  width: 75%;
  height: 32px;
}
.comment_body ul{
  list-style: none;
  margin: 0;
  padding: 0;
}
.comment_body ul li{
  padding-bottom: 22px;
  border-bottom: 1px solid #e6e6e6;
}
.comment_body ul li div:first-child{
  height: 50px;
}
.comment_body ul li img{
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 1px solid #409eff;
  margin-left: 10px;
}
.comment_body ul li div span{
    display: inline-block;
    height: 50px;
    line-height: 50px;
    vertical-align: bottom;
    margin-left: 20px;
    color: #409eff;
}
.text-color{
  color: #0f71d2;
}
.v-middle{
  vertical-align: middle;
}
</style>