import Layout from "@/layout/index.vue";
export const routes = [{
  path: '/login',
  name: 'Login',
  component: () => import(/* webpackChunkName: "Login" */'@/views/login/index.vue')
},{
  path: '/',
  redirect:'/index',
  component: Layout,
  children:[{
    path: '/index',
    name: 'Index',
    component: () => import(/* webpackChunkName: "Index" */'@/views/index/index.vue'),
  }]
},{
  path: '/menu1',
  component: Layout,
  children:[{
    path: '/menu1/sub-menu1',
    name: 'SubMenu1',
    component: () => import(/* webpackChunkName: "SubMenu1" */'@/views/menu1/index.vue'),
  }]
}]
