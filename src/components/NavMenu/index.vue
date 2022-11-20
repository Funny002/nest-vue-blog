<template>
  <div class="var-navMenu">

    <n-button v-if="data.hasNav" size="small">
      <template v-slot:icon>
        <icon-left/>
      </template>
    </n-button>

    <n-scrollbar ref="scrollbarRef" x-scrollable class="var-navMenu__nav">
      <template v-for="item of props.data" :key="item.name">
        <n-button size="small" :type="props.active === item.name ? 'primary' : ''" :key-name="item.name" @contextmenu="handleContextMenu">
          <template v-if="item.icon" v-slot:icon>
            <n-icon :component="item.icon"/>
          </template>
          {{ item.label }}
        </n-button>
      </template>
    </n-scrollbar>

    <n-button v-if="data.hasNav" size="small">
      <template v-slot:icon>
        <icon-right/>
      </template>
    </n-button>

    <n-dropdown trigger="hover" :options="optionsList" @select="handleSelect">
      <n-button size="small">
        <template v-slot:icon>
          <icon-more/>
        </template>
      </n-button>
    </n-dropdown>

    <n-dropdown trigger="manual" v-bind="data.menu" placement="bottom-start" @select="handleItemSelect" :on-clickoutside="onClickoutside"/>
  </div>
</template>

<script lang="ts" setup>
import {
  ArrowStepInRight12Filled as IconRight,
  ArrowStepInLeft12Filled as IconLeft,
  MoreHorizontal16Filled as IconMore,
} from '@vicons/fluent';
import { onMounted, reactive, ref } from 'vue';

type OptionsListConf = { [k: string]: string; }[]

const optionsList: OptionsListConf = [
  { key: 'left', label: '关闭左侧' },
  { key: 'right', label: '关闭右侧' },
  { key: 'other', label: '关闭其他' },
  { key: 'divider', type: 'divider' },
  { key: 'all', label: '关闭全部' },
];

const itemOptionsList: OptionsListConf = [
  { key: 'close', label: '关闭' },
  { key: 'divider', type: 'divider' },
  { key: 'left', label: '关闭左侧' },
  { key: 'right', label: '关闭右侧' },
  { key: 'other', label: '关闭其他' },
];

interface Props {
  active: string;
  data: { icon?: any, name: string, label: string }[];
}

interface State {
  menu: {
    x: number;
    y: number;
    show: boolean;
    options: OptionsListConf,
  };
  hasNav: boolean;
  menuIndex: string;
}

const scrollbarRef = ref();

const props = withDefaults(defineProps<Props>(), {
  active: '',
  data: () => [],
});

const data = reactive<State>({
  hasNav: false,
  menuIndex: '',
  menu: { show: false, x: 0, y: 0, options: itemOptionsList },
});

function handleContextMenu(event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();
  // set value
  data.menu.x = event.clientX;
  data.menu.y = event.clientY;
  data.menu.show = true;
  // set index
  let obj = event.target as HTMLElement;
  while (obj.nodeName !== 'BUTTON') {
    obj = obj.parentNode as HTMLElement;
  }
  data.menuIndex = obj.getAttribute('key-name') || '';
}

function onClickoutside() {
  data.menuIndex = '';
  data.menu.show = false;
}

function handleItemSelect(key: string) {
  console.log('handleItemSelect', data.menuIndex, key);
  onClickoutside();
}

function handleSelect(key: string) {
  console.log(key);
}

onMounted(() => {
  console.log(props, data, scrollbarRef.value);
});

</script>

<style lang="scss" src="@scss/components/NavMenu.scss"/>
