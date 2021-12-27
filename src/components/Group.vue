<template>
  <div
    class="as-flex as-flex-col as-p-8 as-m-8 as-border-2 as-border-on-surface as-border-opacity-divider as-rounded-2xl as-space-y-4"
  >
    <h5 class="as-text-primary">{{ title }}</h5>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: String,
  },
});
</script>
