<template>
  <a-layout class="wrap-box">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <M.sideBarMenu theme="dark" mode="inline" :menus="routes" openKey="1" selectedKey="/index"></M.sideBarMenu>
      <!-- <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" :style="{ lineHeight: '64px' }">
        <a-menu-item key="1">
          <pie-chart-outlined />
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <desktop-outlined />
          <span>Option 2</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              <span>User</span>
            </span>
          </template>
          <a-menu-item key="3">Tom</a-menu-item>
          <a-menu-item key="4">Bill</a-menu-item>
          <a-menu-item key="5">Alex</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <team-outlined />
              <span>Team</span>
            </span>
          </template>
          <a-menu-item key="6">Team 1</a-menu-item>
          <a-menu-item key="8">Team 2</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9">
          <file-outlined />
          <span>File</span>
        </a-menu-item>
      </a-menu> -->
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view />
        <!-- Content -->
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
  import { 
    // PieChartOutlined,
    // DesktopOutlined,
    // UserOutlined,
    // TeamOutlined,
    // FileOutlined, 
    MenuUnfoldOutlined, 
    MenuFoldOutlined 
  } from '@ant-design/icons-vue';
  import sideBarMenu from '@/layout/sideBarMenu/index.vue'
  const M = shallowReactive({
    sideBarMenu
  })
  // let selectedKeys = ref<string[]>(['1']);
  let collapsed = ref<boolean>(false);
  let routes = reactive([{
    title:"首页",
    name:"Index",
    path:"/index",
    key:'1',
    icon:""
  },{
    title:"菜单1",
    name:"Menu1",
    path:"/menu1",
    icon:"",
    key:'2',
    children:[{
      title:"子菜单1",
      name:"SubMenu1",
      path:"/menu1/sub-menu1",
      key:'3',
      icon:""
    }]
  }])
</script>
<style scoped>
.wrap-box{
  height: 100%;
}
.wrap-box .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.wrap-box .trigger:hover {
  color: #1890ff;
}

.wrap-box .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
