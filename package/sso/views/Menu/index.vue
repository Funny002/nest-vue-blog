<template>
  <div class="var-viewMenu">
    <el-tabs v-model="data.tagsValue" @tab-change="onTagsChange">
      <el-tab-pane name="sso" label="Sso 服务"/>
      <el-tab-pane name="blog" label="Blog 服务"/>
    </el-tabs>
    <div class="var-viewMenu__body" v-loading="data.load">
      <div class="var-viewMenu__header">
        <dynamic-form class="var-viewMenu__header-form" ref="formRef" :gutter="10" :fields="data.fields" :rules="data.rules" v-model="data.formData"/>
        <div class="var-viewMenu__header-button">
          <el-button type="primary" @click.stop="getList" :icon="Search">搜索</el-button>
          <el-button type="primary" @click.stop="AddDialogRef?.init()" :icon="Plus">添加</el-button>
        </div>
      </div>
      <var-table ref="tableRef" :value="data.list" :data="data.columns" row-key="id">
        <template v-slot:icon="{row}">
          <bootstrap-icon :name="row['icon']"/>
        </template>
      </var-table>
    </div>
  </div>
  <menu-dialog ref="AddDialogRef" :tags="data.tagsValue" @callback="getList"/>
</template>

<script lang="ts">export default { name: 'Router' };</script>
<script lang="ts" setup>
import MenuDialog from './src/dialog.vue';
import VarTable from '@models/VatTable/index.vue';
import DynamicForm from '@models/DynamicForm/index.vue';
import BootstrapIcon from '@plugin/bootstrap-icon/index.vue';
//
import { ApiMenuList, ApiMenuRemove, ApiMenuSaveState, MenuItem } from '@api/menu';
import { TableFieldsItem } from '@models/VatTable/types';
import { Plus, Search } from '@element-plus/icons-vue';
import { listToTree, treeSort } from '@utils/object';
import { onMounted, reactive, ref } from 'vue';
import { MessageError } from '@utils/message';
import { ElMessage } from 'element-plus';
import { throttle } from '@utils/limit';
import { useRoute } from 'vue-router';

const route = useRoute();
const AddDialogRef = ref<any>(null);
const typesOptions = { router: '路由', button: '按钮', redirect: '重定向', resource: '资源', operation: '操作' };
const ButtonOptions = [
  { label: '添加子项', type: 'primary', name: 'addChild' },
  { label: '查看', type: 'success', name: 'view' },
  { label: '修改', type: 'primary', name: 'save' },
  'remove',
];

const data = reactive<any>({
  // tags
  tagsValue: '',
  // table
  list: [],
  columns: [
    { label: '标题', prop: 'name' },
    { label: '排序', prop: 'sort', width: '50px', align: 'center' },
    { label: '标识', prop: 'keys' },
    { label: '分类', prop: 'types', type: 'tags', options: typesOptions },
    { label: '图标', prop: 'icon', slot: 'icon', width: '50px', align: 'center' },
    { label: '内容', prop: 'values' },
    { label: '状态', prop: 'state', type: 'status', activeText: '启用', inactiveText: '禁用', activeValue: '1', inactiveValue: '0', inlinePrompt: true, change: onStateChange },
    { label: '创建时间', prop: 'create_time', type: 'date', format: 'Y-M-D H:I:S' },
    { label: '操作', type: 'button', width: '240px', options: ButtonOptions, group: true, align: 'center', click: onButtonClick },
  ],
  // form
  formData: {},
  fields: [
    { span: 4, prop: 'name', type: 'text', placeholder: '请输入标题', clearable: true },
    { span: 4, prop: 'keys', type: 'text', placeholder: '请输入标识', clearable: true },
    { span: 4, prop: 'types', type: 'select', placeholder: '请选择分类', clearable: true },
    { span: 4, prop: 'state', type: 'switch', placeholder: '请选择状态', clearable: true },
  ],
  rules: {},
} as { columns: TableFieldsItem[] });

const onTagsChange = throttle(getList, 300, () => data.load = true);

function getParams() {
  return Object.assign({ tag: data.tagsValue }, data.formData);
}

function getList() {
  data.load = true;
  ApiMenuList(getParams()).then(({ data: res }) => {
    if (res.code === 0) {
      data.list = treeSort(listToTree(res.data));
    } else {
      ElMessage.error(res.message);
    }
  }).finally(() => setTimeout(() => data.load = false, 100));
}

onMounted(() => {
  data.tagsValue = route.query.tags || 'sso';
  getList();
});

function onViewButton(row: MenuItem) {
  console.log('onViewButton', row);
  // ApiMenuInfo(row.id).then(({ data: res }) => {
  //   console.log(res);
  // });
}

function onRemoveButton(row: MenuItem) {
  console.log(row);
  data.load = true;
  ApiMenuRemove(row.id).then(({ data: res }) => {
    if (res.code === 0) {
      getList();
    } else {
      MessageError(res.message);
      setTimeout(() => data.load = false, 100);
    }
  });
}

function onButtonClick(row: any, name: string) {
  const FuncMap: { [Name: string]: (row: MenuItem) => void } = {
    'view': onViewButton,
    'remove': onRemoveButton,
    'save': AddDialogRef.value?.save,
    'addChild': AddDialogRef.value?.addChild,
  };
  FuncMap[name] && FuncMap[name](row);
}

function onStateChange(row: any, state: number) {
  data.load = true;
  ApiMenuSaveState(row.id, state).then(({ data: res }) => {
    if (res.code === 0) {
      row.state = state;
    } else {
      MessageError(res.message);
    }
  }).finally(() => setTimeout(() => data.load = false, 100));
}
</script>

<style lang="scss" src="./src/style.scss"/>
