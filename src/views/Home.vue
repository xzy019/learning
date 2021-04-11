<template>
  <el-container>
    <el-aside :width="awidth">Aside</el-aside>
    <el-main>
      <button @click="test()">test</button>
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import {defineComponent, ref} from 'vue'
export default defineComponent({
  name: 'Home',
  components: {
  },
  setup(){
    let awidth = ref("200px")
    let test = ()=>{
      if(awidth.value==="200px"){
        awidth.value = "0px";
      }else awidth.value = "200px";
    }
    return{
      awidth,
      test
    }
  }
})
</script>

<style scoped>
.el-aside{
  border: 1px solid black;
}
</style>
