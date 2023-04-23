<template>
    <template v-for="menu in menus">
      <!-- 含有下级children 为目录-->
      <template v-if="menu.children">
        <a-sub-menu :key="menu.key">
          <template #title>
            <span>
              <icon-font :type="menu.icon" />
              <span style="margin-left: 10px;">{{menu.title}}</span>
            </span>
          </template>
          <MenuSubItem :menus="menu.children"></MenuSubItem>
        </a-sub-menu>
      </template>
      <!-- 没有下级children 为菜单-->
      <template v-else>
        <a-menu-item :key="menu.key">
          <router-link :to="menu.path" tag="span">
            <icon-font :type="menu.icon" />
            <span>{{ menu.title }}</span>
          </router-link>
        </a-menu-item>
      </template>
    </template>
</template>
<script setup lang="ts">
import MenuSubItem from './MenuItem.vue'
import {MenuItem} from '@/types/index'
import { createFromIconfontCN } from '@ant-design/icons-vue'
// 创建 IconFont 组件
const IconFont = createFromIconfontCN({ 
  scriptUrl:'//at.alicdn.com/t/c/font_4033022_a1udwwu360o.js' // iconfont图标库地址【目前使用的在线地址,后续使用本地静态文件】
})
const props = defineProps({
  menus: {
    type: Array as () => MenuItem[],
    required: true
  }
})
let {menus} = toRefs(props)
</script>
