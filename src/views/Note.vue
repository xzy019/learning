<template>
  <el-tabs :tab-position="tabPosition" style="height: 100%;">
    <el-tab-pane label="所有笔记">
      <Note />
    </el-tab-pane>
    <el-tab-pane label="前端">
      <qd-note />
    </el-tab-pane>
    <el-tab-pane label="后端">
      <hd-note></hd-note>
    </el-tab-pane>
    <el-tab-pane label="大数据">
      <dsj-note></dsj-note>
    </el-tab-pane>
    <el-tab-pane label="人工智能">
      <ai-note></ai-note>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import {defineComponent, ref, reactive, toRefs} from 'vue'
import Note from '@/components/Note.vue'
import hdNote from '@/components/hdNote.vue'
import QdNote from '@/components/qdNote.vue'
import DsjNote from '@/components/dsjNote.vue'
import AiNote from '@/components/aiNote.vue'
export default defineComponent({
  name: '',
  components: {
    Note,
    hdNote,
    QdNote,
    DsjNote,
    AiNote
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