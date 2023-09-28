<template>
  <div class="var-layoutAdmin">
    <div class="var-layoutAdmin__side">
      <div class="var-layoutAdmin__side--logo">
        <img :src="data.config.logo" :alt="data.config.title"/>
      </div>
      <div class="var-layoutAdmin__side--active">
        <!--        :style="{top: (menuActive.index * 50) + 'px'}"-->
        <div></div>
      </div>
      <template v-for="item in props.menu">
        <el-tooltip v-if="item.icon" :content="item.name " :visible="item.name  ? undefined : false" placement="right" effect="light">
          <bootstrap-icon class="var-layoutAdmin__side--item" :name="item.icon" @click="onClick(item)"/>
        </el-tooltip>
      </template>
    </div>
    <div class="var-layoutAdmin__body">
      <header class="var-layoutAdmin__header">
        <div class="var-layoutAdmin__header--btn" :style="`transform: rotateY(${data.isMini ? 0 : 180}deg)`" v-if="isExpand" @click.stop="data.isMini = !data.isMini">
          <el-icon>
            <Expand/>
          </el-icon>
        </div>
        <slot name="header"/>
      </header>
      <div class="var-layoutAdmin__nesting">
        <div class="var-layoutAdmin__menu" :class="{'is-mini': data.isMini}" v-if="isExpand">
          <!--          <el-menu class="var-layoutAdmin__menu&#45;&#45;body" :collapse="props.isMini">-->
          <!--            <template v-for="item of props.menuChildren">-->
          <!--              <el-sub-menu v-if="(item.childList || []).length" :index="item.name">-->
          <!--                <template #title>-->
          <!--                  <el-icon v-if="item.icon">-->
          <!--                    <component :is="item.icon"/>-->
          <!--                  </el-icon>-->
          <!--                  <span>{{ item.label }}</span>-->
          <!--                </template>-->
          <!--                <el-menu-item v-for="child of item.childList" :index="child.name" @click="onMenuClick(item)">-->
          <!--                  <el-icon v-if="child.icon">-->
          <!--                    <component :is="child.icon"/>-->
          <!--                  </el-icon>-->
          <!--                  <span>{{ child.label }}</span>-->
          <!--                </el-menu-item>-->
          <!--              </el-sub-menu>-->
          <!--              <el-menu-item v-else :index="item.name" @click="onMenuClick(item)">-->
          <!--                <el-icon v-if="item.icon">-->
          <!--                  <component :is="item.icon"/>-->
          <!--                </el-icon>-->
          <!--                <span>{{ item.label }}</span>-->
          <!--              </el-menu-item>-->
          <!--            </template>-->
          <!--          </el-menu>-->
        </div>
        <main class="var-layoutAdmin__container" :class="{'is-expand': isExpand, 'is-mini': data.isMini}">
          <slot/>
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">export default { name: 'LayoutAdmin' };</script>
<script lang="ts" setup>
import BootstrapIcon from '@plugin/bootstrap-icon/index.vue';
import { Expand } from '@element-plus/icons-vue';
import { useWebConfig } from '@stores/config';
import { computed, reactive } from 'vue';
import { storeToRefs } from 'pinia';

interface Props {
  menu: any[];
}

const props = withDefaults(defineProps<Props>(), { menu: () => [] });

const webConfig = useWebConfig();

const data = reactive<{
  isMini: boolean;
  config: ReturnType<typeof storeToRefs>
}>({
  isMini: false,
  config: storeToRefs(webConfig),
});

const isExpand = computed(() => {
  return true;
});

</script>

<style lang="scss" src="./style.scss"/>
