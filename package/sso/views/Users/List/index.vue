<template>
  <div class="var-admin__body">
    <dynamic-form ref="formRef" :gutter="10" :fields="data.fields" :rules="data.rules" v-model="data.formData"/>
    <var-table ref="tableRef" :value="data.list" :data="data.columns">
      <template v-slot:avatar="{row}">
        <div style="height: 40px;">
          <el-avatar :src="row['avatar']" shape="square" :size="40" style="display: block; margin: 0 auto;"/>
        </div>
      </template>
    </var-table>
  </div>
</template>

<script lang="ts">export default { name: 'UsersList' };</script>
<script setup lang="ts">
import VarTable from '@models/VatTable/index.vue';
import DynamicForm from '@models/DynamicForm/index.vue';
import { TableFieldsItem } from '@models/VatTable/types';
import { onMounted, reactive } from 'vue';
import { ApiUsersList } from '@sso/api/users';
// import BootstrapIcon from '@plugin/bootstrap-icon/index.vue';

const ButtonOptions = [
  { label: '查看', type: 'success', name: 'view' },
  { label: '修改', type: 'primary', name: 'save' },
  'remove',
];

const data = reactive<any>({
  list: [],
  columns: [
    { label: '序号', type: 'index', width: '50px', align: 'center', showOverflowTooltip: false },
    { label: 'UID', prop: 'uid' },
    { label: '昵称', prop: 'name' },
    { label: '头像', prop: 'avatar', slot: 'avatar', width: '70px', align: 'center', showOverflowTooltip: false },
    { label: '邮箱', prop: 'email' },
    { label: '角色', prop: 'role' },
    { label: '状态', prop: 'state', showOverflowTooltip: false },
    { label: '注册时间', prop: 'create_time', width: '120px', type: 'date', format: 'Y-M-D H:I' },
    { label: '最后登录时间', prop: 'lest_login_time', width: '120px', type: 'date', format: 'Y-M-D H:I' },
    { label: '操作', type: 'button', width: '160px', group: true, align: 'center', showOverflowTooltip: false, options: ButtonOptions, click: onTableClick },
    //
  ],
  page: { total: 0, pageCount: 1, pageSize: 10 },
  formData: {},
  fields: [
    { span: 4, prop: 'name', type: 'text', placeholder: '请输入标题', clearable: true },
    { span: 4, prop: 'keys', type: 'text', placeholder: '请输入标识', clearable: true },
    // { span: 4, prop: 'types', type: 'select', placeholder: '请选择分类', clearable: true, options: typesOptions },
    { span: 4, prop: 'state', type: 'select', placeholder: '请选择状态', clearable: true, options: [{ label: '启用', value: '1' }, { label: '禁用', value: '0' }] },
  ],
  rules: {},
} as { columns: TableFieldsItem[] });

function getList() {
  data.load = true;
  ApiUsersList().then(({ data: res }) => {
    if (res.code === 0) {
      const { list, ...page } = res.data;
      data.list = list;
      data.page = page;
    }
  }).finally(() => setTimeout(() => data.load = false, 300));
}

onMounted(() => {
  data.columns[0].page = data.page;
  getList();
});

function onTableClick(...args: any[]) {
  console.log(args);
}
</script>
