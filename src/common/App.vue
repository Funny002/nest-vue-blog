<template>
  <el-config-provider :locale="getLocale" size="small">
    <router-view/>
  </el-config-provider>
</template>

<script lang="ts" setup>
// @ts-ignore
import zh_locale from 'element-plus/dist/locale/zh-cn.min.js';
// @ts-ignore
import en_locale from 'element-plus/dist/locale/en.min.js';
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
  scrollbar-width: thin;
  scrollbar-color: #ddd #fff;

  &::-webkit-scrollbar {
    width: 9px;
    border-left: 0.5px solid #ddd;

    &-thumb {
      border-radius: 6px;
      background-color: #ddd;
    }
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

body {
  color: #999;
  background-color: #eef2f8;
}

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
