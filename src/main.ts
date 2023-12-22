import { createApp } from 'vue'
import App from './App.vue'
import 'vant/es/toast/style'
import router from './router'
import { createPinia } from 'pinia';

import "./assets/css/main.css";


const app = createApp(App)
const pinia = createPinia();
app.use(pinia)
app.use(router)
app.mount('#app')
