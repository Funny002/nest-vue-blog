<template>
  <el-config-provider :locale="getLocale" size="small">
    <router-view/>
  </el-config-provider>
</template>

<script lang="ts" setup>
import zh_locale from 'element-plus/dist/locale/zh-cn.min.mjs';
import en_locale from 'element-plus/dist/locale/en.min.mjs';
import { useTheme } from '@stores/theme';
import 'element-plus/dist/index.css';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const theme = useTheme();
const { locale } = storeToRefs(theme);
const getLocale = computed(() => locale.value === 'zh' ? zh_locale : en_locale);
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

body {
  color: #999;
  background-color: #f6f8fa;
}

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
