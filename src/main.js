import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'

// import VueLazyload
import VueLazyload from 'vue-lazyload'
// use options
Vue.use(VueLazyload, {
    preLoad: 1.3,
    loading: '../static/img/default.jpeg',
    error: '../static/img/default.jpeg',
    attempt: 1
})

/*路由模块*/
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import seller from './components/seller/seller'

/*加载所有css*/
import './common/stylus/index.styl'

/*引入自己写的全局函数*/
import util from './common/js/util'
Vue.prototype.util = util;

Vue.use(VueRouter)
Vue.use(VueResource)
/* eslint-disable no-new */
let app = Vue.extend(App)

let router = new VueRouter({
    linkActiveClass: 'active'
});

router.map({
    '/goods': {
      component: goods
    },

    '/ratings': {
        component: ratings
    },

    '/seller': {
        component: seller
    },
})
/*重定向到默认路由*/
router.redirect({
    '/': '/goods'
})
router.start(App,'#app')


