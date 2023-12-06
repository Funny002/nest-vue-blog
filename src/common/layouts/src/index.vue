<template>
  <div class="var-layout">
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

<style lang="scss">
.var-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  > * {
    width: 100%;
    flex: 0 0 auto;
  }

  &__header,
  &__footer {
    display: flex;
    align-items: center;
  }

  &__header {
    height: 50px;
  }

  &__footer {
    padding: 20px;
  }

  &__container {
    flex: 1 1 auto;
    position: relative;
  }
}
</style>
