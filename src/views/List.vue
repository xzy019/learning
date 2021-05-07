<template>
  <el-tabs type="border-card" :tab-position="tabPosition" style="height: 80vh">
    <el-tab-pane label="全部">
      <el-button @click="dialog = true" type="warning" icon="el-icon-plus" circle></el-button>
      <List/>
    </el-tab-pane>
    <el-tab-pane label="未完成">
      <list-complete/>
    </el-tab-pane>
    <el-tab-pane label="已完成">
      <list-completed/>
    </el-tab-pane>
    <el-tab-pane label="优先级为3">
      <list-3/>
    </el-tab-pane>
    <el-tab-pane label="优先级为2">
      <list-2/>
    </el-tab-pane>
    <el-tab-pane label="优先级为1">
      <list-1/>
    </el-tab-pane>
    <el-tab-pane label="优先级为0">
      <list-0/>
    </el-tab-pane>
  </el-tabs>

  <el-drawer title="新增计划" size="30%"
  :before-close="handleClose"
  v-model="dialog"
  direction="rtl"
  custom-class="demo-drawer"
  ref="list">
    <div class="demo-drawer__content" style="padding:12px">
      <el-form ref="form" :model="listone" label-width="90px">
        <el-form-item label="任务标题">
          <el-input v-model="listone.addtitle" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="任务优先级">
          <el-select v-model="listone.addlevel" placeholder="请选择优先级">
            <el-option label="0" value="0"></el-option>
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer" style="padding-left:90px">
        <el-button @click="cancelForm()">取 消</el-button>
        <el-button
          type="primary" @click="submit"
          >确 定</el-button
        >
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from "vue";
import List from "@/components/list.vue";
import ListComplete from "@/components/listComplete.vue"
import ListCompleted from "@/components/listCompleted.vue"
import List0 from "@/components/list0.vue"
import List1 from "@/components/list1.vue"
import List2 from "@/components/list2.vue"
import List3 from "@/components/list3.vue"
import ListAPI from '../lib/API/ListAPI'
import swal from '../lib/swal'
export default defineComponent({
  name: "",
  components: {
    List,
    ListComplete,
    ListCompleted,
    List0,
    List1,
    List2,
    List3,
  },
  setup(props, ctx) {
    let list = reactive([]);
    let timer = ref(null);
    let loading = ref(false);
    let dialog = ref(false);
    let cancelForm = ()=> {
      loading.value = false;
      dialog.value = false;
      clearTimeout(timer.value);
    }
    let listone = reactive({
      addtitle:'',
      addlevel: 0
    });
    let submit = ()=>{
      ListAPI.createList(listone.addtitle, listone.addlevel).then(res=>{
        console.log(res);
        if(res.data.code === 200){
          swal.Success('创建成功');
          dialog.value = false;
           location. reload()
        }
      })
    }
    return {
      tabPosition: ref("left"),
      cancelForm,
      dialog,
      loading,
      listone,
      timer,
      submit
    };
  },
});
</script>

<style scoped>
</style>