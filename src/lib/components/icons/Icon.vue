<template>
  <svg class="Icon pointer-events-none transition-colors" :class="styles" viewBox="0 0 24 24">
    <path :d="path" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

type Size = 'sm' | 'md';
const SIZES = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
};

export default defineComponent({
  props: {
    size: { type: String as PropType<Size>, default: 'md' },
    path: String,
    active: Boolean,
    disabled: Boolean,
  },
  computed: {
    styles(): { [styles: string]: boolean } {
      return {
        [SIZES[this.size]]: true,
        'opacity-medium': !this.active && !this.disabled,
        'opacity-100': this.active && !this.disabled,
        'opacity-low': this.disabled,
      };
    },
  },
});
</script>
