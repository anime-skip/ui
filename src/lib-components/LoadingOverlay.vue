<template>
  <div class="ProgressOverlay relative">
    <slot />
    <div
      class="spinner-wrapper flex flex-col items-center absolute left-0 right-0 top-0 bottom-0"
      v-if="isLoading"
    >
      <Loading :size="size" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    isLoading: { type: Boolean, required: true },
    size: { type: String as PropType<'sm' | 'md' | 'lg'>, default: 'md' },
  },
});
</script>

<style lang="scss" scoped>
@import '../lib-scss/colors.scss';

.ProgressOverlay {
  position: relative;

  .spinner-wrapper {
    background-color: rgba($color: $background, $alpha: 0.8);
    justify-content: space-around;
  }
}
</style>
