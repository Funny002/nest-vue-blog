<template>
  <div class="var-layout-admin">
    <div class="var-layout-admin__side" v-if="props.menu.length">
      <div class="var-layout-admin__side--logo">
        <img :src="props.logo" alt="logo"/>
      </div>
      <template v-for="item of props.menu">
        <el-tooltip v-if="item.icon" :content="item.label" :visible="item.label ? undefined : false" placement="right" effect="light">
          <div class="var-layout-admin__side--item" @click.stop="onMenuItem(item)">
            <bootstrap-icon :name="item.icon"/>
          </div>
        </el-tooltip>
      </template>
      <div class="var-layout-admin__side--angle" :style="{marginTop: `${(menuActive.index + 1) * 50}px`}"/>
    </div>
    <layout>
      <template v-slot:header v-if="$slots.header">
        <div class="var-layout__header--btn" @click.stop="data.isMini = !data.isMini" v-if="isExpand">
          <bootstrap-icon :name="`text-indent-${data.isMini ? 'left' : 'right'}`"/>
        </div>
        <slot name="header"/>
      </template>
      <template v-slot:footer v-if="$slots.footer">
        <slot name="footer"/>
      </template>
      <div class="var-layout-admin__expand" :class="{'is-mini': data.isMini}" v-if="isExpand">
        <el-menu :collapse="data.isMini" :default-active="route.fullPath">
          <template v-for="item of menuActive.children">
            <el-sub-menu popper-class="var-layoutAdmin__menu--sub" v-if="(item.children || []).length" :index="item.label">
              <template #title>
                <bootstrap-icon :name="item.icon"/>
                <span>{{ item.label }}</span>
              </template>
              <el-menu-item v-for="child of item.children" :index="child['router']" @click="onMenuItem(item)">
                <bootstrap-icon :name="child.icon"/>
                <template #title>{{ item.label }}</template>
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="item['router']" @click="onMenuItem(item)">
              <bootstrap-icon :name="item.icon"/>
              <template #title>{{ item.label }}</template>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
      <div class="var-layout-admin__content">
        <!--        v-model="data.navModel" v-model:data="data.navData" :default="data.navDefault" @change="onNavChange"-->
        <var-nav/>
        <div class="var-layout-admin__body">
          <slot/>
        </div>
      </div>
    </layout>
  </div>
  <!--  <div class="var-layoutAdmin" :class="{'is-expand': Boolean(menuExpand.length), 'is-mini': data.isMini}">-->
  <!--    <div class="var-layoutAdmin__side">-->
  <!--      <div class="var-layoutAdmin__side&#45;&#45;logo">-->
  <!--        <img :src="data.config.logo" :alt="data.config.title"/>-->
  <!--      </div>-->
  <!--      <div class="var-layoutAdmin__side&#45;&#45;active" :style="{top: (data.active * 50) + 'px'}">-->
  <!--        <div></div>-->
  <!--      </div>-->
  <!--      <template v-for="item in props.menu">-->
  <!--        <el-tooltip v-if="item.icon" :content="item.name" :visible="item.name  ? undefined : false" placement="right" effect="light" :key="item.name">-->
  <!--          <div class="var-layoutAdmin__side&#45;&#45;item" @click="onClick(item)">-->
  <!--            <bootstrap-icon :name="item.icon"/>-->
  <!--          </div>-->
  <!--        </el-tooltip>-->
  <!--      </template>-->
  <!--    </div>-->
  <!--    <div class="var-layoutAdmin__body">-->
  <!--      <header class="var-layoutAdmin__header">-->
  <!--        <div class="var-layoutAdmin__header&#45;&#45;btn" v-if="Boolean(menuExpand.length)" @click.stop="data.isMini = !data.isMini">-->
  <!--          <bootstrap-icon v-if="data.isMini" name="text-indent-left"/>-->
  <!--          <bootstrap-icon v-else name="text-indent-right"/>-->
  <!--        </div>-->
  <!--        <slot name="header"/>-->
  <!--      </header>-->
  <!--      <div class="var-layoutAdmin__nesting">-->
  <!--        <div class="var-layoutAdmin__menu" v-if="Boolean(menuExpand.length)">-->

  <!--        </div>-->
  <!--        <div class="var-layoutAdmin__container">-->

  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script lang="ts">export default { name: 'LayoutAdmin' };</script>
<script lang="ts" setup>
import { BootstrapIcon } from '@plugins/bootstrap-icon';
import { useRoute, useRouter } from 'vue-router';
import { computed, reactive } from 'vue';
import VarNav from '@models/VarNav';
import { Layout } from '@layouts';

interface Props {
  logo?: string;
  menu: MenuItem[];
}

const route = useRoute();
const router = useRouter();
const props = withDefaults(defineProps<Props>(), { menu: () => [] });

const menuActive = computed(() => {
  const index = props.menu.findIndex(item => route.fullPath.indexOf(item.router) === 0);
  return { index, value: props.menu[index], children: props.menu[index].children || [] };
});

const isExpand = computed(() => menuActive.value.children.length > 0);

const data = reactive({
  isMini: false,
});

function onMenuItem(menu: MenuItem, state = false) {
  router.push({ path: menu.router });
  if (state) data.isMini = false;
}

// import 'animate.css/animate.compat.css';
// import PageError from './PageError.vue';
// import VarNav from '@models/VarNav/index.vue';
// import { BootstrapIcon } from '@plugins/bootstrap-icon';
// //
// import { computed, onBeforeMount, reactive } from 'vue';
// import { useRoute, useRouter } from 'vue-router';
// import { useWebConfig } from '@stores/config';
// import { MenuItem } from '@api/menu';
// import { storeToRefs } from 'pinia';
//
// const props = withDefaults(defineProps<{ menu: MenuItem[]; }>(), { menu: () => [] });
//
// const route = useRoute();
// const router = useRouter();
// const webConfig = useWebConfig();
//
// interface State {
//   config: any;
//   active: number;
//   isMini: boolean;
//   navModel: string;
//   navDefault?: { icon: string; label: string; name: string; },
//   navData: { icon?: any, label: string; name: string; hasClose?: boolean; }[];
// }
//
// const data = reactive<State>({
//   active: -1,
//   navData: [],
//   isMini: false,
//   config: storeToRefs(webConfig),
//   navModel: route.fullPath.toLowerCase(),
// });
//
// const menuExpand = computed(() => (props.menu[data.active] || {})?.children || []);
//
// // 添加 nav 路由
// function setNavData({ icon, router: name, name: label }: MenuItem & { router: string }) {
//   const names = data.navData.map(({ name }) => name);
//   if (!names.includes(name)) data.navData.push({ icon, label, name });
// }
//
// onBeforeMount(() => {
//   for (const [index, item] of Object.entries(props.menu)) {
//     if (data.navModel.indexOf('/' + item.keys.toLowerCase()) === 0) {
//       data.active = Number(index);
//       break;
//     }
//   }
//   if (data.active === -1) {
//     data.active = 0;
//     let menu = props.menu;
//     for (let i = 0; i < menu.length; i++) {
//       if ((menu[i].children || []).length) {
//         menu = menu[i].children || [];
//         i--;
//       } else {
//         const { icon, router: name, name: label } = menu[i] as (MenuItem & { router: string });
//         data.navDefault = { icon, label, name };
//         onMenuClick(menu[i]);
//         break;
//       }
//     }
//   } else {
//     if (menuExpand.value.length) {
//       function initNavData(list: MenuItem[]) {
//         for (const item of list) {
//           if (item.router === data.navModel) {
//             setNavData(<any>item);
//             return true;
//           }
//           if (item.children && initNavData(item.children)) return true;
//         }
//         return false;
//       }
//
//       initNavData(menuExpand.value);
//     } else {
//       setNavData(<any>props.menu[data.active]);
//     }
//     const { icon, router: name, name: label } = props.menu[0] as (MenuItem & { router: string });
//     data.navDefault = { icon, label, name };
//   }
// });
//
// // 切换路由
// function onNavChange(path: string) {
//   data.navModel = path;
//   router.push({ path });
// }
//
// // 菜单点击
// function onMenuClick(menu: MenuItem) {
//   setNavData(<any>menu);
//   onNavChange(<string>menu['router']);
// }
//
// // 图标菜单点击
// function onClick(menu: MenuItem) {
//   data.active = props.menu.indexOf(menu);
//   if (!menu.children || !menu.children.length) onMenuClick(menu);
// }
//
// // 处理过度动画
// function handlerTransition(route: any) {
//   const { duration, enter = 'fadeInLeft', leave = 'fadeOutDown' } = route.mate?.transition || {};
//   return { duration, type: 'animation', enterActiveClass: 'animated ' + enter, leaveActiveClass: 'animated ' + leave };
// }
</script>

<style lang="scss" src="./style.scss"/>
