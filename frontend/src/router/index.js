import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import EmployeeView from '@/views/EmployeeView.vue'
import PayrollView from '@/views/PayrollView.vue'
import Timeoff from '@/components/Timeoff.vue'
import PerformanceReview from '@/components/PerformanceReview.vue'


const routes = [
  
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path:'/employee',
    name: 'employee',
    component: EmployeeView
  },
  {
    path:'/payroll',
    name:'payroll',
    component: PayrollView
  },
  {
    path:'/performancereview',
    name:'performancereview',
    component: PerformanceReview
  },
  {
    path:'/Timeoff',
    name:'timeoff',
    component: Timeoff
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
