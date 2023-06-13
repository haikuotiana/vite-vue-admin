import Layout from "@/layout/index.vue";
export const routes = [{
  path: '/login',
  name: 'Login',
  meta:{
    title:"登录"
  },
  component: () => import(/* webpackChunkName: "Login" */'@/views/login/index.vue')
},{
  path: '/',
  redirect:'/index',
  component: Layout,
  children:[{
    path: '/index',
    name: 'Index',
    meta:{
      title:"首页"
    },
    component: () => import(/* webpackChunkName: "Index" */'@/views/index/index.vue'),
  }]
},{
  path: '/sims',
  component: Layout,
  meta:{
    title:"销项管理"
  },
  children:[{
    path: '/sims/documentAdd',
    name: 'DocumentAdd',
    meta:{
      title:"单据新增"
    },
    children: [{
      path: '/sims/documentAdd/ducumentEnter',
      name: 'DucumentEnter',
      meta:{
        title:"单据录入"
      },
      component: () => import(/* webpackChunkName: "ducumentEnter" */'@/views/sims/documentAdd/ducumentEnter.vue'),
    },{
      path: '/sims/documentAdd/ducumentExport',
      name: 'DucumentExport',
      meta:{
        title:"单据导入"
      },
      component: () => import(/* webpackChunkName: "ducumentExport" */'@/views/sims/documentAdd/ducumentExport.vue'),
    },{
      path: '/sims/documentAdd/detailExport',
      name: 'DetailExport',
      meta:{
        title:"明细导入"
      },
      component: () => import(/* webpackChunkName: "detailExport" */'@/views/sims/documentAdd/detailExport.vue'),
    }]
  },{
    path: '/sims/documentManagement',
    name: 'DocumentManagement',
    meta:{
      title:"单据管理"
    },
    children: [{
      path: '/sims/documentManagement/djEdit',
      name: 'DjEdit',
      meta:{
        title:"单据修改"
      },
      component: () => import(/* webpackChunkName: "djEdit" */'@/views/sims/documentManagement/djEdit.vue'),
    },{
      path: '/sims/documentManagement/djMerge',
      name: 'DjMerge',
      meta:{
        title:"单据合并"
      },
      component: () => import(/* webpackChunkName: "djMerge" */'@/views/sims/documentManagement/djMerge.vue'),
    },{
      path: '/sims/documentManagement/djSplit',
      name: 'DjSplit',
      meta:{
        title:"单据拆分"
      },
      component: () => import(/* webpackChunkName: "djSplit" */'@/views/sims/documentManagement/djSplit.vue'),
    }]
  }]
}]
