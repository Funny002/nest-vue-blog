<template>
  <div class="var-adminHeaderNav">
    <el-button class="var-adminHeaderNav--btn" :icon="DArrowLeft" @click="viewMove('left')"/>
    <div class="var-adminHeaderNav__content" ref="ContentDom">
      <el-button
          :key="key"
          @click.stop="onClick(key)"
          :icon="IconsList[item.icon]"
          class="var-adminHeaderNav__tags"
          v-for="(item, key) in props.data"
          :type="props.active === item ? 'primary' : ''">
        {{ item.title }}
        <el-icon class="var-adminHeaderNav__tags--close" @click.stop="onCloseClick(key, props.active === item)">
          <Component :is="IconsList['CircleCloseFilled']"/>
        </el-icon>
      </el-button>
    </div>
    <el-button class="var-adminHeaderNav--btn" :icon="DArrowRight" @click="viewMove('right')"/>
    <el-dropdown>
      <el-button class="var-adminHeaderNav--btn" :icon="MoreFilled"/>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="ArrowRight" @click="onCloseTypes('right')">关闭右侧</el-dropdown-item>
          <el-dropdown-item :icon="ArrowLeft" @click="onCloseTypes('left')">关闭左侧</el-dropdown-item>
          <el-dropdown-item :icon="Close" divided @click="onAllClose">全部关闭</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ArrowLeft, ArrowRight, Close, DArrowLeft, DArrowRight, MoreFilled } from '@element-plus/icons-vue';
import { MenuItem } from './AppLayoutMenu.vue';
import { IconsList } from './ElementIcon.vue';
import { nextTick, ref, watch } from 'vue';

type MenuItem__ = MenuItem & { router: string }

interface Props {
  data: MenuItem__[]
  active: MenuItem__ | null
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  active: undefined,
});

const ContentDom = ref<HTMLElement | null>(null);

const emits = defineEmits(['change', 'click']);

watch(() => props.active, (active) => {
  active && nextTick(() => {
    onClick(props.data.indexOf(active), false);
  });
});

function setViewMove(left: number) {
  ContentDom.value?.scrollTo({left, behavior: 'smooth'});
}

function onClick(key: number, state: boolean = true) {
  const {children, scrollLeft: p1_s_l, offsetWidth: p1_o_w, offsetLeft: p1_0_l} = ContentDom.value as HTMLElement;
  const {offsetLeft: p2_o_l, offsetWidth: p2_o_w} = children[key] as HTMLElement;
  const p1 = p2_o_l - p1_0_l;
  if (p1 < p1_s_l) {
    setViewMove(p1);
  } else if (p1 + p2_o_w > p1_s_l + p1_o_w) {
    setViewMove(p1_s_l + (p1 + p2_o_w - p1_s_l - p1_o_w));
  }
  state && emits('click', props.data[key]);
}

function onCloseClick(key: number, state: boolean) {
  const long = props.data.length - 1;
  if (state && long) {
    emits('click', props.data[long]);
  }
  props.data.splice(key, 1);
  emits('change', props.data);
}

function onAllClose() {
  emits('change', []);
}

function onCloseTypes(types: 'left' | 'right') {
  if (props.active) {
    const index = props.data.indexOf(props.active);
    if (types === 'left') {
      emits('change', props.data.slice(index));
    } else {
      emits('change', props.data.slice(0, index + 1));
    }
  }
}

function viewMove(types: 'left' | 'right') {
  const {scrollLeft, offsetWidth} = ContentDom.value as HTMLElement;
  setViewMove(scrollLeft + (types === 'left' ? -offsetWidth : offsetWidth));
}
</script>

<style lang="scss" src="@scss/components/AdminHeaderNav.scss"/>