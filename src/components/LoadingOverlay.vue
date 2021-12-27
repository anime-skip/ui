<template>
  <div class="LoadingOverlay as-relative">
    <slot />
    <div
      class="as-bg-background as-bg-opacity-high as-flex as-absolute as-inset-0"
      v-if="isLoading"
    >
      <Loading class="as-m-auto" :size="size" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Loading from './Loading.vue';

export default defineComponent({
  name: 'LoadingOverlay',
  components: { Loading },
  props: {
    isLoading: { type: Boolean, required: true },
    size: { type: String as PropType<'sm' | 'md' | 'lg'>, default: 'md' },
  },
});
</script>
