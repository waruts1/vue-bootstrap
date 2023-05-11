import {createRouter, createWebHistory} from 'vue-router'
import Login from '@/views/Login'
import AnalyseSpeech from '@/components/AnalyseSpeech'
import Register from '@/views/Register'
import Expenses from '@/views/AddExpenses'
import Home from '@/views/Home'
import NotFound from '@/views/NotFound'
import Dashboard from '@/views/Dashboard'
import Savings from '@/views/Savings'
const routes =  [
    {
        path:'/',
        component:Home

    },
    {
        path:'/expenses',
        name:"Expenses",
        component:Expenses

    },
    {
        path:'/login',
        name:"Login",
        component:Login

    },
    {
        path:'/dashboard',
        name:"Dashboard",
        component:Dashboard

    },
    {
      path:'/register',
      name:"Register",
      component:Register

  },
    {
        path:'/savings',
        name:"Savings",
        component:Savings

    }, 
    {
        path:'/analyse-speeches',
        name:"AnalyseSpeech",
        component:AnalyseSpeech
    },  
    {
        path:'/NotFound',
        name:'NotFound',
        component: NotFound

    },  
    {
        path:'/:catchAll(.*)',
        redirect:"/NotFound"

    }, 

]

const router = createRouter({
  routes,
  history:createWebHistory(process.env.BASE_URL)
})

export default router