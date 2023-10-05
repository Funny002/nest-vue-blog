<template>
  <div class="var-layoutAdmin" :class="{'is-expand': Boolean(menuExpand.length), 'is-mini': data.isMini}">
    <div class="var-layoutAdmin__side">
      <div class="var-layoutAdmin__side--logo">
        <img :src="data.config.logo" :alt="data.config.title"/>
      </div>
      <div class="var-layoutAdmin__side--active" :style="{top: (data.active * 50) + 'px'}">
        <div></div>
      </div>
      <template v-for="item in props.menu">
        <el-tooltip v-if="item.icon" :content="item.name " :visible="item.name  ? undefined : false" placement="right" effect="light">
          <div class="var-layoutAdmin__side--item" @click="onClick(item)">
            <bootstrap-icon :name="item.icon"/>
          </div>
        </el-tooltip>
      </template>
    </div>
    <div class="var-layoutAdmin__body">
      <header class="var-layoutAdmin__header">
        <div class="var-layoutAdmin__header--btn" v-if="Boolean(menuExpand.length)" @click.stop="data.isMini = !data.isMini">
          <bootstrap-icon v-if="data.isMini" name="text-indent-left"/>
          <bootstrap-icon v-else name="text-indent-right"/>
        </div>
        <slot name="header"/>
      </header>
      <div class="var-layoutAdmin__nesting">
        <div class="var-layoutAdmin__menu" v-if="Boolean(menuExpand.length)">
          <el-menu :collapse="data.isMini" :default-active="route.fullPath">
            <template v-for="item of menuExpand">
              <el-sub-menu popper-class="var-layoutAdmin__menu--sub" v-if="(item.children || []).length" :index="item.name">
                <template #title>
                  <bootstrap-icon :name="item.icon"/>
                  <span>{{ item.name }}</span>
                </template>
                <el-menu-item v-for="child of item.children" :index="child['router']" @click="onMenuClick(item)">
                  <bootstrap-icon :name="child.icon"/>
                  <template #title>{{ child.name }}</template>
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="item['router']" @click="onMenuClick(item)">
                <bootstrap-icon :name="item.icon"/>
                <template #title>{{ item.name }}</template>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
        <div class="var-layoutAdmin__container">
          <var-nav v-model="data.navModel" v-model:data="data.navData" :default="data.navDefault" @change="onNavChange"/>
          <router-view v-slot="{Component, route}">
            <transition v-bind="handlerTransition(route)">
              <main class="var-layoutAdmin__container--main" :key="route.fullPath">
                <component v-if="Boolean(Component)" :is="Component"/>
                <page-error v-else/>
              </main>
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">export default { name: 'LayoutAdmin' };</script>
<script lang="ts" setup>
import 'animate.css/animate.compat.css';
import PageError from './src/PageError.vue';
import VarNav from '@models/VarNav/index.vue';
import BootstrapIcon from '@plugin/bootstrap-icon/index.vue';
//
import { computed, onBeforeMount, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useWebConfig } from '@stores/config';
import { MenuItem } from '@api/menu';
import { storeToRefs } from 'pinia';

const props = withDefaults(defineProps<{ menu: MenuItem[]; }>(), { menu: () => [] });

const route = useRoute();
const router = useRouter();
const webConfig = useWebConfig();

interface State {
  config: any;
  active: number;
  isMini: boolean;
  navModel: string;
  navDefault?: { icon: string; label: string; name: string; },
  navData: { icon?: any, label: string; name: string; hasClose?: boolean; }[];
}

const data = reactive<State>({
  active: -1,
  navData: [],
  isMini: false,
  config: storeToRefs(webConfig),
  navModel: route.fullPath.toLowerCase(),
});

const menuExpand = computed(() => (props.menu[data.active] || {})?.children || []);

// 添加 nav 路由
function setNavData({ icon, router: name, name: label }: MenuItem & { router: string }) {
  const names = data.navData.map(({ name }) => name);
  if (!names.includes(name)) data.navData.push({ icon, label, name });
}

onBeforeMount(() => {
  for (const [index, item] of Object.entries(props.menu)) {
    if (data.navModel.indexOf('/' + item.keys.toLowerCase()) === 0) {
      data.active = Number(index);
      break;
    }
  }
  if (data.active === -1) {
    data.active = 0;
    let menu = props.menu;
    for (let i = 0; i < menu.length; i++) {
      if ((menu[i].children || []).length) {
        menu = menu[i].children || [];
        i--;
      } else {
        const { icon, router: name, name: label } = menu[i] as (MenuItem & { router: string });
        data.navDefault = { icon, label, name };
        onMenuClick(menu[i]);
        break;
      }
    }
  } else {
    if (menuExpand.value.length) {
      function initNavData(list: MenuItem[]) {
        for (const item of list) {
          if (item.router === data.navModel) {
            setNavData(<any>item);
            return true;
          }
          if (item.children && initNavData(item.children)) return true;
        }
        return false;
      }

      initNavData(menuExpand.value);
    } else {
      setNavData(<any>props.menu[data.active]);
    }
    const { icon, router: name, name: label } = props.menu[0] as (MenuItem & { router: string });
    data.navDefault = { icon, label, name };
  }
});

// 切换路由
function onNavChange(path: string) {
  data.navModel = path;
  router.push({ path });
}

// 菜单点击
function onMenuClick(menu: MenuItem) {
  setNavData(<any>menu);
  onNavChange(<string>menu['router']);
}

// 图标菜单点击
function onClick(menu: MenuItem) {
  data.active = props.menu.indexOf(menu);
  if (!menu.children || !menu.children.length) onMenuClick(menu);
}

// 处理过度动画
function handlerTransition(route: any) {
  const { duration, enter = 'fadeInLeft', leave = 'fadeOutDown' } = route.mate?.transition || {};
  return { duration, type: 'animation', enterActiveClass: 'animated ' + enter, leaveActiveClass: 'animated ' + leave };
}
</script>

<style lang="scss" src="./src/style.scss"/>
