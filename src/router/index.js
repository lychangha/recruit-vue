import {createRouter, createWebHistory} from 'vue-router'
import register from "../views/register"
import login from "../views/login"
import index from "../views/index"
import details from "../views/details"
import resume from "../views/resume"
import collection from "../views/collection"
import delivery from "../views/delivery"
import personal from "../views/personal"
import userInfo from "../views/personal/userInfo"
import settings from "../views/personal/settings"
import jobManage from "../views/jobManage"
import processFlow from "../views/processFlow"
import account from "../views/account"
import hrInfo from "../views/account/hrInfo"
import pwdSettings from "../views/account/pwdSettings"
import companyInfo from "../views/account/companyInfo"
import adminLogin from "../views/admin/login"
import adminMain from  "../views/admin/main"
import article from "../views/admin/article"
import classification from "../views/admin/classification"
import userAccount from "../views/admin/userAccount"
import hrAccount from "../views/admin/hrAccount"
import information from "../views/information"
import articleDetails from "../views/articleDetails"
import searchPosition from "../views/searchPosition"


const routes = [
    {
        path: '/register',
        name: 'register',
        component: register
    }
    , {
        path: '/login',
        name: 'login',
        component: login
    }
    , {
        path: '/index',
        name: 'index',
        component: index
    }
    , {
        path: '/details',
        name: 'details',
        component: details
    }
    , {
        path: '/resume',
        name: 'resume',
        component: resume
    }
    , {
        path: '/collection',
        name: 'collection',
        component: collection
    }
    , {
        path: '/delivery',
        name: 'delivery',
        component: delivery
    }
    , {
        path: '/personal',
        name: 'personal',
        component: personal,
        redirect: '/userInfo',
        children: [
            {path: '/userInfo', name: 'userInfo', component: userInfo},
            {path: '/settings', name: 'settings', component: settings}
        ]
    }
    , {
        path: '/jobManage',
        name: 'jobManage',
        component: jobManage
    }
    , {
        path: '/processFlow',
        name: 'processFlow',
        component: processFlow
    }
    , {
        path: '/account',
        name: 'account',
        component: account,
        redirect: '/hrInfo',
        children: [
            {path: '/hrInfo', name: 'hrInfo', component: hrInfo},
            {path: '/pwdSettings', name: 'pwdSettings', component: pwdSettings},
            {path: '/companyInfo', name: 'companyInfo', component: companyInfo}
        ]
    }
    , {
        path: '/admin/login',
        name: 'adminLogin',
        component: adminLogin
    }
    , {
        path: '/admin/main',
        name: 'main',
        component: adminMain,
        redirect: '/userAccount',
        children: [
            {path: '/userAccount', name: 'userAccount', component: userAccount},
            {path: '/hrAccount', name: 'hrAccount', component: hrAccount},
            {path: '/article', name: 'article', component: article},
            {path: '/classification', name: 'classification', component: classification}
        ]
    }
    , {
        path: '/information',
        name: 'information',
        component: information
    }
    , {
        path: '/articleDetails',
        name: 'articleDetails',
        component: articleDetails
    }
    , {
        path: '/searchPosition',
        name: 'searchPosition',
        component: searchPosition
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
