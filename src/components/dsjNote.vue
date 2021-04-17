<template>
  <ul>
    <li
      v-for="(item,index) of Note"
      :key="index"
      @click="findNote(item.ID)">
      <h1>{{item.title}}</h1>
      <el-tag type="warning">#大数据</el-tag>
      <p>{{ellipsis(item.content)}}</p>
      <div class="bottom">
        <div class="left">
          <Time theme="outline" size="17" fill="#bebebe"/>
          {{item.time}}
        </div>
        <div class="right" @click="dianzan(index)">
          <like v-show="!item.like" theme="filled" size="18" fill="#ff5964"/>
          <like v-show="item.like" theme="outline" size="18" fill="#333"/>
          <span>{{item.likecount}}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import {Time,Like} from '@icon-park/vue-next';
import {defineComponent, ref, reactive, toRefs} from 'vue'
export default defineComponent({
  components:{
    Time,
    Like
  },
  setup(props, ctx){
    let Note = reactive([
      {
        ID: 0,
        title: '标题',
        content:'测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
        time:'2021-4-15 18:50',
        likecount:1200,
        like: true
      },
    ]);
    let ellipsis = (value)=>{
      if (!value) return "";
      if (value.length > 220) {
        return value.slice(0, 220) + "..." ;
      }
      return value
    };

    let findNote = (index)=>{
      console.log(index);
    };
    let dianzan = (index)=>{
      if(Note[index].like===true){
        Note[index].likecount++;
        Note[index].like = !Note[index].like;
      }
      else{
        Note[index].likecount--;
        Note[index].like = !Note[index].like;
      }
    }
    return{
      Note,
      dianzan,
      ellipsis,
      findNote
    }
  },
  filters: {
    //超过20位显示 ...
    ellipsis: function(value) {
      
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
  height: 240px;
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