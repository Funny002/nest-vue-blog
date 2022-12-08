<template>
  <admin-layout :menu-list="data.menuList" v-model:menu-value="data.menuValue" :user="data.user" :breadcrumb="data.breadcrumb">
    <router-view :key="$route.fullPath"/>
  </admin-layout>
</template>

<script lang="ts">export default { name: 'Layout' };</script>

<script lang="ts" setup>
import { ArrowSquareDown20Filled } from '@vicons/fluent';
import AdminLayout from '@models/AdminLayout/index.vue';
import { onMounted, reactive } from 'vue';

const data = reactive({
  menuList: [],
  menuValue: '',
  user: { avatar: '', note: 'note', name: 'ReFunny' },
  breadcrumb: ['首页',
    {
      label: '测试obj',
      options: [
        { label: '测试 - 1', key: 'sss - 1' },
        { label: '测试 - 2', key: 'sss - 2' },
      ],
    },
  ],
});

onMounted(() => {
  const menuOptions: any[] = [];
  for (let i = 0; i < 10; i++) {
    menuOptions.push({ label: '测试菜单 + ' + i, key: `test-${i}`, icon: ArrowSquareDown20Filled, children: [{ label: '子菜单', key: `${i}-1` }] });
  }
  data.menuList = menuOptions as any;
});
</script>
