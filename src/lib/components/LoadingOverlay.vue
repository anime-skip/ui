<template>
  <div class="ProgressOverlay relative">
    <slot />
    <div class="bg-background bg-opacity-high flex absolute inset-0" v-if="isLoading">
      <Loading class="m-auto" :size="size" />
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
