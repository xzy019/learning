<template>
  <el-tabs v-model="activeName" type="card" tab-position="left">
    <el-tab-pane label="个人信息" name="first">
      <div class="selflist">
        <h1 class="selflist_title">个人信息</h1>
        <ul v-show="!edit" @mouseover="showedit()" @mouseout="hiddenedit()">
          <Button
            :icon="'fa fa-edit'"
            :bcolor="'#409eff'"
            v-show="btnedit"
            style="position: absolute; top: 0; right: 0"
            @click="edit = true"
          ></Button>
          <li>
            <div>用户昵称:</div>
            <div>{{ self.nickname }}</div>
          </li>
          <li>
            <div>性别:</div>
            <div>{{ self.sex }}</div>
          </li>
          <li>
            <div>电话号码:</div>
            <div>{{ self.telnumber }}</div>
          </li>
        </ul>

        <el-form
          v-show="edit"
          :label-position="'right'"
          label-width="80px"
          :model="self"
          style="width: 30vw; margin: 16px"
        >
          <el-form-item label="用户昵称">
            <el-input v-model="self.nickname"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="self.sex"></el-input>
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input v-model="self.telnumber"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="edit = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-tab-pane>
    <el-tab-pane label="个人笔记" name="second">
      <SelfNote />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from "vue";
import Button from "@/components/Button.vue";
import SelfNote from "@/components/selfNote.vue";
export default defineComponent({
  name: "",
  components: {
    Button,
    SelfNote
  },
  setup(props, ctx) {
    let self = reactive({
      nickname: "星光",
      sex: "男",
      telnumber: "12345678910",
    });
    let edit = ref(false);
    let btnedit = ref(false);
    let showedit = () => {
      btnedit.value = true;
    };
    let hiddenedit = () => {
      btnedit.value = false;
    };
    return {
      self,
      edit,
      btnedit,
      showedit,
      hiddenedit,
      activeName: ref('first')
    };
  },
});
</script>

<style scoped>
.selflist {
  width: 40vw;
  height: auto;
  border: 1px solid #e6e6e6;
}
.selflist h1 {
  margin: 12px;
  padding-bottom: 5px;
}
.selflist ul {
  list-style: none;
  padding: 0;
  margin: 16px;
  position: relative;
}
.selflist ul:hover {
  background-color: #f8f8f8;
  cursor: pointer;
}
.selflist ul li {
  height: 40px;
  line-height: 40px;
}
.selflist ul li div {
  display: inline-block;
}
.selflist ul li div:first-child {
  width: 20%;
  text-align: right;
  margin-right: 5px;
}
.selflist_title {
  border-bottom: 1px solid #e6e6e6;
}
</style>