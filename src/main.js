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
 
const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$swal = swal;

app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
