<template>
  <div
    class="as-rounded as-surface as-elevated"
    :class="{
      'as-surface-1': elevation === 1,
      'as-surface-2': elevation === 2,
      'as-surface-3': elevation === 3,
      'as-surface-4': elevation === 4,
      'as-surface-6': elevation === 6,
      'as-surface-8': elevation === 8,
      'as-surface-12': elevation === 12,
      'as-surface-16': elevation === 16,
      'as-surface-24': elevation === 24,
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

type ElevationLevel = 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16 | 24;

export default defineComponent({
  name: 'Card',
  props: {
    elevation: { type: Number as PropType<ElevationLevel>, default: 1 },
  },
});
</script>
