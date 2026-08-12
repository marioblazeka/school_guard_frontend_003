import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home'
import Login from '../views/Login'
import Signup from '../views/Signup'
import ForgotPassword from '../views/ForgotPassword'
import UvjetiKoristenja from '../views/UvjetiKoristenja'
import PravilaPrivatnosti from '../views/PravilaPrivatnosti'
import Dashboard from '../views/Dashboard'

Vue.use(VueRouter)
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/forgotpassword', name: 'ForgotPassword', component: ForgotPassword },
  { path: '/uvjetikoristenja', name: 'UvjetiKoristenja', component: UvjetiKoristenja },
  { path: '/pravilaprivatnosti', name: 'PravilaPrivatnosti', component: PravilaPrivatnosti },
  // 2. Registracija Dashboard rute
  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    component: Dashboard 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router