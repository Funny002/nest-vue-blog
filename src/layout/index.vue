<template>
  <div class="var-layout" :class="classes">
    <header class="var-layout__header" v-if="$slots.header">
      <slot name="header"/>
    </header>
    <div class="var-layout__container">
      <slot/>
    </div>
    <footer class="var-layout__footer" v-if="$slots.footer">
      <slot name="footer"/>
    </footer>
  </div>
</template>

<script lang="ts">export default { name: 'Layout' };</script>
<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  type?: 'flex' | 'block';
}

const props = withDefaults(defineProps<Props>(), {
  type: 'block',
});

const classes = computed(() => {
  const target: { [k: string]: any } = {};
  if (props.type === 'flex') target['is-flex'] = true;
  return target;
});
</script>

<style lang="scss" src="./src/style.scss"/>
