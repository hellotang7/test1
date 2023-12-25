import { createRouter, createWebHashHistory } from 'vue-router';




const routes = [
  {
    name: 'notFound',
    path: '/:path(.*)+',
    redirect: '/login'
  },
  { path: '/', redirect: '/login' },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/view/Home/index.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    name: 'user',
    path: '/user',
    component: () => import('@/view/User/index.vue'),
    meta: {
      title: '个人中心'
    }
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/view/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    name: 'equipment',
    path: '/equipment',
    component: () => import('@/components/Tags/Equipment/index.vue'),
    meta: {
      title: '设备管理'
    }
  },
  {
    name: 'test',
    path: '/1',
    component: () => import('@/test.vue'),
    meta: {
      title: '试验'
    }
  },
  {
    name: 'title',
    path: '/2',
    component: () => import('@/components/Title.vue'),
    meta: {
      title: '试验'
    }
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});




router.beforeEach((to, from, next) => {
  const title = to?.meta?.title;
  if (title) {
    document.title = title as string;
  }
  next();
});

export default router;
