<template>
  <svg class="Icon pointer-events-none transition-colors" :class="styles" viewBox="0 0 24 24">
    <path :d="path" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    size: { type: Number, default: 6 },
    path: String,
    active: Boolean,
    disabled: Boolean,
  },
  computed: {
    styles(): { [styles: string]: boolean } {
      return {
        [`h-${this.size} w-${this.size}`]: true,
        'opacity-medium': !this.active && !this.disabled,
        'opacity-100': this.active && !this.disabled,
        'opacity-low': this.disabled,
      };
    },
  },
});
</script>
