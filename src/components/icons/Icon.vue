<template>
  <svg class="Icon as-pointer-events-none as-transition-colors" :class="styles" viewBox="0 0 24 24">
    <path :d="path" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

type Size = 'sm' | 'md';
const SIZES = {
  sm: 'as-w-4 as-h-4',
  md: 'as-w-6 as-h-6',
};

export default defineComponent({
  name: 'Icon',
  props: {
    size: { type: String as PropType<Size>, default: 'md' },
    path: { type: String, required: true },
    active: Boolean,
    disabled: Boolean,
  },
  computed: {
    styles(): { [styles: string]: boolean } {
      return {
        [SIZES[this.size]]: true,
        'as-opacity-medium': !this.active && !this.disabled,
        'as-opacity-100': this.active && !this.disabled,
        'as-opacity-low': this.disabled,
      };
    },
  },
});
</script>
