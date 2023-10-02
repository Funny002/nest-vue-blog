<template>
  <el-popover trigger="click" width="auto" @after-leave="onLeave">
    <div class="var-BootstrapIcon-select">
      <div class="var-BootstrapIcon-select__tab">
        <el-radio-group v-model="data.fill" style="flex: 0 0 auto;">
          <el-radio-button :label="false">线条</el-radio-button>
          <el-radio-button :label="true">实体</el-radio-button>
        </el-radio-group>
        <el-input v-model="data.search" style="margin-left: 10px; max-width: 200px;" placeholder="过滤搜索" clearable/>
      </div>
      <div class="var-BootstrapIcon-select__options" :style="{maxHeight: toPx(props.height)}">
        <bootstrap-icon
          all
          isEmpty
          @click="onClick"
          :show-fill="data.fill"
          :search="data.search"
          :active="props.modelValue"
          :style="{width:`calc((1em + 10px) * ${props.width})`}"/>
      </div>
    </div>
    <template v-slot:reference>
      <el-input v-model="props.modelValue" readonly placeholder="请选择" clearable>
        <template #prefix>
          <bootstrap-icon :name="props.modelValue" style="color: #000"/>
        </template>
      </el-input>
    </template>
  </el-popover>
</template>

<script lang="ts">export default { name: 'BootstrapIconSelect' };</script>

<script setup lang="ts">
import BootstrapIcon from './index.vue';
import { onDeactivated, onUnmounted, reactive } from 'vue';

interface Props {
  modelValue?: string;
  width?: number | string;
  height?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  width: 10,
  height: 200,
  modelValue: '',
});

const data = reactive({
  fill: false,
  search: '',
});

const emits = defineEmits(['update:modelValue']);

function onClick(name: string) {
  emits('update:modelValue', name);
}

function toPx(value: number | string) {
  return typeof value === 'number' ? `${ value }px` : value;
}

function onLeave() {
  data.fill = false;
  data.search = '';
}
</script>

<style lang="scss">
.var-BootstrapIcon-select {
  &__tab {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
  }

  &__options {
    font-size: 20px;
    overflow: hidden auto;
    border: 1px solid #ddd;

    .var-BootstrapIcon__item {
      padding: 5px;
      cursor: pointer;
      box-sizing: content-box;

      &:hover {
        background-color: rgba(170, 170, 170, .4);
      }
    }
  }
}
</style>
