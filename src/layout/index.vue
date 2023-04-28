<template>
  <a-layout class="wrap-box">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <sideBarMenu theme="dark" mode="inline" :menus="routes" openKey="1" selectedKey="/index"></sideBarMenu>
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
        :style="{ margin: '10px 10px', padding: '24px', background: '#fff', minHeight: '280px' }"
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
    MenuFoldOutlined 
  } from '@ant-design/icons-vue';
  import sideBarMenu from '@/layout/sideBarMenu/index.vue'
  import {routeList} from '@/router/routeOptions'
  let collapsed = ref<boolean>(false);
  let routes = reactive(routeList)
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
