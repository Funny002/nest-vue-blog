<template>
  <layout-admin class="var-admin" :menu="data.menu">
    <template v-slot:header>
      <span style="margin-left: auto;"></span>
      <div class="var-layout__header--btn">
        <el-badge>
          <bootstrap-icon name="chat-left-dots"/>
        </el-badge>
      </div>
      <div class="var-layout__header--btn">
        <el-badge is-dot>
          <bootstrap-icon name="bell"/>
        </el-badge>
      </div>
      <el-popover placement="bottom-end">
        <template #reference>
          <el-avatar class="var-admin__user--avatar" :size="30"/>
        </template>
        <div class="var-admin__user">
          <el-avatar/>
          <div class="var-admin__user--name">
            <div>ReFunny</div>
          </div>
        </div>
        <el-divider style="margin: 10px 0 5px;"/>
        <div class="var-admin__user--item">
          <bootstrap-icon name="person-circle"/>
          <span>个人资料</span>
        </div>
        <div class="var-admin__user--item">
          <bootstrap-icon name="chat-left-dots"/>
          <span>我的消息</span>
        </div>
        <el-divider style="margin: 10px 0 5px;"/>
        <div class="var-admin__user--item" v-if="!fullscreen.isFullscreen" @click="onFullscreenToggle">
          <bootstrap-icon name="fullscreen"/>
          <span>全屏显示</span>
        </div>
        <div class="var-admin__user--item" v-else @click="onFullscreenToggle">
          <bootstrap-icon name="fullscreen-exit"/>
          <span>退出全屏</span>
        </div>
        <div class="var-admin__user--item">
          <bootstrap-icon name="power"/>
          <span>退出登录</span>
        </div>
      </el-popover>
    </template>
    <router-view v-slot="{Component, route}">
      <transition v-bind="handlerTransition(route)">
        <main class="var-admin__main" :key="route.fullPath">
          <component :is="Component"/>
        </main>
      </transition>
    </router-view>
  </layout-admin>
</template>

<script lang="ts">export default { name: 'Admin' };</script>

<script lang="ts" setup>
import { BootstrapIcon } from '@plugins/bootstrap-icon';
import fullscreen from '@utils/fullscreen';
import 'animate.css/animate.compat.css';
import { LayoutAdmin } from '@layouts';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';

interface State {
  icon: string;
  menu: MenuItem[];
}

const router = useRouter();
const data = reactive<State>({
  icon: '',
  menu: [
    { label: '首页', router: '/home', icon: 'house' },
    {
      label: '文章管理', router: '/article', icon: 'journal-richtext',
      children: [
        { label: '文章列表', router: '/article/list', icon: 'list-check' },
        { label: '新建文章', router: '/article/new', icon: 'journals' },
        { label: '编辑文章', router: '/article/edit', icon: 'journal-text' },
      ],
    },
    { label: '评论管理', router: '/comments', icon: 'chat-square-text' },
    {
      label: '用户管理', router: '/users', icon: 'person-square',
      children: [
        { label: '添加用户', router: '/users/add', icon: 'person-plus' },
        { label: '编辑用户', router: '/users/edit', icon: 'person-check' },
      ],
    },
    { label: '文件管理', router: '/files', icon: 'file-earmark-richtext' },
    { label: '日志管理', router: '/logger', icon: 'receipt-cutoff' },
    { label: '设置管理', router: '/setting', icon: 'gear' },
  ],
});

// 处理过度动画
function handlerTransition(route: any) {
  const { duration, enter = 'fadeInLeft', leave = 'fadeOutDown' } = route.mate?.transition || {};
  return { duration, type: 'animation', enterActiveClass: 'animated ' + enter, leaveActiveClass: 'animated ' + leave };
}

// 全屏
function onFullscreenToggle() {
  if (fullscreen.isFullscreen) {
    fullscreen.exitFullscreen();
  } else {
    fullscreen.fullscreen();
  }
}
</script>

<style lang="scss" src="./style.scss"/>
