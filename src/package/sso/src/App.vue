<template>
  <n-config-provider abstract :locale="zhCN" :date-locale="dateZhCN">
    <router-view/>
  </n-config-provider>
</template>

<script lang="ts">
import { zhCN, dateZhCN, NConfigProvider } from 'naive-ui';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: { NConfigProvider },
  setup() {
    return { zhCN, dateZhCN };
  },
});
</script>
