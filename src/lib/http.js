import axios from 'axios'
import { ElLoading } from 'element-plus';
import swal from './swal'
import {getCurrentInstance} from 'vue'


const instance = axios.create({
  baseURL:'http://localhost:5000/api/',
  headers:{ 'Authorization':'Bearer ' + sessionStorage.getItem('token') }
});

let loadingInstance

instance.interceptors.request.use(
  config => {
    loadingInstance = ElLoading.service();
    return config
  },
  error => {
    loadingInstance.close();
    swal.Error(error)
  }
 )
instance.interceptors.response.use(
  response => {
    loadingInstance.close();
    return response
}, 
error => {
  loadingInstance.close();
  swal.Error(error)
})

export default instance