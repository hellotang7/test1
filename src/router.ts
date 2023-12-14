import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  // {
  //   name: 'notFound',
  //   path: '/:path(.*)+',
  //   redirect: '/home'
  // },
  { path: '/', redirect: '/home' },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/view/Home/index.vue'),
    meta: {
      title: '首页'
    },
    children: [
      // { path: '', redirect: '/home/equipment' },
      {
        path: 'equipment',
        name: 'equipment',
        component: () => import('@/components/Tags/Equipment/index.vue'),
        meta: {
          title: '设备管理'
        }
      }
    ]
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
