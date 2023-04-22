<template>
  <div class="var-table-date">{{ values }}</div>
</template>

<script lang="ts">export default { name: 'VarTableDate', inheritAttrs: false };</script>
<script lang="ts" setup>
import { dateFormat } from '@utils/date';
import { DateField } from '../types';
import { computed } from 'vue';

const props = withDefaults(defineProps<{ fields: DateField; value: any; }>(), {});

const values = computed(() => {
  const { value, fields: { format } } = props;
  return dateFormat(format || 'Y-m-d h:i:s', value);
});
</script>
