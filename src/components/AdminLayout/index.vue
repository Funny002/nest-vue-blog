<template>
  <var-layout>
    <template v-slot:side="{hasMini}">
      <n-scrollbar>
        <n-menu
          class="var-layout__menu"
          :collapsed="hasMini"
          :collapsed-width="60"
          :collapsed-icon-size="30"
          :options="data.menu.options"
          v-model:value="data.menu.value"
        />
      </n-scrollbar>
    </template>
    <template #header>
      <n-breadcrumb v-if="props.breadcrumb.length" :separator="props.breadcrumbSeparator">
        <template v-for="(item, key) in props.breadcrumb" :key="key">
          <n-breadcrumb-item v-if="hasType(item,'string')" :clickable="false">{{ item }}</n-breadcrumb-item>
          <n-breadcrumb-item v-else :clickable="false">
            <template v-if="(item.options||[]).length">
              <n-dropdown trigger="hover" :options="item.options" @select="handleBreadcrumbSelect">
                <n-icon v-if="item.icon" :component="item?.icon"/>
                {{ item.label }}
              </n-dropdown>
            </template>
            <template v-else>
              <n-icon v-if="item.icon" :component="item?.icon"/>
              {{ item.label }}
            </template>
          </n-breadcrumb-item>
        </template>
      </n-breadcrumb>
      <span style="margin: 0 auto"><!-- 分割线 --></span>
      <div class="var-layout__user">
        <n-avatar class="var-layout__user--img" :src="props.user.avatar" round/>
        <div class="var-layout__user--box">
          <n-ellipsis class="var-layout__user--name" style="max-width: 80px">{{ props.user.name }}</n-ellipsis>
          <n-ellipsis class="var-layout__user--note" style="max-width: 80px">{{ props.user.note }}</n-ellipsis>
        </div>
      </div>
    </template>
    <slot></slot>
  </var-layout>
</template>

<script lang="ts">export default { name: 'AdminLayout', inheritAttrs: false };</script>

<script lang="ts" setup>
import { computed, watch, reactive, WritableComputedRef, Component } from 'vue';
import { handleMenuIcon } from '@utils/index';
import { userInfo } from '@stores/sso/User';
import { hasType } from '@utils/object';
import VarLayout from './VarLayout.vue';
import { MenuOption } from 'naive-ui';

interface BreadcrumbOptions {
  label: string,
  icon?: Component,
  separator?: string;
  options?: { label: string, key: string }[]
}

interface Props {
  menuValue?: string;
  menuList?: MenuOption[];
  user?: Partial<userInfo>;
  breadcrumbSeparator?: string;
  breadcrumb: (BreadcrumbOptions | string)[];
}

const props = withDefaults(defineProps<Props>(), {
  user: () => ({}),
  menuList: () => [],
  menuValue: undefined,
  breadcrumb: () => [],
  breadcrumbSeparator: '/',
});

interface State {
  menu: {
    options: MenuOption[];
    value: WritableComputedRef<string | undefined>;
  };
}

const emits = defineEmits(['update:menuValue', 'breadcrumbSelect']);
const data = reactive<State>({
  menu: {
    options: [],
    value: computed({
      get() {
        return props.menuValue;
      },
      set(value: string) {
        emits('update:menuValue', value);
      },
    }),
  },
});

watch(props, ({ menuList }) => {
  //
  if (menuList.length !== data.menu.options.length) {
    data.menu.options = handleMenuIcon(menuList);
  }
});

function handleBreadcrumbSelect(value: any) {
  emits('breadcrumbSelect', value);
}
</script>

<style lang="scss" src="@scss/models/AdminLayout.scss"/>
