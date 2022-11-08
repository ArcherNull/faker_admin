/*
 * @Author: Null
 * @Date: 2021-11-08 09:13:34
 * @Description: 路由
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import i18n from '@/i18n/index.js'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import store from '@/store/index'

// 工具集
import util from '@/libs/util.js'

// 路由数据
import routes from './routers'

// 引入页面锚点方法
import { jumpPageAnchor } from '@/common/commFun.js'

// 解决点击相同路由的时候，路由报错的问题
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return VueRouterPush.call(this, location).catch((err) => err)
}
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return VueRouterReplace.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  mode: 'hash', // 默认值: "hash" (浏览器环境) | "abstract" (Node.js 环境);可选值: "hash" | "history" | "abstract"
  routes
})

// 导航前守卫
router.beforeEach(async (to, from, next) => {
  // 进度条
  NProgress.start()
  // 确认已经加载多标签页数据
  await store.dispatch('setting/tagViews/isLoaded')

  // 验证当前路由所有的匹配中是否需要有登录验证的
  if (to.matched.some((r) => r.meta.auth)) {
    // 这里暂时将cookie里是否存有token作为验证是否登录的条件
    // 请根据自身业务需要修改
    const token = util.cookies.get('token')
    if (token && token !== 'undefined') {
      next()
    } else {
      // 没有登录的时候跳转到登录界面
      // 携带上登陆成功之后需要跳转的页面完整路径
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
      NProgress.done()
    }
  } else {
    // 不需要身份校验 直接通过12
    next()
  }
})

router.afterEach(async (to, from) => {
  // 多页控制 打开新的页面
  store.dispatch('setting/tagViews/open', to)
  // 更改标题
  console.log(' t(to.path)=========', i18n.t(to.path, i18n.locale))

  const { anchor } = to.params
  if (anchor) {
    jumpPageAnchor(to.path, anchor)
  } else {
    const dom = document.getElementById('layout-main-container')
    console.log('dom==============>', dom)
    // dom.scrollTo(0, 0)
  }

  util.title(to.meta.title)
  // 进度条
  NProgress.done()
  console.log('this=========>', this)
})

export default router
