<template>
  UsersList
  <!--  <div class="var-viewMenu">-->
<!--    <el-tabs v-model="data.tagsValue" @tab-change="onTagsChange">-->
<!--      <el-tab-pane name="sso" label="Sso 服务"/>-->
<!--      <el-tab-pane name="blog" label="Blog 服务"/>-->
<!--    </el-tabs>-->
<!--    <div class="var-viewMenu__body" v-loading="data.load">-->
<!--      <div class="var-viewMenu__header">-->
<!--        <dynamic-form class="var-viewMenu__header-form" ref="formRef" :gutter="10" :fields="data.fields" :rules="data.rules" v-model="data.formData"/>-->
<!--        <div class="var-viewMenu__header-button">-->
<!--          <el-button type="primary" @click.stop="AddDialogRef?.init" :icon="Plus">添加</el-button>-->
<!--        </div>-->
<!--      </div>-->
<!--      <var-table ref="tableRef" :value="data.list" :data="data.columns"/>-->
<!--      <el-pagination-->
<!--        small-->
<!--        background-->
<!--        hide-on-single-page-->
<!--        :total="data.page.total"-->
<!--        @current-change="getList"-->
<!--        class="var-viewMenu__footer"-->
<!--        @size-change="onPageSizeChange"-->
<!--        :page-sizes="[10, 20, 50, 100]"-->
<!--        v-model:page-size="data.page.pageSize"-->
<!--        v-model:page-count="data.page.pageCount"-->
<!--        layout="prev, pager, next, sizes, total, ->, jumper"/>-->
<!--    </div>-->
<!--    <menu-dialog ref="AddDialogRef" :tags="data.tagsValue" @callback="getList"/>-->
<!--  </div>-->
</template>

<script lang="ts">export default { name: 'Router' };</script>
<script lang="ts" setup>
// import MenuDialog from './src/dialog.vue';
// import VarTable from '@models/VatTable/index.vue';
// import DynamicForm from '@models/DynamicForm/index.vue';
// //
// import { ApiMenuList, ApiMenuRemove, ApiMenuSaveState, MenuItem } from '@api/menu';
// import { TableFieldsItem } from '@models/VatTable/types';
// import { onMounted, reactive, ref } from 'vue';
// import { Plus } from '@element-plus/icons-vue';
// import { MessageError } from '@utils/message';
// import { rewriteObj } from '@utils/object';
// import { ElMessage } from 'element-plus';
// import { throttle } from '@utils/limit';
// import { useRoute } from 'vue-router';
//
// const route = useRoute();
// const AddDialogRef = ref<any>(null);
// const typesOptions = { router: '路由', button: '按钮', redirect: '重定向', resource: '资源', operation: '操作' };
// const ButtonOptions = [
//   { label: '添加子项', type: 'primary', name: 'addChild' },
//   { label: '查看', type: 'success', name: 'view' },
//   { label: '修改', type: 'primary', name: 'save' },
//   'remove',
// ];
//
// const data = reactive<any>({
//   // tags
//   tagsValue: '',
//   // table
//   list: [],
//   columns: [
//     // { label: '序号', type: 'index', width: '50px', align: 'center' },
//     { label: '排序', prop: 'sort', width: '50px', align: 'center' },
//     { label: '标题', prop: 'name' },
//     { label: '标识', prop: 'keys' },
//     { label: '分类', prop: 'types', type: 'tags', options: typesOptions },
//     { label: '内容', prop: 'values' },
//     { label: '状态', prop: 'state', type: 'status', activeText: '启用', inactiveText: '禁用', activeValue: 1, inactiveValue: 0, inlinePrompt: true, change: onStateChange },
//     { label: '创建时间', prop: 'create_time', type: 'date', format: 'Y-M-D H:I:S' },
//     { label: '操作', type: 'button', width: '240px', options: ButtonOptions, group: true, align: 'center', click: onButtonClick },
//   ],
//   page: { pageCount: 1, pageSize: 20, total: 0, orderBy: 'sort', orderKey: 'ASC' },
//   // form
//   formData: {},
//   fields: [
//     { span: 4, prop: 'name', type: 'text', placeholder: '请输入标题', clearable: true },
//     { span: 4, prop: 'keys', type: 'text', placeholder: '请输入标识', clearable: true },
//     { span: 4, prop: 'types', type: 'select', placeholder: '请选择分类', clearable: true },
//     { span: 4, prop: 'state', type: 'switch', placeholder: '请选择状态', clearable: true },
//   ],
//   rules: {},
// } as { columns: TableFieldsItem[] });
//
// const onTagsChange = throttle(getList, 300);
//
// function getParams() {
//   const page = rewriteObj(data.page, ['pageCount', 'pageSize', 'orderBy', 'orderKey']);
//   return Object.assign({ tags: data.tagsValue }, data.formData, page);
// }
//
// function onPageSizeChange() {
//   data.page.pageCount = 1;
//   console.log(data.page);
//   getList();
// }
//
// function getList() {
//   data.load = true;
//   ApiMenuList(getParams()).then(({ data: res }) => {
//     if (res.code === 0) {
//       const { list, ...page } = res.data;
//       data.list = list;
//       data.page = page;
//     } else {
//       ElMessage.error(res.message);
//     }
//   }).finally(() => setTimeout(() => data.load = false, 100));
// }
//
// onMounted(() => {
//   data.columns[0].page = data.page;
//   data.tagsValue = route.query.tags || 'sso';
//   getList();
// });
//
// function onViewButton(row: MenuItem) {
//   console.log('onViewButton', row);
//   // ApiMenuInfo(row.id).then(({ data: res }) => {
//   //   console.log(res);
//   // });
// }
//
// function onRemoveButton(row: MenuItem) {
//   console.log(row);
//   data.load = true;
//   ApiMenuRemove(row.id).then(({ data: res }) => {
//     if (res.code === 0) {
//       getList();
//     } else {
//       MessageError(res.message);
//       setTimeout(() => data.load = false, 100);
//     }
//   });
// }
//
// function onButtonClick(keys: number, name: string) {
//   const FuncMap: { [Name: string]: (row: MenuItem, keys: number) => void } = {
//     'view': onViewButton,
//     'remove': onRemoveButton,
//     'save': AddDialogRef.value?.save,
//     'addChild': AddDialogRef.value?.addChild,
//   };
//   FuncMap[name] && FuncMap[name](data.list[keys], keys);
// }
//
// function onStateChange(index: number, state: number) {
//   data.load = true;
//   const row = data.list[index];
//   ApiMenuSaveState(row.id, state).then(({ data: res }) => {
//     if (res.code === 0) {
//       row.state = state;
//     } else {
//       MessageError(res.message);
//     }
//   }).finally(() => setTimeout(() => data.load = false, 100));
// }
</script>

<style lang="scss" src="./src/style.scss"/>
