<template>
  <el-form-item :label="fields.label" :prop="fields.prop">
    <Component :is="getFieldComponent(fields.type)" v-model="formData[fields.prop]"/>
  </el-form-item>
</template>

<script lang="ts">export default { name: 'DynamicFormField' };</script>

<script lang="ts" setup>
import { Fields } from '../types';
import * as ElementModels from 'element-plus';
import { inject } from 'vue';

interface Props {
  fields: Fields,
}

const { fields } = withDefaults(defineProps<Props>(), {});

const formData = inject('formData');

function getFieldComponent(type: string) {
  const keys = `El${type[0].toUpperCase() + type.slice(1)}`;
  if (keys in ElementModels) return (ElementModels as any)[keys];
  return null;
}
</script>
