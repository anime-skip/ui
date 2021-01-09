<template>
  <svg
    class="Icon h-6 w-6 pointer-events-none transition-colors"
    :class="{
      'opacity-medium': !active && !disabled,
      'opacity-100': active && !disabled,
      'opacity-low': disabled,
    }"
    viewBox="0 0 24 24"
  >
    <path :d="path" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    path: String,
    active: Boolean,
    disabled: Boolean,
  },
});
</script>
