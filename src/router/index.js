import Vue from 'vue'
import VueRouter from 'vue-router'
import Chat from '@/components/Chat';
import Auth from '@/components/Auth';
// import Login from '@/components/Login';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Chat',
    component: Chat,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: Login
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
