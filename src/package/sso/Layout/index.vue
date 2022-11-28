<template>
  <admin-layout>
    <template #header>
      header
    </template>
    <template #footer>
      footer
    </template>
    <template v-slot:side="{hasMini}">
      <n-scrollbar>
        <n-menu
          :collapsed="hasMini"
          :collapsed-width="60"
          :collapsed-icon-size="30"
          :options="data.menu.options"
          v-model:value="data.menu.value"
        />
      </n-scrollbar>
    </template>
    <router-view :key="$route.fullPath"/>
  </admin-layout>
</template>

<script lang="ts">export default { name: 'Layout' };</script>

<script lang="ts" setup>
import { ArrowSquareDown20Filled } from '@vicons/fluent';
import AdminLayout from '@models/AdminLayout/index.vue';
import { onMounted, reactive, Component, h } from 'vue';
import { MenuOption, NIcon } from 'naive-ui';

interface State {
  menu: {
    value: string;
    options: MenuOption[];
  };
}

const data = reactive<State>({
  menu: {
    value: '',
    options: [],
  },
});

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

onMounted(() => {
  const menuOptions: MenuOption[] = [];
  for (let i = 0; i < 10; i++) {
    menuOptions.push({ label: '测试菜单 + ' + i, key: `test-${i}`, icon: renderIcon(ArrowSquareDown20Filled), children: [{ label: '子菜单', key: `${i}-1` }] });
  }
  data.menu.options = menuOptions as any;
});
</script>
