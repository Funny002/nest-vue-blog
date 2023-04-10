<template>
  <div class="var-layoutAdmin" :class="{'is-mini': props.isMini}">
    <div class="var-layoutAdmin__side">
      <div class=""></div>
    </div>
    <div class="var-layoutAdmin__nesting" style="flex-direction: column;">
      <header class="var-layoutAdmin__header">
        <slot name="header"/>
      </header>
      <div class="var-layoutAdmin__nesting">
        <div class="var-layoutAdmin__menu">
        </div>
        <div class="var-layoutAdmin__container">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">export default { name: 'LayoutAdmin' };</script>
<script lang="ts" setup>
interface Props {
  isMini?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isMini: false,
});
</script>

<style lang="scss" src="./src/style.scss"/>
