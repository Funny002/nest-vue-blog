<template>
  <div class="var-table-date">{{ values }}</div>
</template>

<script lang="ts">export default { name: 'VarTableIndex', inheritAttrs: false };</script>
<script lang="ts" setup>
import { IndexField } from '../types';
import { computed } from 'vue';

const props = withDefaults(defineProps<{ fields: IndexField; index: number }>(), {});

const values = computed(() => {
  const { pageCount, pageSize } = props.fields.page;
  return (pageCount - 1) * pageSize + props.index + 1;
});
</script>
