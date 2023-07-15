<template>
  <var-dialog ref="dialogRef" :title="`${data.save ?' 修改' : '添加'}菜单`" :modal="false">
    {{ data.form }}
    <dynamic-form v-model="data.form" :fields="data.fields" :rules="data.rules"/>
  </var-dialog>
</template>

<script lang="ts">export default { name: 'MenuDialog' };</script>
<script lang="ts" setup>
import { HomeFilled } from '@element-plus/icons-vue';
import VarDialog from '@models/VarDialog/index.vue';
import { ApiMenuPost, ApiMenuSave, MenuItem } from '@api/menu';
import { reactive, ref } from 'vue';
import DynamicForm from '@models/DynamicForm/index.vue';

const dialogRef = ref<any>(null);

const data = reactive<any>({
  form: {},
  fields: [
    { prop: 'name', type: 'text', label: '标题', clearable: true },
    { prop: 'keys', type: 'text', label: '分类', clearable: true },
    { prop: 'types', type: 'select', label: '内容', clearable: true },
    { prop: 'state', type: 'select', label: '状态', clearable: true },
  ],
  rules: {},
});

// ApiMenuPost
// ApiMenuSave

function init(row?: MenuItem) {
  data.form = {};
  data.save = !!row;
  if (row) {
    //
  }
  dialogRef.value?.show();
}

defineExpose({ init });
</script>
