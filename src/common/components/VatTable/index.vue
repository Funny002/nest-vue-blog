<template>
  <el-table :data="props.value" v-bind="bindProps">
    <template v-for="item of props.data">
      <el-table-column v-if="item.slot" v-bind="onBindProps(item)" :show-overflow-tooltip="true" v-show="'show' in item ? item.show : true">
        <template v-slot="{$index, row, column}">
          <slot :name="item.slot" :$index="$index" :row="row" :column="column"/>
        </template>
      </el-table-column>
      <var-table-field v-else :fields="item"/>
    </template>
    <template v-if="$slots.append" v-slot:append>
      <slot name="append"></slot>
    </template>
    <template v-if="$slots.empty" v-slot:empty>
      <slot name="empty"></slot>
    </template>
  </el-table>
</template>

<script lang="ts">export default { name: 'VarTable' };</script>
<script lang="ts" setup>
import VarTableField from './src/field.vue';
import { rewriteObj } from '@utils/object';
import { computed, reactive } from 'vue';
import { Fields } from './types';

interface Props {
  value?: any[];
  data?: Fields[];
  rowKey?: string;
  stripe?: boolean;
  border?: boolean;
  emptyText?: string;
  showHeader?: boolean;
  defaultExpandAll?: boolean;
  highlightCurrentRow?: boolean;
  defaultSort?: { props?: string; order?: 'ascending' | 'descending' };
}

const props = withDefaults(defineProps<Props>(), {
  data: () => ([]),
});

const data = reactive({});

const bindProps = computed(() => rewriteObj(props, ['rowKey']));

function onBindProps(item: Fields) {
  if (!('showOverflowTooltip' in item)) item.showOverflowTooltip = true;
  return rewriteObj(item, ['prop', 'label', 'width', 'minWidth', 'align', 'headerAlign', 'showOverflowTooltip', 'sortable']);
}
</script>

<style lang="scss" src="./src/style.scss"/>
