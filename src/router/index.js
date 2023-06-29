//引入路由对象
import { createRouter, createWebHistory } from 'vue-router'

// 每个路由都需要映射到一个组件。
const routes = [
    {
        path: '/',
        component: () => import('@/view/Home.vue'),
    },
    {
        path: '/login',
        component: () => import('@/view/Login.vue'),
    },
    {
        path: '/register',
        component: () => import('@/view/Register.vue'),
    },
    {
        path: '/home',
        component: () => import('@/view/Home.vue'),
    },
    {
        path: '/userinfo',
        component: () => import('@/view/UserInfo.vue'),
    },
    {
        path: '/upload',
        component: () => import('@/view/Upload.vue'),
    },
    {
        path: '/imgshow',
        component: () => import('@/view/ImgShow.vue'),
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})


// 添加路由守卫，验证token是否存在，如果不存在，跳转到登录页面

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (to.path === '/login' || to.path === '/register' || to.path === '/') {
        next()
    } else {
        token ? next() : next('/login')
    }
})


//导出router
export default router
