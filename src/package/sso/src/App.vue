<template>
  <n-config-provider v-bind="naiveUi">
    <var-layout v-if="$route.fullPath.indexOf('/sign') !== 0"/>
    <router-view v-else :Key="$route.fullPath"/>
  </n-config-provider>
</template>

<script lang="ts">export default { name: 'App' };</script>

<script lang="ts" setup>
import { zhCN, dateZhCN, NConfigProvider, darkTheme } from 'naive-ui';
import VarLayout from '@sso/Layout/index.vue';
import { reactive } from 'vue';

const naiveUi = reactive<{ [k: string]: any }>({
  // theme:darkTheme
  locale: zhCN,
  abstract: true,
  theme: undefined,
  dateLocale: dateZhCN,
  themeOverrides: {},
});
</script>

<style lang="scss" src="@scss/baseStyle.scss"/>
