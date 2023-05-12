<template>
  <div class="var-layoutAdmin" :class="{'is-mini': props.isMini}">
    <div class="var-layoutAdmin__side">
      <div class="var-layoutAdmin__side--logo"></div>
      <div class="var-layoutAdmin__side--active" :style="{top: (menuActive.index * 50) + 'px'}">
        <div></div>
      </div>
      <template v-for="item in props.menu">
        <el-tooltip v-if="item.icon" :content="item.label" :visible="item.label ? undefined : false" placement="right" effect="light">
          <div class="var-layoutAdmin__side--item" @click="onClick(item)">
            <el-icon>
              <component :is="item.icon"/>
            </el-icon>
          </div>
        </el-tooltip>
      </template>
    </div>
    <div class="var-layoutAdmin__nesting" style="flex-direction: column;">
      <header class="var-layoutAdmin__header">
        <slot name="header" :isMini="props.isMini" :hasSideMenu="hasSideMenu"/>
      </header>
      <div class="var-layoutAdmin__nesting">
        <div class="var-layoutAdmin__menu" v-show="hasSideMenu">
          <el-menu class="var-layoutAdmin__menu--body" :collapse="props.isMini">
            <template v-for="item of props.menuChildren">
              <el-sub-menu v-if="(item.childList || []).length" :index="item.name">
                <template #title>
                  <el-icon v-if="item.icon">
                    <component :is="item.icon"/>
                  </el-icon>
                  <span>{{ item.label }}</span>
                </template>
                <el-menu-item v-for="child of item.childList" :index="child.name" @click="onMenuClick(item)">
                  <el-icon v-if="child.icon">
                    <component :is="child.icon"/>
                  </el-icon>
                  <span>{{ child.label }}</span>
                </el-menu-item>
              </el-sub-menu>
              <el-menu-item v-else :index="item.name" @click="onMenuClick(item)">
                <el-icon v-if="item.icon">
                  <component :is="item.icon"/>
                </el-icon>
                <span>{{ item.label }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
        <div class="var-layoutAdmin__container" :class="{'is-side': hasSideMenu }">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">export default { name: 'LayoutAdmin' };</script>
<script lang="ts" setup>
import { CaretRight } from '@element-plus/icons-vue';
import { computed, onMounted, reactive } from 'vue';

interface Menu {
  icon?: any,
  name: string,
  label: string,
  hasShow?: boolean,
  childList?: Menu[]
}

interface Props {
  isMini?: boolean;
  //
  menu: Menu[];
  menuActive?: string;
  menuChildren?: Menu[];
  menuChildrenActive?: string;
}

const emits = defineEmits(['update:menuActive', 'change:menuActive']);

const props = withDefaults(defineProps<Props>(), {
  isMini: false,
  menuChildren: () => [],
});

const hasSideMenu = computed(() => (props.menuChildren || []).length);

const data = reactive({
  menuActive: props.menuActive,
});

const menuActive = computed<any>({
  get() {
    const name = props.menuActive || data.menuActive || '';
    const index = props.menu.findIndex(v => v.name === name);
    return { name, index };
  },
  set(name: string) {
    data.menuActive = name;
    emits('update:menuActive', name);
    emits('change:menuActive', name);
  },
});

onMounted(() => {
  if (!props.menuActive) menuActive.value = props.menu[0]?.name || '';
});

function onClick(item: any) {
  menuActive.value = item.name;
}

function onMenuClick(item: any) {
  console.log(item);
}
</script>

<style lang="scss" src="./src/style.scss"/>
