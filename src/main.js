import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import * as echarts from 'echarts'
import '@icon-park/vue-next/styles/index.css';
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-python';

VueMarkdownEditor.use(vuepressTheme,createLineNumbertPlugin());
 
const app = createApp(App);

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$echarts = echarts;

app.use(ElementPlus);
app.use(store);
app.use(router);
app.use(VueMarkdownEditor);
app.mount('#app')





