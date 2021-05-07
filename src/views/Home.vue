<template>
  <el-container>
    <transition v-show="awidth">
      <el-aside width="300px">
        <div class="top">
          <img class="el-avatar" :src="imgUrl" />
          <p>
            <i 
              v-if="sex===0"
              class="fa fa-mars" 
              style="color: white;
                    display: inline-block;
                    margin-right: 10px;
                    background-color: #a2d5f2;
                    width: 45px;
                    height: 20px;
                    border-radius: 12px;
                    "
            ></i>
            <i 
              v-if="sex===1"
              class="fa fa-venus" 
              style="color: white;
                    display: inline-block;
                    margin-right: 10px;
                    background-color: #ff5964;
                    width: 45px;
                    height: 20px;
                    border-radius: 12px;
                    "
            ></i>
            <span style="vertical-align: top;">{{username}}</span>
          </p>
          <div class="top_three">
            <ul>
              <li>
                <div>12</div>
                <div>点赞数</div>
              </li>
              <li>
                <div>12</div>
                <div>粉丝</div>
              </li>
              <li>
                <div>12</div>
                <div>关注</div>
              </li>
            </ul>
          </div>
        </div>
        <div style="text-align:center;">
          <Button @click="toLink1('/edit')" :msg="'写笔记'" :icon="'fa fa-edit'" :bcolor="'#a2d5f2'"/>
          <Button @click="toLink2()" :msg="'写计划'" :icon="'fa fa-edit'" :bcolor="'#ffda77'"/>
        </div>
        <div class="center">
          <ul class="center_menu">
            <li 
              v-for="(item, index) of list"
              :key="index"
              :class="{active:index == num}"
              @click="addClassName(index)"
            >
              <router-link :to="item.path">
                <i :class="item.icon"></i>
                <span>&nbsp;{{item.name}}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </el-aside>
    </transition>
    <el-main>
      <div class="main_header">
        <div class="main_header_left">
          <Button :bcolor="'#7397AB'" :msg="''" :icon="'fa fa-bars'" @click="showBar()"/>
        </div>
        <div class="main_header_right">
          <input type="text" v-model="search_text">
          <button @click="search()"><i class="fa fa-search"></i></button>
        </div>
      </div>
      <div class="main_body">
        <router-view />
      </div>
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Button from '@/components/Button.vue'
import {defineComponent, reactive, ref, getCurrentInstance} from 'vue'
import Writer from '../lib/API/WriterAPI'
export default defineComponent({
  name: 'Home',
  components: {
    Button
  },
  setup(){
    const {ctx} = getCurrentInstance();
    let routerpath = ctx.$router.currentRoute.value.path;
    let num = ref(4);
    let bgcolor = ref('#e6e6e6');
    let awidth = ref(true);
    let username = ref("Li Ming");
    let sex = ref(0);
    let imgUrl = ref(require('../assets/logo.png'));
    let search_text = ref('');
    let toLink1 = function(path){
      let link = ctx.$router.resolve({
        path: path
      });
      window.open(link.href, '_blank')
    };
    let toLink2 = function(){
      ctx.$router.push({
        path: '/list'
      });
      num.value = 2;
      bgcolor.value = '#ffda77';
    };
    let list = reactive([
      {
        path:'/self',
        icon:'fa fa-user',
        name:'个人中心',
        color: '#ff5964'
      },
      {
        path:'/note',
        icon:'fa fa-pen-alt',
        name:'笔记社区',
        color: '#a2d5f2'
      },
      {
        path:'/list',
        icon:'fa fa-list',
        name:'计划清单',
        color: '#ffda77'
      },
      {
        path:'/study',
        icon:'fa fa-clock',
        name:'学习记录',
        color:'#1bd1a5'
      }
    ])
    let showBar = ()=>{
      awidth.value = !awidth.value 
    };
    let addClassName = (index)=>{
      console.log(index);
      num.value = index;
      bgcolor.value = list[index].color;
    }
    if(routerpath ==='/self') {num.value = 0;bgcolor.value = '#ff5964';}
    if(routerpath ==='/note') {num.value = 1;bgcolor.value = '#a2d5f2';}
    if(routerpath ==='/list') {num.value = 2;bgcolor.value = '#ffda77';}
    if(routerpath ==='/study') {num.value = 3;bgcolor.value = '#1bd1a5';}
    Writer.getWriter().
    then(res=>{
      console.log(res.data);
      username.value = res.data.data.nickName;
      sex.value = res.data.data.sex;
    })
    
    
    return{
      awidth,
      showBar,
      addClassName,
      list,
      num,
      bgcolor,
      username,
      sex,
      imgUrl,
      search_text,
      toLink1,
      toLink2
    }
  },
})
</script>

<style scoped>
.el-aside,
.el-main{
  /* border: 1px solid black; */
  height: 100vh;
  border-radius: 15px;
  margin: 0;
  background-color: #fff;
}
.el-aside{
  border-right: 1px solid v-bind(bgcolor);
  overflow: hidden;
}
.el-main{
  border-left: 1px solid v-bind(bgcolor);
  overflow-y: scroll;
}
.center{
  width: 100%;
  margin: 20px 0;
}
.center .center_menu{
  list-style: none;
  width: 100%;
  padding: 0;
}
.center .center_menu li{
  width: 100%;
  height: 30px;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 30px;
  background-color: transparent;
  position: relative;
  line-height: 30px;
}
.center .center_menu li a{
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
  width: 100%;
  display: block;
}
.center .center_menu li:nth-child(1):before{
  transition: all 0.5s cubic-bezier(0,0,1,1);
  content: ' ';
  width: 1%;
  height: 100%;
  background-color: #ff5964;
  position: absolute;
  top: 0;
  left: 0;
}
.center .center_menu li a{
  mix-blend-mode: darken;
  color: black;
}
.active{
  background-color: v-bind(bgcolor)!important;
}
.center .center_menu li:nth-child(1):hover::before{
  width: 100%;
  background-color: #ff5964;
}
.center .center_menu li a span,
.center .center_menu li a i{
  display: inline-block;
}
.center .center_menu li:nth-child(2)::before{
  transition: all 0.5s cubic-bezier(0,0,1,1);
  content: ' ';
  width: 1%;
  height: 100%;
  background-color: #a2d5f2;
  position: absolute;
  top: 0;
  left: 0;
}
.center .center_menu li:nth-child(2):hover::before{
  width: 100%;
  background-color: #a2d5f2;
}

.center .center_menu li:nth-child(3)::before{
  transition: all 0.5s cubic-bezier(0,0,1,1);
  content: ' ';
  width: 1%;
  height: 100%;
  background-color: #ffda77;
  position: absolute;
  top: 0;
  left: 0;
}
.center .center_menu li:nth-child(3):hover::before{
  width: 100%;
  background-color: #ffda77;
}

.center .center_menu li:nth-child(4)::before{
  transition: all 0.5s cubic-bezier(0,0,1,1);
  content: ' ';
  width: 1%;
  height: 100%;
  background-color: #1bd1a5;
  position: absolute;
  top: 0;
  left: 0;
}
.center .center_menu li:nth-child(4):hover::before{
  width: 100%;
  background-color: #1bd1a5;
}

.top{
  width: 100%;
  height: auto;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
}

.top .el-avatar{
  width: 70px;
  height: 70px;
  border-radius: 50%;
}

.top .top_three ul{
  list-style: none;
  padding-left: 0;
}

.top .top_three ul li{
  display: inline-block;
  width: 25%;
  margin-right: 5px;
  margin-left: 5px;
}

.main_header{
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #e6e6e6;
  position: relative;
}
.main_header_left{
  position: absolute;
  left: 0;
  top: 0;
  display: inline-block;
}
.main_header_right{
  position: absolute;
  right: 0px;
  top: 5px;
  display: inline-block;
}
.main_header_right input{
  border-radius: 12px 0 0 12px;
  width: 190px;
  height: 20px;
  border-right: none;
  border-top: 2px solid #7397ab;
  border-left: 2px solid #7397ab;
  border-bottom: 2px solid #7397ab;
  outline: none;
  text-indent: 10px;
}
.main_header_right button{
  border-radius: 0 12px 12px 0;
  border-left: none;
  height: 26px;
  background-color: transparent;
  border-top: 2px solid #7397ab;
  border-right: 2px solid #7397ab;
  border-bottom: 2px solid #7397ab;
  color: #7397ab;
}
.main_header_right button:hover{
  cursor: pointer;
  background-color: #7397ab;
  color: white;
}

.main_body{
  padding-top: 10px;
}
</style>
