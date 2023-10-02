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
                  <span>{{ child.name }}</span>
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="item['router']" @click="onMenuClick(item)">
                <bootstrap-icon :name="item.icon"/>
                <span>{{ item.name }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
        <div class="var-layoutAdmin__container">
          <var-nav/>
          <main class="var-layoutAdmin__container--main">
            <router-view/>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">export default { name: 'LayoutAdmin' };</script>
<script lang="ts" setup>
import BootstrapIcon from '@plugin/bootstrap-icon/index.vue';
import { computed, onBeforeMount, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import VarNav from '@models/VarNav/index.vue';
import { useWebConfig } from '@stores/config';
import { MenuItem } from '@api/menu';
import { storeToRefs } from 'pinia';

interface Props {
  menu: MenuItem[];
}

const props = withDefaults(defineProps<Props>(), { menu: () => [] });

const webConfig = useWebConfig();

const data = reactive<{
  config: any;
  active: number;
  isMini: boolean;
}>({
  active: 0,
  isMini: false,
  config: storeToRefs(webConfig),
});

const menuExpand = computed(() => {
  const item = props.menu[data.active];
  return !item ? [] : (item.children || []);
});

const route = useRoute();
const router = useRouter();

onBeforeMount(() => {
  for (const [index, item] of Object.entries(props.menu)) {
    if (route.fullPath.toLowerCase().indexOf('/' + item.keys.toLowerCase()) === 0) {
      data.active = Number(index);
      break;
    }
  }
});

function onMenuClick(menu: MenuItem) {
  // 所有的菜单路由切换都经过这个，所以这里可以做一些统一的处理
  router.push({ path: <string>menu['router'] });
  // 统一管理操作 var-nav
}

function onClick(menu: MenuItem) {
  data.active = props.menu.indexOf(menu);
  if (!menu.children || !menu.children.length) onMenuClick(menu);
}
</script>

<style lang="scss" src="./src/style.scss"/>
