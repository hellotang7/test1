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
  },
  {
    name: 'user',
    path: '/user',
    component: () => import('@/view/User/index.vue'),

  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/view/login/index.vue'),
  },
  {
    name: 'equipment',
    path: '/equipment',
    component: () => import('@/components/Tags/Equipment/index.vue'),

  },
  {
    name: 'addEdit',
    path: '/addEdit',
    component: () => import('@/components/Tags/Equipment/EquipmentAddEdit.vue'),
  },
  {
    name: 'live',
    path: '/live',
    component: () => import('@/components/Tags/Equipment/EzvizLive.vue'),
  },
  {
    name: 'test',
    path: '/1',
    component: () => import('@/test.vue'),
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});




// router.beforeEach((to, from, next) => {
//   const title = to?.meta?.title;
//   if (title) {
//     document.title = title as string;
//   }
//   next();
// });

export default router;
