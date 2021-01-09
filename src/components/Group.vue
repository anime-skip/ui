<template>
  <div
    class="Group flex flex-col p-8 m-8 border-2 border-on-surface border-opacity-divider rounded-2xl space-y-4"
  >
    <h5 class="text-primary">{{ title }}</h5>
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
