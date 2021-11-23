// default
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


// Pages
import Home from '@/pages/Home'
import NotFound from '@/pages/404.vue'
import Notify from '@/pages/NotifyPage'

//Routering
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/notify',
            name: 'notify',
            component: Notify
        },
        {
            path: '*',
            name: 'notFound',
            component: NotFound
        },
    ]
})