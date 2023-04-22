<template>
  <el-table-column :show-overflow-tooltip="true" v-bind="bindProps" :style="hasShow">
    <template v-slot:default="{row, $index, column}" v-if="data.component">
      <component :is="data.component" :row="row" :index="$index" :column="column" :value="row[column['property']]" :fields="props.fields"/>
    </template>
  </el-table-column>
</template>

<script lang="ts">export default { name: 'VarTableField' };</script>
<script lang="ts" setup>
import { computed, onMounted, reactive, shallowRef, watch } from 'vue';
import { rewriteObj } from '@utils/object';
import * as Module from './models';
import { Fields } from '../types';

const props = withDefaults(defineProps<{ fields: Fields; }>(), {});

const hasShow = computed(() => {
  const state = 'show' in props.fields ? props.fields.show : true;
  return { display: state ? 'block' : 'none' };
});

const bindProps = computed(() => {
  if (!('showOverflowTooltip' in props.fields)) props.fields.showOverflowTooltip = true;
  return rewriteObj(props.fields, ['prop', 'label', 'width', 'minWidth', 'align', 'headerAlign', 'showOverflowTooltip', 'sortable']);
});

const data = reactive({ component: undefined, keys: '' });

function setComponent() {
  if ('type' in props.fields) {
    data.keys = props.fields.type as string;
    const component = (Module as { [K: string]: any })[data.keys];
    if (component) {
      data.component = shallowRef(component);
      return true;
    }
  }
  data.component = undefined;
  return false;
}

watch(() => props, props => {
  if (props.fields.type !== data.keys) setComponent();
}, { deep: true });

onMounted(() => setComponent());
</script>
