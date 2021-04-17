<template>
<ul>
  <li
  v-for="(item,index) of list"
  :key="index"
  >
    <el-checkbox v-model="item.complete">{{item.title}}</el-checkbox>
  </li>
</ul>
</template>

<script>
import {defineComponent, ref, reactive, toRefs} from 'vue'
export default defineComponent({
  name: '',
  components: {

  },
  setup(props, ctx){
    let list = reactive([
      {
        ID:0,
        title:'吃饭',
        level: 0,
        complete: Boolean(0),
        writerID: 0
      },
      {
        ID:1,
        title:'吃饭',
        level: 0,
        complete: Boolean(1),
        writerID: 0
      }
    ]);
    return{
      list,
    }
  }
})
</script>

<style scoped>
ul,li{
  list-style: none;
  font-size: 24px;
}
</style>