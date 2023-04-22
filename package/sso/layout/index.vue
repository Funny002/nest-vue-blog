<template>
  <layout-admin class="var-admin" :is-mini="data.isMini" :menu="data.menu">
    <template #header>
      <div class="var-admin__headerNav" @click="() => (data.isMini = !data.isMini)">
        <el-icon>
          <Expand/>
        </el-icon>
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>组 - 1</el-breadcrumb-item>
        <el-breadcrumb-item>菜单 - 1</el-breadcrumb-item>
      </el-breadcrumb>
      <span style="margin: 0 auto;"></span>
      <el-autocomplete :prefix-icon="Search" placeholder="菜单搜索" clearable/>
      <div class="var-admin__headerNav">
        <el-badge>
          <el-icon>
            <ChatDotSquare/>
          </el-icon>
        </el-badge>
      </div>
      <div class="var-admin__headerNav">
        <el-badge is-dot>
          <el-icon>
            <Bell/>
          </el-icon>
        </el-badge>
      </div>
      <el-popover>
        <template #reference>
          <el-avatar class="var-admin__userPopover" :size="30"/>
        </template>
        <div class="var-admin__user">
          <el-avatar class="var-admin__user--avatar"/>
          <div class="var-admin__user--body">
            <div class="var-admin__user--name">ReFunny</div>
          </div>
        </div>
        <el-divider style="margin: 10px 0 5px;"/>
        <div class="var-admin__user--item">
          <el-icon>
            <User/>
          </el-icon>
          <span>个人资料</span>
        </div>
        <div class="var-admin__user--item">
          <el-icon>
            <ChatDotSquare/>
          </el-icon>
          <span>我的消息</span>
        </div>
        <div class="var-admin__user--item">
          <el-icon>
            <SwitchButton/>
          </el-icon>
          <span>退出登录</span>
        </div>
      </el-popover>
    </template>
    <var-nav :data="data.nav.list" v-model="data.nav.active"/>
    <router-view/>
  </layout-admin>
</template>

<script lang="ts">export default { name: 'Admin' };</script>
<script lang="ts" setup>
import { Bell, ChatDotSquare, Expand, Files, Guide, House, Postcard, Search, Setting, SwitchButton, User } from '@element-plus/icons-vue';
import LayoutAdmin from '@/layoutAdmin/index.vue';
import VarNav from '@models/VarNav/index.vue';
import { reactive, shallowRef } from 'vue';

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
    { icon: shallowRef(House), name: 'Home', label: '首页' },
    { icon: shallowRef(User), name: 'User', label: '用户' },
    { icon: shallowRef(Files), name: 'Files', label: '文件' },
    { icon: shallowRef(Guide), name: 'Router', label: '路由' },
    { icon: shallowRef(Postcard), name: 'Setting', label: '权限' },
    { icon: shallowRef(Setting), name: 'Setting', label: '设置' },
  ],
});

</script>

<style lang="scss" src="./src/style.scss"/>
