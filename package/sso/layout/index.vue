<template>
  <layout-admin class="var-admin" :is-mini="data.isMini">
    <var-nav :data="data.nav.list" v-model="data.nav.active"/>
    <el-switch v-model="data.isMini"></el-switch>
    <router-view/>
  </layout-admin>
</template>

<script lang="ts">export default { name: 'Admin' };</script>
<script lang="ts" setup>
import LayoutAdmin from '@/layoutAdmin/index.vue';
import VarNav from '@models/VarNav/index.vue';
import { reactive } from 'vue';

const data = reactive<any>({
  isMini: false,
  nav: {
    active: 'home',
    list: [
      { label: '首页', name: 'home', hasClose: false },
      { label: '首页', name: 'huasji' },
    ],
  },
});
</script>

<style lang="scss" src="./src/style.scss"/>
