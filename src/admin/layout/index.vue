<template>
  <layout-admin :menu="data.menu">
    <template v-slot:header>
      header
    </template>
    <router-view key="admin-router"/>
    {{ data.icon }}
    <!--        <router-view v-slot="{Component, route}">-->
    <!--          <transition v-bind="handlerTransition(route)">-->
    <!--            <main class="var-layoutAdmin__container&#45;&#45;main" :key="route.fullPath">-->
    <!--              <component v-if="Boolean(Component)" :is="Component"/>-->
    <!--              <page-error v-else/>-->
    <!--            </main>-->
    <!--          </transition>-->
    <!--        </router-view>-->
    <bootstrap-icon-select v-model="data.icon"/>
  </layout-admin>
  <!--  <layout-admin class="var-admin" :menu="data.menu">-->
  <!--    <template v-slot:header="{hasSideMenu}">-->
  <!--      <el-tree-select :data="data.menu" filterable :props="{label: 'name', value: 'router'}">-->
  <!--        <template v-slot="{ data: { name ,router} }">-->
  <!--          <div>-->
  <!--            <div>{{ name }}</div>-->
  <!--            <div>{{ router }}</div>-->
  <!--          </div>-->
  <!--        </template>-->
  <!--      </el-tree-select>-->
  <!--      <span style="margin: 0 auto;"></span>-->
  <!--      <div class="var-layoutAdmin__header&#45;&#45;btn">-->
  <!--        <el-badge>-->
  <!--          <bootstrap-icon name="chat-left-dots"/>-->
  <!--        </el-badge>-->
  <!--      </div>-->
  <!--      <div class="var-layoutAdmin__header&#45;&#45;btn">-->
  <!--        <el-badge is-dot>-->
  <!--          <bootstrap-icon name="bell"/>-->
  <!--        </el-badge>-->
  <!--      </div>-->
  <!--      <el-popover>-->
  <!--        <template #reference>-->
  <!--          <el-avatar class="var-admin__userPopover" :size="30"/>-->
  <!--        </template>-->
  <!--        <div class="var-admin__user">-->
  <!--          <el-avatar class="var-admin__user&#45;&#45;avatar"/>-->
  <!--          <div class="var-admin__user&#45;&#45;body">-->
  <!--            <div class="var-admin__user&#45;&#45;name">ReFunny</div>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        <el-divider style="margin: 10px 0 5px;"/>-->
  <!--        <div class="var-admin__user&#45;&#45;item" @click.stop="onUserInfo">-->
  <!--          <bootstrap-icon name="person-circle"/>-->
  <!--          <span>个人资料</span>-->
  <!--        </div>-->
  <!--        <div class="var-admin__user&#45;&#45;item" @click.stop="onMyMeg">-->
  <!--          <bootstrap-icon name="chat-left-dots"/>-->
  <!--          <span>我的消息</span>-->
  <!--        </div>-->
  <!--        <div class="var-admin__user&#45;&#45;item" @click.stop="onLogout">-->
  <!--          <bootstrap-icon name="power"/>-->
  <!--          <span>退出登录</span>-->
  <!--        </div>-->
  <!--      </el-popover>-->
  <!--    </template>-->
  <!--  </layout-admin>-->
</template>

<script lang="ts">export default { name: 'Admin' };</script>

<script lang="ts" setup>
import { LayoutAdmin } from '@layouts';
import { reactive } from 'vue';
import BootstrapIconSelect from '@plugins/bootstrap-icon/src/select.vue';

interface State {
  icon: string;
  menu: MenuItem[];
}

const data = reactive<State>({
  menu: [
    { label: '首页', router: '/home', icon: 'house' },
    {
      label: '文章管理', router: '/article', icon: 'book-half',
      children: [
        { label: '新建文章', router: '/article/new', icon: 'file-plus' },
        { label: '编辑文章', router: '/article/edit', icon: 'file-edit' },
      ],
    },
    { label: '评论管理', router: '/comment', icon: 'chat-square-text' },
    {
      label: '用户管理', router: '/users', icon: 'person-square',
      children: [
        { label: '添加用户', router: '/users/add', icon: 'person-plus' },
        { label: '编辑用户', router: '/users/edit', icon: 'person-check' },
      ],
    },
    { label: '文件管理', router: '/files', icon: 'file-earmark-richtext' },
    { label: '日志管理', router: '/logger', icon: 'receipt-cutoff' },
    { label: '邮件管理', router: '/email', icon: 'envelope' },
    { label: '设置管理', router: '/setting', icon: 'gear' },
  ],
  icon: '',
});
// import LayoutAdmin from '@layouts/layoutAdmin/index.vue';
// import BootstrapIcon from '@plugin/bootstrap-icon/index.vue';
// //
// import { useMenuRouter } from '@stores/router';
// import { ElMessage } from 'element-plus';
// import { useUsers } from '@stores/user';
// // import { ApiLogout } from '@api/sign';
// import { useRouter } from 'vue-router';
// import { storeToRefs } from 'pinia';
// import { reactive } from 'vue';
//
// const user = useUsers();
// const router = useRouter();
// const menuRouter = useMenuRouter();
//
// const data = reactive<any>({
//   menu: storeToRefs(menuRouter).tree,
// });
//
// console.log(data);
//
// function onUserInfo() {}
//
// function onMyMeg() {}
//
// function onLogout() {
//   ApiLogout().then(({ data: res }) => {
//     if (res.code === 0) {
//       user.logout();
//       window.location.pathname = '/sign';
//       window.location.href = window.location.toString();
//     } else {
//       ElMessage.error(res.message);
//     }
//   });
// }
</script>

<style lang="scss" src="./style.scss"/>
