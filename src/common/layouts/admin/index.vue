<template>
  <div class="var-layout-admin">
    <div class="var-layout-admin__side" v-if="props.menu.length">
      <div class="var-layout-admin__side--logo">
        <img :src="props.logo" :alt="props.title"/>
      </div>
      <template v-for="item of props.menu">
        <el-tooltip v-if="item.icon" :content="item.label" :visible="item.label ? undefined : false" placement="right" effect="dark">
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
        <slot/>
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
import { Layout } from '@layouts';

interface Props {
  logo?: string;
  title?: string;
  menu: MenuItem[];
}

const route = useRoute();
const router = useRouter();
const data = reactive({ isMini: false });
const props = withDefaults(defineProps<Props>(), { menu: () => [], title: 'LOGO' });

const menuActive = computed(() => {
  const index = props.menu.findIndex(item => route.fullPath.indexOf(item.router) === 0);
  return { index, value: props.menu[index], children: props.menu[index].children || [] };
});

const isExpand = computed(() => menuActive.value.children.length > 0);

function onMenuItem(menu: MenuItem, state = false) {
  router.push({ path: menu.router });
  if (state) data.isMini = false;
}
</script>

<style lang="scss" src="./style.scss"/>
