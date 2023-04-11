<template>
  <div class="var-layoutAdmin" :class="{'is-mini': props.isMini}">
    <div class="var-layoutAdmin__side">
      <div class="var-layoutAdmin__side--logo"></div>
      <!--      :class="{'is-active': menuActive[item.name]}"-->
      <div class="var-layoutAdmin__side--active">
        <div></div>
      </div>
      <template v-for="item in props.menu">
        <el-tooltip v-if="item.icon" :content="item.label" :visible="item.label ? undefined : false" placement="right" effect="light">
          <div class="var-layoutAdmin__side--item">
            <el-icon>
              <component :is="item.icon"/>
            </el-icon>
          </div>
        </el-tooltip>
      </template>
    </div>
    <div class="var-layoutAdmin__nesting" style="flex-direction: column;">
      <header class="var-layoutAdmin__header">
        <slot name="header"/>
      </header>
      <div class="var-layoutAdmin__nesting">
        <div class="var-layoutAdmin__menu">
          <el-menu class="var-layoutAdmin__menu--body" :collapse="props.isMini">
            <el-sub-menu index="1" popper-class="var-layoutAdmin__menu--sub">
              <template #title>
                <el-icon>
                  <CaretRight/>
                </el-icon>
                <span>组 - 1</span>
              </template>
              <el-menu-item index="1-1">菜单 - 1</el-menu-item>
              <el-menu-item index="1-2">菜单 - 2</el-menu-item>
              <el-menu-item index="1-3">菜单 - 3</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2" popper-class="var-layoutAdmin__menu--sub">
              <template #title>
                <el-icon>
                  <CaretRight/>
                </el-icon>
                <span>组 - 2</span>
              </template>
              <el-menu-item index="2-1">菜单 - 1</el-menu-item>
              <el-menu-item index="2-2">菜单 - 2</el-menu-item>
              <el-menu-item index="2-3">菜单 - 3</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="3">
              <el-icon>
                <CaretRight/>
              </el-icon>
              <span>菜单 - 1</span>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon>
                <CaretRight/>
              </el-icon>
              <span>菜单 -2</span>
            </el-menu-item>
            <el-menu-item index="5">
              <el-icon>
                <CaretRight/>
              </el-icon>
              <span>菜单 - 3</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="var-layoutAdmin__container">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">export default { name: 'LayoutAdmin' };</script>
<script lang="ts" setup>
import { CaretRight } from '@element-plus/icons-vue';
import { computed } from 'vue';

interface Menu {
  icon?: any,
  name: string,
  label: string,
  hasShow?: boolean,
  childList?: Menu[]
}

interface Props {
  menu: Menu[];
  isMini?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isMini: false,
});

const menuActive = computed(() => {
  return {
    //
  };
});
</script>

<style lang="scss" src="./src/style.scss"/>
