<template>
  <el-table :data="props.value">
    <template v-for="item of props.data">
      <slot v-if="item.slot" :name="item.slot"/>
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
import { Fields } from './types';
import { reactive } from 'vue';

interface Props {
  value?: any[];
  data?: Fields[];
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

</script>

<style lang="scss" src="./src/style.scss"/>
