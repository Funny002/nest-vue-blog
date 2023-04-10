<template>
  <div class="var-nav">
    <el-button :icon="DArrowLeft" plain/>
    <div class="var-nav__container">
      <div class="var-nav__body">
        <template v-for="item in props.data">
          <el-button class="var-nav__item" @click.stop="onClick(item.name)" :type="item.name === props.modelValue ? 'primary' : undefined" :icon="item.icon">
            <span class="var-nav__label">{{ item.label }}</span>
            <el-icon class="var-nav__icon" v-if="'hasClose' in item ? item.hasClose : true" @click.stop="onClose(item.name)">
              <Close/>
            </el-icon>
          </el-button>
        </template>
      </div>
    </div>
    <el-button :icon="DArrowRight" plain/>
    <el-dropdown>
      <el-button :icon="MoreFilled" plain/>
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
import { Close, DArrowLeft, DArrowRight, MoreFilled } from '@element-plus/icons-vue';
import { computed, reactive } from 'vue';

interface Props {
  modelValue?: string;
  data: { icon?: any, label: string; name: string, hasClose?: boolean }[];
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
});

const navData = computed<any>(() => {
  return [
    { icon: '', label: '关闭左侧', command: 'left', show: true },
    { icon: '', label: '关闭右侧', command: 'right', show: true },
    { icon: '', label: '关闭其他', command: 'left', divided: true, show: true },
    { icon: '', label: '关闭全部', command: 'all', show: true },
  ];
});

const emits = defineEmits(['close', 'click', 'update:modelValue']);

function onClick(name: string) {
  emits('update:modelValue', name);
  emits('click', name);
}

function onClose(name: string) {
  emits('close', name);
}
</script>

<style lang="scss" src="./src/style.scss"/>
