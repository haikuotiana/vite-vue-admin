<template>
  <a-layout class="wrap-box">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <sideBarMenu theme="dark" mode="inline" :menus="routes" openKey="1" selectedKey="/index"></sideBarMenu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header-style">
        <div class="menu_box">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
          <a-breadcrumb>
            <a-breadcrumb-item v-for="(item,i) in route.matched" :key="i">{{item.meta.title}}</a-breadcrumb-item>
          </a-breadcrumb>
        </div>
        <div class="user_info">
          <a-dropdown placement="bottom">
            <!-- <a class="ant-dropdown-link" @click.prevent>
             
            </a> -->
            <a-avatar @click.prevent :size="{ xs: 24, sm: 32, md: 40, lg: 40, xl: 40, xxl: 40 }">
              <template #icon>
                <AntDesignOutlined />
              </template>
            </a-avatar>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;">个人信息</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;" @click="loginOut">退出登录</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '10px 10px', padding: '15px', background: '#fff', minHeight: '280px',overflowY: 'auto' }"
      >
        <!--Page Content -->
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup lang="ts">
  import { 
    MenuUnfoldOutlined, 
    MenuFoldOutlined,
    AntDesignOutlined
  } from '@ant-design/icons-vue';
  import sideBarMenu from '@/layout/sideBarMenu/index.vue'
  import {routeList} from '@/router/routeOptions'
  let collapsed = ref<boolean>(false);
  let routes = reactive(routeList)
  const route = useRoute();
  const router = useRouter();
  const loginOut = ()=>{
    router.push({path:'/login'})
  }
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
.header-style{
  background: #fff; 
  padding: 0px 40px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px !important;
  line-height: 50px !important;
  box-sizing: border-box;
}
.header-style .menu_box{
  display: flex;
  align-items: center;
}
.header-style .trigger{
  margin-top: 5px;
}
</style>
