<template>
  <div class="admin-layout__sidebar">
    <div class="admin-layout__sidebar--logo">
      <img :src="LogoImage" alt="logo">
    </div>
    <app-layout-menu ref="appMenu" :collapse="menu.collapse" class="admin-layout__menu" properClass="admin-layout__menu--item" :data="menu.list" @click="appMenuClick"/>
  </div>

  <div class="admin-layout__content">
    <div class="admin-layout__nav">
      <header class="admin-layout__header">
        <el-icon class="admin-layout__header--btn" @click="onMenuCollapse" :style="{transform: `rotate(${!menu.collapse ? '90' : '-90'}deg)`}">
          <Download/>
        </el-icon>
        <span style="margin: 0 auto;"/>
        <el-dropdown @command="dropdownCommand">
          <div class="admin-layout__header--dropdown">
            <el-avatar :size="30" :src="data.userInfo.avatar">
              <el-icon>
                <UserFilled/>
              </el-icon>
            </el-avatar>
            <span class="admin-layout__header--dropdown-name">{{ data.userInfo.name }}</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command='info' :icon="User">个人信息</el-dropdown-item>
              <el-dropdown-item command='quit' :icon="Close" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </header>
      <admin-header-nav :data="navMenu.list" :active="navMenu.index" @click="appMenuClick" @change="navMenuChange"/>
    </div>

    <div class="admin-layout__body">
      <router-view/>
      <!--      <router-view v-slot="{Component}">-->
      <!--        <transition>-->
      <!--          <component :is="Component"/>-->
      <!--        </transition>-->
      <!--      </router-view>-->
    </div>

  </div>
</template>

<script lang="ts" setup>
import { Close, Download, HomeFilled, User, UserFilled } from '@element-plus/icons-vue';
import { nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { MenuItem } from '../../components/AppLayoutMenu.vue';
import { useRoute, useRouter } from 'vue-router';
import LogoImage from '@image/logo.png';

type MenuItem__ = MenuItem & { router: string }

const route = useRoute();
const router = useRouter();

const bodyDom = document.getElementById('app') as HTMLElement;
const appMenu = ref<{ getIndex: (index: string) => MenuItem__ } | null>(null);

const menuHome: MenuItem__ = {title: '首页', icon: 'Help', router: '/admin/home', has: '/admin/home'};

const userInfo: MenuItem__ = {title: '个人详情', icon: 'UserFilled', router: '/admin/userInfo', has: '/admin/userInfo'};

const menu = reactive({
  collapse: ref(false),
  list: [
    menuHome,
    {title: '文章', icon: 'Reading', router: '/admin/article', has: '/admin/article'},
    {title: '用户', icon: 'User', router: '/admin/users', has: '/admin/users'},
    {title: '评论', icon: 'ChatDotSquare', router: '/admin/discuss', has: '/admin/discuss'},
    {
      title: '附件',
      icon: 'Paperclip',
      childList: [
        {title: '图片', icon: 'Picture', router: '/admin/image', has: '/admin/image'},
        {title: '文件', icon: 'Box', router: '/admin/files', has: '/admin/files'},
      ],
    },
    {
      title: '基础数据',
      icon: 'Connection',
      childList: [
        {title: '分类', icon: 'Files', router: '/admin/types', has: '/admin/types'},
        {title: '标签', icon: 'Discount', router: '/admin/tage', has: '/admin/tage'},
      ],
    },
    {title: '设置', icon: 'Setting', router: '/admin/setting', has: '/admin/setting'},
  ],
});

const navMenu = reactive({
  list: ref<MenuItem__[]>([]),
  index: ref<MenuItem__ | null>(null),
});

const data = reactive({
  userInfo: {
    avatar: ref(null),
    name: ref('Re Funny'),
  },
  navMenuList: ref<MenuItem[]>([]),
  navMenuIndex: ref<string | null>(null),
});

function dropdownCommand(keys: 'info' | 'quit') {
  if (keys === 'info') {
    appMenuClick(userInfo);
  } else {
    console.log(keys);
  }
}

function appMenuClick(item: MenuItem__) {
  if (!navMenu.list.includes(item)) {
    navMenu.list.push(item);
  }
  navMenu.index = item;
  router.push({path: item.router});
}

function navMenuChange(data: MenuItem__[]) {
  navMenu.list = [...data];
  if (!navMenu.list.length) {
    appMenuClick(menuHome);
  }
}

function onMenuCollapse() {
  menu.collapse = !menu.collapse;
  bodyDom.classList.add('admin-layout--animation');
  bodyDom.style.cssText = menu.collapse ? '--admin-sidebar: 64px;' : '';
  setTimeout(() => {
    bodyDom.classList.remove('admin-layout--animation');
  }, 300);
}

onMounted(() => {
  bodyDom.classList.add('admin-layout');
  nextTick(() => {
    appMenuClick(appMenu.value?.getIndex(route.path) || userInfo);
  });
});

onBeforeUnmount(() => {
  bodyDom.classList.remove('admin-layout');
});
</script>

<style lang='scss' src='@scss/layout/admin/style.scss'/>
