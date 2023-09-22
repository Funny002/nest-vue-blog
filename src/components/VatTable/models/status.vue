<template>
  <div class="var-table-status">
    <el-switch :model-value="props.value" v-bind="bindStyle" @change="onChange"/>
  </div>
</template>

<script lang="ts">export default { name: 'VarTableStatus', inheritAttrs: false };</script>
<script lang="ts" setup>
import { rewriteObj } from '@utils/object';
import { StatusField } from '../types';
import { computed } from 'vue';

const props = withDefaults(defineProps<{ fields: StatusField; value: any; index: number; row: any }>(), {});

const bindStyle = computed(() => {
  return rewriteObj(props.fields, ['activeIcon', 'activeValue', 'activeText', 'inactiveIcon', 'inactiveValue', 'inactiveText', 'loading', 'disabled', 'inlinePrompt']);
});

function onChange(value: any) {
  const { fields: { change }, index } = props;
  change && change(index, value);
}
</script>
