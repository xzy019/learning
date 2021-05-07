<template>
  <router-view/>
</template>

<script>
import {defineComponent, ref, reactive, toRefs, getCurrentInstance} from 'vue'
export default defineComponent({
  components: {
  },
  setup(props){
    return{
      
    }
  },
})
</script>

<style scoped>
#nav{
  color: v-bind(color_one);
}
</style>
