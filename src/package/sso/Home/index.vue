<template>
  <div>
    Home
    <nav-menu :list="menu" active="name + 1"></nav-menu>
  </div>
</template>

<script lang="ts">
import NavMenu from '@models/NavMenu/index.vue';
import { defineComponent, reactive, toRefs } from 'vue';
import { AddCircle28Regular } from '@vicons/fluent';

const Home = defineComponent({
  name: 'home',
  components: { NavMenu },
  setup() {
    const data = reactive({
      menu: [],
    } as any);
    
    for (let i = 0; i < 10; i++) {
      data.menu.push({ icon: AddCircle28Regular, name: 'name + ' + i, label: 'label + ' + i });
    }
    
    return { ...toRefs(data) };
  },
});

export default Home;
</script>