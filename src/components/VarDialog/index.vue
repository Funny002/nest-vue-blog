<template>
  <el-dialog class="var-dialog" :class="{'is-max-height': hasMaxHeight}" v-model="data.show" v-bind="bindAttrs" append-to-body>
    <template #header>
      <el-icon v-if="props.icon" :size="20" class="var-dialog__header-icon">
        <component :is="props.icon"/>
      </el-icon>
      <div class="var-dialog__header">
        <slot name="header">{{ props.title }}</slot>
      </div>
    </template>
    <slot></slot>
    <template #footer v-if="props.footer">
      <slot name="footer-box">
        <slot name="footer"></slot>
        <el-button @click="onBeforeClose" :icon="Close">关闭</el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script lang="ts">export default { name: 'VarDialog', inheritAttrs: false };</script>
<script lang="ts" setup>
import { Close } from '@element-plus/icons-vue';
import { rewriteObj } from '@utils/object';
import { computed, reactive } from 'vue';

interface Props {
  icon?: any;
  title?: string;
  width?: string;
  modal?: boolean;
  footer?: boolean;
  draggable?: boolean;
  showClose?: boolean;
  maxHeight?: boolean;
  fullscreen?: boolean;
  alignCenter?: boolean;
  destroyOnClose?: boolean;
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  beforeClose?: (close: () => void) => void;
}

const props = withDefaults(defineProps<Props>(), {
  modal: true,
  footer: true,
  width: '600px',
  showClose: true,
  maxHeight: false,
  draggable: false,
  fullscreen: false,
  alignCenter: false,
  destroyOnClose: false,
  closeOnClickModal: false,
  closeOnPressEscape: true,
});

const bindAttrs = computed(() => {
  const bindList = [
    'modal',
    'width',
    'draggable',
    'showClose',
    'fullscreen',
    'beforeClose',
    'alignCenter',
    'destroyOnClose',
    'closeOnClickModal',
    'closeOnPressEscape',
  ];
  return rewriteObj(props, bindList);
});

const hasMaxHeight = computed(() => props.maxHeight || props.draggable);

const data = reactive({ show: false });

function show(state = true) {
  data.show = state;
}

function hide() {
  data.show = false;
}

function onBeforeClose() {
  if (!props.beforeClose) return show(false);
  props.beforeClose(() => show(false));
}

defineExpose({ show, hide });
</script>

<style lang="scss" src="./src/style.scss"/>
