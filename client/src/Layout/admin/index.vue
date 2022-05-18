<template>
  <div class="admin-layout__sidebar">
    <div class="">logo</div>
    <app-layout-menu class="admin-layout__menu" :data="data.menu" @click="onClick"/>
  </div>

  <div class="admin-layout__content">
    <div class="admin-layout__nav">
      <header class="admin-layout__header">
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
      <admin-header-nav/>
    </div>

    <div class="admin-layout__body">
      <router-view v-slot="{Component}">
        <div class="">xxxxxxxxx</div>
        <transition>
          <component :is="Component"/>
        </transition>
      </router-view>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { Close, HomeFilled, User, UserFilled } from '@element-plus/icons-vue';
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { MenuItem } from '../../components/AppLayoutMenu.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const bodyDom = document.getElementById('app') as HTMLElement;

const data = reactive({
  userInfo: {
    avatar: ref(null),
    name: ref('Re Funny'),
  },
  menu: [
    {title: '首页', icon: 'Help', router: '/admin/home'},
    {title: '文章', icon: 'Reading', router: '/admin/article'},
    {title: '用户', icon: 'User', router: '/admin/users'},
    {title: '评论', icon: 'ChatDotSquare', router: '/admin/discuss'},
    {
      title: '附件',
      icon: 'Paperclip',
      childList: [
        {title: '图片', icon: 'Picture', router: '/admin/image'},
        {title: '文件', icon: 'Box', router: '/admin/files'},
      ],
    },
    {
      title: '基础数据',
      icon: 'Connection',
      childList: [
        {title: '分类', icon: 'Files', router: '/admin/types'},
        {title: '标签', icon: 'Discount', router: '/admin/tage'},
      ],
    },
    {title: '设置', icon: 'Setting', router: '/admin/setting'},
  ],
});

function dropdownCommand(keys: 'info' | 'quit') {
  console.log(keys);
}

function onClick(item: MenuItem & { router: string }, index: string) {
  router.push({path: item.router});
  console.log(item, index);
}

onMounted(() => {
  bodyDom.classList.add('admin-layout');
});

onBeforeUnmount(() => {
  bodyDom.classList.remove('admin-layout');
});
</script>

<style lang='scss' src='@scss/layout/admin/style.scss'/>
