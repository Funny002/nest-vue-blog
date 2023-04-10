<template>
  <div class="var-layoutAdmin">
    <div class="var-layoutAdmin__side">
      <div class=""></div>
    </div>
    <div class="var-layoutAdmin__container">
      <header class="var-layoutAdmin__header" v-if="$slots.header">
        <slot name="header"/>
      </header>
      <div class="var-layoutAdmin__container">
        <div class="var-layoutAdmin__side">
        </div>
        <div class="var-layoutAdmin__container">
          <div class="var-layoutAdmin__container">
            <slot/>
          </div>
          <footer class="var-layoutAdmin__footer" v-if="$slots.footer">
            <slot name="footer"/>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">export default { name: 'LayoutAdmin' };</script>
<script lang="ts" setup>
//
</script>

<style lang="scss" src="./src/style.scss"/>
