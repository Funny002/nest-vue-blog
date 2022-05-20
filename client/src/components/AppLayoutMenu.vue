<script lang="ts">
import { defineComponent, h, ref, SetupContext, VNode, toRefs } from 'vue';
import { ElIcon, ElMenu, ElMenuItem, ElSubMenu } from 'element-plus';
import { IconsList } from './ElementIcon.vue';
import 'element-plus/theme-chalk/el-menu.css';
import 'element-plus/theme-chalk/el-sub-menu.css';
import 'element-plus/theme-chalk/el-menu-item.css';
import { useRouter } from 'vue-router';

export interface Props {
  mode: string;
  active: string;
  data: MenuItem[];
  collapse: boolean;
  properClass: string;
}

export interface Emits {
  click: (menu: MenuItem, index: string) => void
}

export interface RouterData {
  [key: string]: MenuItem
}

export interface MenuItem {
  has: string; // has -> index
  icon: string; // icon -> icon
  title: string; // title -> title
  router?: string; // router -> router
  childList?: MenuItem[], // childList -> el-menu-sub
}


function getMenuContent(data: MenuItem, routerData?: RouterData): VNode[] {
  if (routerData) routerData[data.router || ''] = data;
  const content = h('span', {class: ''}, data.title);
  return data.icon ? [h(ElIcon, {}, () => h((IconsList as { [key: string]: any })[data.icon]))].concat(content) : [content];
}

function createMenu(data: MenuItem[], callback: Emits['click'], keys?: string, routerData?: RouterData, popperClass?: string): VNode[] {
  return [...data].map((item: MenuItem, key: number): VNode => {
    const long = (item.childList || []).length;
    const index = item.has || (keys || '') + (key + 1);
    if (long) return h(ElSubMenu, {index, popperClass: popperClass || ''}, {
      default: () => {
        return createMenu(item.childList || [], callback, index + '-', routerData, popperClass);
      },
      title: () => {
        return getMenuContent(item);
      },
    });
    return h(ElMenuItem, {index, onClick: () => callback(item, index)}, {default: () => getMenuContent(item, routerData)});
  });
}

export default defineComponent({
  props: {
    data: {type: Array, default: () => []},
    mode: {type: String, default: 'vertical'},
    collapse: {type: Boolean, default: false},
    properClass: {type: String, default: ''},
  },
  emits: ['click'],
  setup(props: Props, {emit, expose}: SetupContext<Emits>) {
    const router = useRouter();
    const menu = ref(null);
    const {mode, data, collapse, properClass} = toRefs(props);
    const routerData = ref<{ [key: string]: MenuItem }>({});


    function getIndex(index: string) {
      return routerData.value[index];
    }

    expose({getIndex});

    return () => h(ElMenu, {class: 'app-layoutMenu', mode: mode.value, ref: menu, collapse: collapse.value, defaultActive: router.currentRoute.value.fullPath}, {
      default: () => {
        return createMenu(data.value || [], (...args) => emit('click', ...args), undefined, routerData.value, properClass.value);
      },
    });
  },
});
</script>
