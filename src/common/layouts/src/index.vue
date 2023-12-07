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
    display: flex;
    padding: 0 10px;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #ddd;

    &--btn {
      width: 35px;
      height: 35px;
      display: flex;
      cursor: pointer;
      margin-right: 10px;
      border-radius: 50%;
      align-items: center;
      justify-content: center;
      transition: border-radius .4s;

      &:hover {
        border-radius: 4px;
        background-color: #eee;
      }
    }
  }

  &__footer {
    display: flex;
    padding: 20px;
    flex-wrap: wrap;
    text-align: center;
    flex-direction: row;
    align-items: center;
    align-content: center;
    justify-content: center;
  }

  &__container {
    flex: 1 1 auto;
    position: relative;
  }
}
</style>
