<template>
  <a-menu mode="inline" :default-selected-keys="[selectedKey]" :default-open-keys="[openKey]">
    <!-- <template v-for="menu in menus">
      <template v-if="menu.children">
        <a-sub-menu :key="menu.key">
          <template #title>
            <span>
              <icon-font :type="menu.icon" />
              <span style="margin-left: 10px;">{{menu.title}}</span>
            </span>
          </template>
          <div v-for="subMenu in menu.children">
            <a-menu-item :key="subMenu.key">
              <router-link :to="subMenu.path">
                <icon-font :type="menu.icon" />
                <span>{{ subMenu.title }}</span>
              </router-link>
            </a-menu-item>
          </div>
        </a-sub-menu>
      </template>
      <template v-else>
        <a-menu-item :key="menu.key">
          <router-link :to="menu.path">
            <icon-font :type="menu.icon" />
            <span>{{ menu.title }}</span>
          </router-link>
        </a-menu-item>
      </template>
    </template> -->
    <MenuSubItem :menus="menus"></MenuSubItem>
  </a-menu>
</template>

<script setup lang="ts">
import MenuSubItem from './MenuItem.vue'
import {MenuItem} from '@/types/index'
const props = defineProps({
  openKey: {
    type: String,
    required: true
  },
  selectedKey: {
    type: String,
    required: true
  },
  menus: {
    type: Array as () => MenuItem[],
    required: true
  }
})
let {menus,selectedKey,openKey} = toRefs(props)
</script>
