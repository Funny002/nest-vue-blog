<template>
  <layout-admin class="var-admin" :is-mini="data.isMini" :menu="data.menu">
    <template #header>
      <div class="var-admin__header-icon" @click="() => (data.isMini = !data.isMini)">
        <el-icon>
          <Expand/>
        </el-icon>
      </div>
      <!--      <el-switch v-model="data.isMini"></el-switch>-->
    </template>
    <var-nav :data="data.nav.list" v-model="data.nav.active"/>
    <router-view/>
  </layout-admin>
</template>

<script lang="ts">export default { name: 'Admin' };</script>
<script lang="ts" setup>
import { Expand, House, Setting } from '@element-plus/icons-vue';
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
  menu: [
    { icon: House, name: 'Home', label: '首页' },
    { name: 'Home', label: '路由' },
    { name: 'Home', label: '设置' },
    { icon: Setting, name: 'Home', label: '设置' },
  ],
});
</script>

<style lang="scss" src="./src/style.scss"/>
