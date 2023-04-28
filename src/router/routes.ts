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
  path: '/sims',
  component: Layout,
  children:[{
    path: '/sims/documentAdd',
    name: 'DocumentAdd',
    children: [{
      path: '/sims/documentAdd/ducumentEnter',
      name: 'DucumentEnter',
      component: () => import(/* webpackChunkName: "ducumentEnter" */'@/views/sims/documentAdd/ducumentEnter.vue'),
    },{
      path: '/sims/documentAdd/ducumentExport',
      name: 'DucumentExport',
      component: () => import(/* webpackChunkName: "ducumentExport" */'@/views/sims/documentAdd/ducumentExport.vue'),
    },{
      path: '/sims/documentAdd/detailExport',
      name: 'DetailExport',
      component: () => import(/* webpackChunkName: "detailExport" */'@/views/sims/documentAdd/detailExport.vue'),
    }]
  }]
}]
