<template>
  <a-menu mode="inline" :default-selected-keys="[selectedKey]" :default-open-keys="[openKey]">
    <template v-for="menu in menus">
      <template v-if="menu.children">
        <a-sub-menu :key="menu.key" :title="menu.title">
          <div v-for="subMenu in menu.children">
            <a-menu-item :key="subMenu.key">
              <router-link :to="subMenu.path">
                <a-icon :type="subMenu.icon" />
                <span>{{ subMenu.title }}</span>
              </router-link>
            </a-menu-item>
          </div>
        </a-sub-menu>
      </template>
      <template v-else>
        <a-menu-item :key="menu.key">
          <router-link :to="menu.path">
            <a-icon :type="menu.icon" />
            <span>{{ menu.title }}</span>
          </router-link>
        </a-menu-item>
      </template>
    </template>
  </a-menu>
</template>

<script setup lang="ts">
// import icon from '@ant-design/icons-vue';
interface Menu {
  key: string;
  title: string;
  icon: string;
  path: string;
  children?: Menu[];
}
const props = withDefaults(
  defineProps<{
    menus: PropType<Menu[]>,
    selectedKey: string,
    openKey:string
  }>(),
  {
    selectedKey:"",
    openKey:""
  }
);
let {menus,selectedKey,openKey} = toRefs(props)
</script>
