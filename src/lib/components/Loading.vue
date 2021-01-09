<template>
  <svg
    class="spinner"
    :class="{
      'w-6 h-6 thick-width': size === 'sm',
      'w-12 h-12': size === 'md',
      'w-24 h-24': size === 'lg',
    }"
    viewBox="0 0 56 56"
  >
    <circle
      class="path"
      fill="none"
      :stroke-width="size === 'sm' ? 6 : 4"
      stroke-linecap="round"
      cx="28"
      cy="28"
      r="25"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    size: { type: String as PropType<'sm' | 'md' | 'lg'>, default: 'md' },
  },
});
</script>

<style lang="scss" scoped>
$offset: 177;
$duration: 1.6s;

.spinner {
  animation: rotator $duration linear infinite;
}

@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}

.path {
  stroke-dasharray: $offset;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash $duration ease-in-out infinite, colors ($duration * 4) ease-in-out infinite;
  fill: transparent;
}

@keyframes colors {
  0% {
    stroke: theme('colors.secondary');
  }
  50% {
    stroke: theme('colors.primary');
  }
  100% {
    stroke: theme('colors.secondary');
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: $offset;
  }
  50% {
    stroke-dashoffset: $offset/4;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: $offset;
    transform: rotate(450deg);
  }
}
</style>
