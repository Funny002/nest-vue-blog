<template>
  <var-dialog ref="dialogRef" :title="`${data.save ?' 修改' : '添加'}菜单`" :modal="false" width="400px" :loading="data.load">
    <dynamic-form ref="formRef" v-model="data.form" :fields="data.fields" :rules="data.rules" label-width="50px"/>
    <template v-slot:footer>
      <el-button type="primary" :icon="Check" :loading="data.load" @click.stop="onSubmit">提交</el-button>
    </template>
  </var-dialog>
</template>

<script lang="ts">export default { name: 'MenuDialog' };</script>
<script lang="ts" setup>
import DynamicForm from '@models/DynamicForm/index.vue';
import VarDialog from '@models/VarDialog/index.vue';
//
import { ApiMenuPost, ApiMenuSave, MenuItem } from '@api/menu';
import { Check } from '@element-plus/icons-vue';
import verify from '@models/DynamicForm/utils';
import { MessageError } from '@utils/message';
import { rewriteObj } from '@utils/object';
import { nextTick, reactive, ref } from 'vue';


const props = withDefaults(defineProps<{ tags: string }>(), {});

const formRef = ref<any>(null);
const dialogRef = ref<any>(null);

const typesOptions = [
  { label: '路由', value: 'router' },
  { label: '按钮', value: 'button' },
  { label: '资源', value: 'resource' },
  { label: '操作', value: 'operation' },
  { label: '重定向', value: 'redirect' },
];

const data = reactive<any>({
  form: {},
  saveId: 0,
  load: false,
  save: false,
  fields: [
    { prop: 'name', type: 'text', label: '标题', clearable: true },
    { prop: 'keys', type: 'text', label: '标识', clearable: true },
    { prop: 'types', type: 'select', label: '分类', clearable: true, options: typesOptions },
    { prop: 'values', type: 'text', label: '内容', clearable: true },
    { prop: 'state', type: 'status', label: '状态', clearable: true, activeText: '启用', inactiveText: '禁用', activeValue: 1, inactiveValue: 0 },
  ],
  rules: {
    name: [{ required: true, validator: verify(), trigger: 'change' }],
    keys: [{ required: true, validator: verify(), trigger: 'change' }],
    types: [{ required: true, validator: verify(), trigger: 'change' }],
    values: [{ required: true, validator: verify(), trigger: 'change' }],
  },
});

function init(row?: MenuItem) {
  data.save = !!row;
  data.saveId = row?.id;
  dialogRef.value?.show();
  nextTick(() => formRef.value?.ref.clearValidate());
  data.form = (row && rewriteObj(row, ['name', 'keys', 'tags', 'types', 'values', 'state'])) || { tags: props.tags, state: 0 };
}

defineExpose({ init });

const emits = defineEmits(['callback']);

function refresh() {
  data.save = false;
  data.saveId = 0;
  data.form = {};
}

function onSubmit() {
  formRef.value?.ref.validate((state: boolean) => {
    if (!state) return false;
    data.load = true;
    const ApiFunc = data.save ? ApiMenuSave(data.saveId, data.form) : ApiMenuPost(data.form);
    ApiFunc.then(({ data: res }) => {
      if (res.code === 0) {
        refresh();
        emits('callback');
        dialogRef.value?.hide();
      } else {
        MessageError(res.message);
      }
    }).finally(() => setTimeout(() => data.load = false, 100));
  });
}
</script>
