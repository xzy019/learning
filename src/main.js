import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import axios from 'axios';
import swal from 'sweetalert2';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import * as echarts from 'echarts'
import '@icon-park/vue-next/styles/index.css';
 
const app = createApp(App);

app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$swal = swal;
app.config.globalProperties.$echarts = echarts;



