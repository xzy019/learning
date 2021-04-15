<template>
  <el-tabs :tab-position="tabPosition" style="height: 100%;">
    <el-tab-pane label="所有笔记">
      <Note />
    </el-tab-pane>
    <el-tab-pane label="前端">

    </el-tab-pane>
    <el-tab-pane label="后端">
      
    </el-tab-pane>
    <el-tab-pane label="大数据">
      
    </el-tab-pane>
    <el-tab-pane label="人工智能">
      
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import {defineComponent, ref, reactive, toRefs} from 'vue'
import Note from '@/components/Note.vue'
export default defineComponent({
  name: '',
  components: {
    Note
  },
  setup(props, ctx){
    let tabPosition = ref('left');
    return{
      tabPosition
    }
  }
})
</script>

<style scoped>

</style>