<template>
  <div class="Group flex flex-col p-8 m-8 border border-white border-opacity-10 rounded-2xl">
    <h5 class="mb-4 text-primary">{{ title }}</h5>
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
