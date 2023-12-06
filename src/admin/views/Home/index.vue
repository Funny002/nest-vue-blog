<template>
  Home
  <!--  <var-table :value="data.list" :data="data.columns"/>-->
</template>

<script lang="ts">export default { name: 'Home' };</script>
<script lang="ts" setup>
// import { ButtonFieldItem, TableFieldsItem } from '@models/VatTable/types';
// import VarTable from '@models/VatTable/index.vue';
// import { reactive } from 'vue';
//
// const ButtonOptions: ButtonFieldItem[] = [{ label: '添加下级', type: 'primary' }, { label: '修改' }, { label: '删除' }];
//
// const data = reactive<{ list: any[], columns: TableFieldsItem[] }>({
//   list: [
//     { create_time: Date.now(), state: true },
//     { create_time: Date.now(), state: false },
//   ],
//   columns: [
//     { label: '名称' },
//     { label: '路由' },
//     { label: '类型' },
//     { label: '标识' },
//     { label: '状态', prop: 'state', type: 'status', change: onStatusChange, activeText: '启用', inactiveText: '禁用' },
//     { label: '创建时间', prop: 'create_time', type: 'date' },
//     { label: '操作', type: 'button', width: '200px', options: ButtonOptions, click: onButtonClick },
//   ],
// });
//
// function onStatusChange(keys: number, value: boolean) {
//   data.list[keys]['state'] = value;
//   console.log('onStatusChange', keys, value);
// }
//
// function onButtonClick(keys: number, name: string) {
//   console.log('onButtonClick', keys, name);
// }
</script>

<style lang="scss" src="./src/style.scss"/>
