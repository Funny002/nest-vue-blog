<template>
  <el-tag class="var-table-tags" v-bind="bindProps" @click="e => onClick('click', e)" @close="e => onClick('close', e)">{{ values.value || values }}</el-tag>
</template>

<script lang="ts">export default { name: 'VarTableTags', inheritAttrs: false };</script>
<script lang="ts" setup>
import { rewriteObj } from '@utils/object';
import { TagsField } from '../types';
import { computed } from 'vue';

const props = withDefaults(defineProps<{ fields: TagsField; value: any; index: number, row: any }>(), {});
const values = computed(() => props.fields.options[props.value] || props.value);

const bindProps = computed(() => {
  if (!values.value.value) return undefined;
  const obj = rewriteObj(props.fields, ['closable', 'hit', 'color', 'size', 'effect', 'round']);
  if ('types' in props.fields) obj.type = props.fields.types;
  if ('type' in values.value) obj.type = values.value.type;
  return obj;
});

function onClick(keys: 'click' | 'close', event: MouseEvent) {
  const { fields, row } = props;
  const func = fields[keys];
  func && func(row, fields.name || values.value || values, props.index, event);
}
</script>
