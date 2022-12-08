<template>
  <div class="var-layout" :class="{
  'is-side': !!$slots.side,
  'is-header': !!$slots.header,
  'is-side-mini': data.sideMini,
}">
    <div class="var-layout__header" v-if="$slots.header">
      <slot name="header">header</slot>
    </div>
    <div class="var-layout__body" style="flex-direction: column;">
      <div class="var-layout__content">
        <slot>content</slot>
      </div>
      <div class="var-layout__footer" v-if="$slots.footer">
        <slot name="footer">footer</slot>
      </div>
    </div>
    <template v-if="$slots.side">
      <div class="var-layout__side">
        <slot name="side" :hasMini="data.sideMini">side</slot>
        <div class="var-layout__side--btn" @click.stop="(data.sideMini = !data.sideMini)">
          <icon-left/>
        </div>
      </div>
      <div class="var-layout__side--nav" style="display: none;"/>
    </template>
  </div>
</template>

<script lang="ts">export default { name: 'VarLayout' };</script>

<script lang="ts" setup>
import { reactive } from 'vue';
import { ChevronLeft12Regular as IconLeft } from '@vicons/fluent';

const data = reactive({ sideMini: false });
</script>

<style lang="scss" src="@scss/models/VarLayout.scss"/>