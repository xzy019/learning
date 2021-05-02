<template>
 <button @click="success()">点击</button>
 <button @click="del()">点击</button>
 <button @click="err()">点击</button>
</template>

<script>
import {defineComponent, ref, reactive, toRefs} from 'vue'
import swal from 'sweetalert';
export default defineComponent({
  name: '',
  components: {

  },
  setup(props, ctx){
    let del = ()=>{
      swal({
        icon: "error",
        text: "确定删除吗？",
        buttons: {
          cancel: {
            text: "取消",
            value: false,
            visible: true,
            className: "",
            closeModal: true,
          },
          confirm: {
            text: "确定",
            value: true,
            visible: true,
            className: "",
            closeModal: true,
          },
        },
        dangerMode: true,
        closeOnEsc: false,
        closeOnClickOutside: false,
        className: "swal-footer",
      }).then((res) => {
        try {
          //判断 是否 点击的 确定按钮
          if (res) {
            swal({
              icon: "success",
              text: "删除成功",
            });
            console.log(row.Id);
            this.reload();
          } else {
            swal.close();
          }
        } catch (e) {
          alert(e);
        }
      });
    };
    let success = ()=>{
      swal({
        icon: "success",
        text: "创建成功",
      });
    }
    let err = ()=>{
      swal({
        icon: "warning",
        text: "错误提示",
      });
    }
    return{
      del,
      success,
      err
    }
  }
})
</script>

<style scoped>

</style>