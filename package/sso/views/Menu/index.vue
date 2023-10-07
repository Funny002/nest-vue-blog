<template>
  <div class="var-viewMenu">
    <el-tabs v-model="data.tagsValue" @tab-change="onTagsChange">
      <el-tab-pane name="sso" label="Sso 服务"/>
      <!--      <el-tab-pane name="blog" label="Blog 服务"/>-->
    </el-tabs>
    <div class="var-viewMenu__body" v-loading="data.load">
      <div class="var-viewMenu__header">
        <dynamic-form class="var-viewMenu__header-form" ref="formRef" :gutter="10" :fields="data.fields" :rules="data.rules" v-model="data.formData"/>
        <div class="var-viewMenu__header-button">
          <el-button type="primary" :icon="Search" @click.stop="onSearchParams(true)">搜索</el-button>
          <el-button type="info" :icon="Delete" @click.stop="onSearchParams(false)">清空搜索</el-button>
          <el-divider direction="vertical"/>
          <el-button type="primary" :icon="Plus" @click.stop="AddDialogRef?.init()">添加</el-button>
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
import { Delete, Plus, Search } from '@element-plus/icons-vue';
import { listToTree, treeSort } from '@utils/object';
import { computed, onMounted, reactive, ref } from 'vue';
import { MessageError } from '@utils/message';
import { ElMessage } from 'element-plus';
import { document } from '@utils/limit';
import { useRoute } from 'vue-router';

const route = useRoute();
const AddDialogRef = ref<any>(null);
const typesButton = { router: '路由', button: '按钮', redirect: '重定向', resource: '资源', operation: '操作' };
const ButtonOptions = [
  { label: '添加子项', type: 'primary', name: 'addChild' },
  { label: '查看', type: 'success', name: 'view' },
  { label: '修改', type: 'primary', name: 'save' },
  'remove',
];
const typesOptions = [
  { label: '路由', value: 'router' },
  { label: '按钮', value: 'button' },
  { label: '资源', value: 'resource' },
  { label: '操作', value: 'operation' },
  { label: '重定向', value: 'redirect' },
  { label: '分割线', value: 'divider' },
  { label: '标题', value: 'title' },
  { label: '文本', value: 'text' },
  { label: '图标', value: 'icon' },
  { label: '图片', value: 'image' },
  { label: '视频', value: 'video' },
  { label: '音频', value: 'audio' },
  { label: '表单', value: 'form' },
  { label: '表格', value: 'table' },
  { label: '卡片', value: 'card' },
  { label: '列表', value: 'list' },
  { label: '标签', value: 'tag' },
  { label: '进度条', value: 'progress' },
  { label: '按钮', value: 'button' },
  { label: '弹窗', value: 'dialog' },
  { label: '抽屉', value: 'drawer' },
  { label: '折叠面板', value: 'collapse' },
  { label: '轮播图', value: 'carousel' },
  { label: '树形控件', value: 'tree' },
  { label: '时间线', value: 'timeline' },
  { label: '分页', value: 'pagination' },
  { label: '文字提示', value: 'tooltip' },
  { label: '气泡提示', value: 'popover' },
  { label: '标签页', value: 'tabs' },
  { label: '栅格布局', value: 'grid' },
  { label: '代码块', value: 'code' },
  { label: '滚动条', value: 'scroll' },
  { label: '穿梭框', value: 'transfer' },
]

const data = reactive<any>({
  // tags
  tagsValue: '',
  // table
  list: [],
  columns: [
    { label: '标题', prop: 'name' },
    { label: '排序', prop: 'sort', width: '50px', align: 'center' },
    { label: '标识', prop: 'keys' },
    { label: '分类', prop: 'types', type: 'tags', options: typesButton },
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
    { span: 4, prop: 'types', type: 'select', placeholder: '请选择分类', clearable: true, options: typesOptions },
    { span: 4, prop: 'state', type: 'select', placeholder: '请选择状态', clearable: true, options: [{ label: '启用', value: '1' }, { label: '禁用', value: '0' }] },
  ],
  rules: {},
} as { columns: TableFieldsItem[] });

function getParams() {
  return Object.assign({ tag: data.tagsValue }, data.formData);
}

function onSearchParams(state = true) {
  if (!state) data.formData = {};
  getList();
}

const onTagsChange = document(() => onSearchParams(false), 300);

function getList() {
  data.load = true;
  ApiMenuList(getParams()).then(({ data: res }) => {
    if (res.code === 0) {
      data.list = treeSort(listToTree(res.data));
    } else {
      ElMessage.error(res.message);
    }
  }).finally(() => setTimeout(() => data.load = false, 300));
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
      setTimeout(() => data.load = false, 300);
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
  }).finally(() => setTimeout(() => data.load = false, 300));
}
</script>

<style lang="scss" src="./src/style.scss"/>
