import axios from 'axios';
import {useAuthStore} from '@/stores/authStore';
// import {Message} from 'view-ui-plus';
import router from '@/router';
import { closeToast, showFailToast, showLoadingToast } from 'vant';

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 30000
});


// 请求拦截器
service.interceptors.request.use(
  function (config) {
      // 在发送请求之前做些什么
      const token = useAuthStore().token || localStorage.getItem('token');
      if (token) {
          config.headers!.Authorization = token;
      }



      return config;
  },
  function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
      // 在收到响应后可以执行的逻辑，如处理数据
      if (response.data.code === 401) {
          showFailToast(response.data.msg);
          router.push({ name: 'login' });
      }
      return response;
  },
  (error) => {
      // 处理响应错误
      showFailToast(error.data.msg);
      // 在此根据需要执行其他逻辑
      return Promise.reject(error);
  }
);




export default service;
