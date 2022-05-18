<script lang="ts">
import { defineComponent, h, Component } from 'vue';
import * as Icons from '@element-plus/icons-vue';

export * as IconsList from '@element-plus/icons-vue';

export default defineComponent({
  setup: (props: { name: string }) => {
    return () => h((Icons as { [key: string]: Component })[props.name]);
  },
});
</script>