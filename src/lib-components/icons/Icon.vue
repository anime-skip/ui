<template>
  <svg
    class="Icon h-6 w-6 pointer-events-none transition-colors emphasis-medium"
    :class="{
      'emphasis-high': emphasisHigh,
      'emphasis-low': emphasisLow,
    }"
    style="width: 24px; height: 24px"
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
    emphasisLow: Boolean,
    emphasisHigh: Boolean,
  },
});
</script>
