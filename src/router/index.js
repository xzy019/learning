import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    children:[
      {
        path: '/list',
        name: 'List',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "list" */ '../views/List.vue')
      },
      {
        path: '/study',
        name: 'Study',
        component: () => import(/* webpackChunkName: "study" */ '../views/Study.vue')
      },
      {
        path: '/self',
        name: 'SelfInfo',
        component: () => import(/* webpackChunkName: "self" */ '../views/SelfInfo.vue')
      },
      {
        path: '/note',
        name: 'Note',
        component: () => import(/* webpackChunkName: "note" */ '../views/Note.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'index',
    redirect: '/login'
  },
  {
    path:'/login',
    name:'Login',
    component: () => import(/* webpackChunkName: "login"*/ '../views/LoginRegister.vue')
  },
  {
    path:'/:catchAll(.*)',
    name:'/404',
    component: () => import(/* webpackChunkName: "404"*/ '../views/404.vue')
  },
  {
    path: '/edit',
    name: 'Edit',
    component: () => import(/* webpackChunkName: "edit" */ '../views/Edit.vue'),
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
