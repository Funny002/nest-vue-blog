<template>
  <div class="var-table-button" :class="{'el-button-group': styleProps.group || false}">
    <template v-for="item in options.view">
      <el-button @click="onClick(item.name || item.label)" v-bind="handleStyle(item)">{{ item.label }}</el-button>
    </template>
    <el-dropdown v-if="options.fold.length" @command="onClick">
      <button class="el-button el-button--small" :class="{'is-text': styleProps.hasText}" style="outline: none;">
        <el-icon v-if="styleProps.hasIcon">
          <ArrowDown/>
        </el-icon>
        <span v-else>更多</span>
      </button>
      <template #dropdown>
        <el-dropdown-menu>
          <template v-for="item in options.fold">
            <el-dropdown-item :command="item.name || item.label">{{ item.label }}</el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">export default { name: 'VarTableButton', inheritAttrs: false };</script>
<script lang="ts" setup>
import { computed, onMounted, reactive, watch } from 'vue';
import { ButtonField, ButtonFieldItem } from '../types';
import { ArrowDown } from '@element-plus/icons-vue';
import { rewriteObj } from '@utils/object';

const props = withDefaults(defineProps<{ fields: ButtonField; index: number, row: any }>(), {});

const styleProps = computed(() => {
  const target = rewriteObj(props.fields, ['max', 'group', 'hasIcon', 'hasText']);
  target.hasIcon = 'hasIcon' in target ? target.hasIcon : true;
  if (target.hasText) target.group = true;
  return target;
});

const data = reactive<any>({
  options: [],
  backup: JSON.stringify(props.fields.options),
});

const options = computed(() => {
  const view = [...data.options];
  const max = styleProps.value['max'];
  if (!max) return { view, fold: [] };
  return { view, fold: view.splice(max) };
});

const defaultButton: { [Key: string]: ButtonFieldItem } = {
  add: { label: '添加', type: 'success', name: 'add' },
  view: { label: '查看', type: 'primary', name: 'view' },
  save: { label: '修改', type: 'warning', name: 'save' },
  remove: { label: '删除', type: 'danger', name: 'remove' },
};

function reRender() {
  const options = props.fields.options;
  const target: ButtonFieldItem[] = [];
  for (const item of options) {
    const data = (typeof item === 'string' ? defaultButton[item] : item) || null;
    if (data) target.push(data);
  }
  data.options = target;
}

watch(() => props, props => {
  if (JSON.stringify(props.fields.options) !== data.backup) {
    reRender();
  }
});

function handleStyle(data: ButtonFieldItem) {
  const target = rewriteObj(data, ['icon', 'text', 'link', 'color', 'plain', 'loading', 'disabled', 'type']);
  if ('hasIcon' in styleProps.value && !styleProps.value.hasIcon) target.icon = undefined;
  if ('hasText' in styleProps.value) target.text = styleProps.value.hasText;
  return target;
}

onMounted(() => reRender());

function onClick(name?: string) {
  const { index, fields: { click }, row } = props;
  click && click(row, name || '', index);
}
</script>
