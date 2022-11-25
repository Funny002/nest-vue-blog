<template>
  <n-config-provider v-bind="naiveUi">
    <router-view/>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { zhCN, dateZhCN, NConfigProvider, darkTheme } from 'naive-ui';
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
