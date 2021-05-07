<template>
  <ul v-if="xuanran">
    <li
      v-for="(item,index) of Note"
      v-show="item.title"
      :key="item.id"
    >
      <h1 @click="findNote(item.id)">{{item.title}}</h1>
      <div @click="findNote(item.id)" style="height:100px">{{ellipsis(item.content)}}</div>
      <div class="bottom">
        <div class="left">
          <Time theme="outline" size="17" fill="#bebebe"/>
          {{item.time}}
        </div>
        <div class="right" @click="dianzan(item.id,index)">
          <like v-show="!item.like" theme="filled" size="18" fill="#ff5964"/>
          <like v-show="item.like" theme="outline" size="18" fill="#333"/>
          <span>{{item.likeNumber}}</span>
        </div>
      </div>
    </li>
  </ul>
  <div>
    <el-pagination
      background
      :current-page="page"
      layout="prev, pager, next"
      @current-change="change"
      page-size="3"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {Time,Like} from '@icon-park/vue-next';
import {defineComponent, ref, reactive, toRefs, getCurrentInstance} from 'vue'
import NoteAPI from '../lib/API/NoteAPI'
import swal from '../lib/swal'
export default defineComponent({
  components:{
    Time,
    Like
  },
  setup(props){
    const {ctx} = getCurrentInstance();
    let Note = reactive([
      {
        id: 0,
        title: '',
        content: '',
        time: '',
        likeNumber: '',
        like: true
      }
    ]);
    let xuanran = ref(false);
    let page =ref(1);
    let total = ref(10);
    NoteAPI.getNoteAll(page.value,3).then(res=>{
      console.log(res.data.total);
      total.value = res.data.total;
      let i = 0;
      for(i;i<res.data.data.length;i++){
        Note[i] = res.data.data[i];
        Note[i].like = true;
        Note[i].time = res.data.data[i].time.replace(/T/g, ' ').replace(/.[\d]{3}Z/, ' ');
      }
      console.log(Note);
      xuanran.value = true;
    })
    let ellipsis = (value)=>{
      if (!value) return "";
      if (value.length > 220) {
        return value.slice(0, 220) + "..." ;
      }
      return value
    };

    let findNote = (index)=>{
      console.log(index);
      let see = ctx.$router.resolve({
        path: `/see/${index}`,
      });
      window.open(see.href, '_blank')
    };
    let dianzan = (row,index)=>{
      if(Note[index].like===true){
        Note[index].likeNumber++;
        Note[index].like = !Note[index].like;
        NoteAPI.likeNote(row).then(res=>{
          console.log(res);
          if(res.data.code === 200) swal.Success('点赞成功');
        })
      }
      else{
        Note[index].likecount--;
        Note[index].like = !Note[index].like;
      }
    };
    let change = function(index){
      NoteAPI.getNoteAll(index,3).then(res=>{
        let i = 0;
        for(i;i<3;i++){
          if(res.data.data[i] == null) Note[i] = {
            id: 0,
            title: '',
            content: '',
            time: '',
            likeNumber: '',
            like: true,
          };
          else{
            Note[i] = res.data.data[i];
            Note[i].like = true;
            Note[i].time = res.data.data[i].time.replace(/T/g, ' ').replace(/.[\d]{3}Z/, ' ');
          } 
        }
        console.log(Note);
        xuanran.value = true;
      })
    }
    return{
      Note,
      dianzan,
      ellipsis,
      findNote,
      total,
      xuanran,
      page,
      change
    }
  },
})
</script>

<style scoped>
ul{
  list-style: none;
}
li{
  width: 60vw;
  height: 195px;
  border: 1px solid #e6e6e6;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 12px;
}
.bottom .left{
  float: left;
  color: #bebebe;
}
.bottom .right{
  float: right;
  width: 80px;
  height: 30px;
  text-align: center;
}
</style>