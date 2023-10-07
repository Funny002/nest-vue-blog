<template>
  <div class="var-nav" :class="{'is-Btn': data.hasMoveBtn}">
    <el-button plain v-if="data.hasMoveBtn" @click.stop="onMove('left')">
      <bootstrap-icon name="chevron-double-left"/>
    </el-button>
    <el-scrollbar ref="scrollbarRef" class="var-nav__container" view-class="var-nav__body">
      <template v-for="item in props.data">
        <el-button class="var-nav__item" :class="{'el-button--primary':item.name === props.modelValue}" @click.stop="e => onClick(item, e)">
          <el-icon class="el-icon--left">
            <bootstrap-icon :name="item.icon"/>
          </el-icon>
          <span class="var-nav__label">{{ item.label }}</span>
          <el-icon class="var-nav__icon el-icon--right" v-if="itemHasClose(item)" @click.stop="onClose(item)">
            <Close/>
          </el-icon>
        </el-button>
      </template>
    </el-scrollbar>
    <el-button plain v-if="data.hasMoveBtn" @click.stop="onMove('right')">
      <bootstrap-icon name="chevron-double-right"/>
    </el-button>
    <el-dropdown v-if="navData.length">
      <el-button plain>
        <bootstrap-icon name="chevron-double-down"/>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <template v-for="item in navData">
            <el-dropdown-item v-if="item.show" :divided="item.divided" :command="item.command">{{ item.label }}</el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">export default { name: 'VarNav' };</script>
<script lang="ts" setup>
import BootstrapIcon from '@plugin/bootstrap-icon/index.vue';
import { computed, nextTick, reactive, ref, watch } from 'vue';
import { Close } from '@element-plus/icons-vue';

interface Nav {
  icon?: any,
  name: string;
  label: string;
  hasClose?: boolean;
}

interface Props {
  data: Nav[];
  default?: Nav;
  modelValue?: string;
}

const scrollbarRef = ref<any>(null);
const props = withDefaults(defineProps<Props>(), { data: () => [] });
const data = reactive<{ wrapRef?: HTMLElement, hasMoveBtn: boolean }>({ hasMoveBtn: false });

function handlerMoveBtn(dom: HTMLElement) {
  const { scrollWidth = 0, clientWidth = 0 } = dom;
  data.hasMoveBtn = scrollWidth > clientWidth;
}

// 监听滚动条是否显示
watch(() => props.data, () => data.wrapRef && nextTick(() => handlerMoveBtn(<HTMLElement>data.wrapRef)), { deep: true });
watch<HTMLElement | undefined, true>(() => scrollbarRef.value?.wrapRef, dom => {
  if (dom) {
    data.wrapRef = dom;
    (new ResizeObserver(() => handlerMoveBtn(dom))).observe(dom);
  }
}, { immediate: true });

const hasClose = computed(() => {
  if (props.data.length > 1) return true;
  if (props.data.length < 1) return false;
  return props.default ? (props.default.name !== props.data[0].name) : false;
});

function itemHasClose(item: Nav) {
  if (!hasClose.value) return false;
  if ('hasClose' in item) return item.hasClose;
  return true;
}

const navData = computed<any>(() => {
  return [
    // { icon: '', label: '关闭左侧', command: 'left', show: true },
    // { icon: '', label: '关闭右侧', command: 'right', show: true },
    // { icon: '', label: '关闭其他', command: 'left', divided: true, show: true },
    // { icon: '', label: '关闭全部', command: 'all', show: true },
  ];
});

const emits = defineEmits(['close', 'change', 'update:modelValue', 'update:data']);

function onClick(nav: Nav, event?: Event) {
  if (event) (<HTMLElement>event.target).scrollIntoView({ behavior: 'smooth', block: 'center' });
  emits('update:modelValue', nav.name);
  emits('change', nav.name);
}

function onClose(nav: Nav) {
  const index = props.data.indexOf(nav);
  const list = [...props.data];
  list.splice(index, 1);
  if (!list.length && props.default) list.push({ ...props.default });
  const item = (list[index] || list[list.length - 1]);
  emits('close', nav, nav.name);
  emits('update:data', list);
  onClick(item);
}

function onMove(type: 'left' | 'right') {
  if (data.wrapRef) {
    const { clientWidth = 0, scrollLeft = 0 } = data.wrapRef;
    let val = data.wrapRef.clientWidth;
    if (type === 'left') val = 0 - clientWidth;
    data.wrapRef.scrollTo({ left: scrollLeft + val, behavior: 'smooth' });
  }
}
</script>

<style lang="scss" src="./src/style.scss"/>
