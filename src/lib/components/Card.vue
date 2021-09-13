<template>
  <div
    class="Card rounded surface elevated"
    :class="{
      'surface-1': elevation === 1,
      'surface-2': elevation === 2,
      'surface-3': elevation === 3,
      'surface-4': elevation === 4,
      'surface-6': elevation === 6,
      'surface-8': elevation === 8,
      'surface-12': elevation === 12,
      'surface-16': elevation === 16,
      'surface-24': elevation === 24,
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

<style scoped></style>
