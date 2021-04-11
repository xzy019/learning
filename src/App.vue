<template>
  <router-view/>
</template>

<script>
import {defineComponent, ref, reactive, toRefs} from 'vue'
export default defineComponent({
  components: {

  },
  setup(props, ctx){
    let color_one = ref('#2E4E7E');
    let color_two = ref('#284090');
    let color_three = ref('#184088');
    let color_red = ref('#E01008');
    return{
      color_one,
      color_two,
      color_three,
      color_red
    }
  }
})
</script>

<style scoped>
#nav{
  color: v-bind(color_one);
}
</style>
