<script lang="ts">
import { defineComponent, h, SetupContext, VNode } from 'vue';
import { ElIcon, ElMenu, ElMenuItem, ElSubMenu } from 'element-plus';
import { IconsList } from './ElementIcon.vue';
import 'element-plus/theme-chalk/el-menu.css';
import 'element-plus/theme-chalk/el-sub-menu.css';
import 'element-plus/theme-chalk/el-menu-item.css';

export interface Props {
  data: MenuItem[]
}

export interface Emits {
  click: (menu: MenuItem) => void
}

export interface MenuItem {
  has: string; // has -> index
  icon: string; // icon -> icon
  title: string; // title -> title
  router?: string; // router -> router
  childList: MenuItem[], // childList -> el-menu-sub
}

function getMenuContent(data: MenuItem): VNode[] {
  const content = h('span', {class: ''}, data.title);
  return data.icon ? [h(ElIcon, {}, () => h(IconsList[data.icon]))].concat(content) : [content];
}

function createMenu(data: MenuItem[], callback: Emits['click'], keys?: string): VNode[] {
  return [...data].map((item: MenuItem, key: number): VNode => {
    const long = (item.childList || []).length;
    const index = item.has || (keys || '') + (key + 1);
    if (long) return h(ElSubMenu, {index}, {
      default: () => {
        return createMenu(item.childList, callback, index + '-');
      },
      title: () => {
        return getMenuContent(item);
      },
    });
    return h(ElMenuItem, {index, onClick: e => callback(item, index, e)}, {default: () => getMenuContent(item)});
  });
}

export default defineComponent({
  props: {
    data: {type: Array, default: () => []},
    mode: {type: String, default: 'vertical'},
    collapse: {type: Boolean, default: false},
  },
  emits: ['click'],
  setup({mode, data, collapse}: Props, {emit}: SetupContext<Emits>) {
    return () => h(ElMenu, {mode, collapse}, {
      default: () => {
        return createMenu(data || [], (...args) => emit('click', ...args));
      },
    });
  },
});
</script>
