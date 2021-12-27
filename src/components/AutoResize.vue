<template>
  <div
    :ref="sizeElement"
    class="as-transition-all as-overflow-hidden as-ease-out"
    :style="`max-height: ${height}px; max-width: ${width}px`"
  >
    <vue-resize-sensor @resize="resize">
      <slot />
    </vue-resize-sensor>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import VueResizeSensor from '@seregpie/vue-resize-sensor';

export default defineComponent({
  name: 'AutoResize',
  components: { VueResizeSensor },
  setup() {
    const width = ref(0);
    const height = ref(0);
    const sizeElement = ref();
    onMounted(() => {
      width.value = sizeElement.value?.clientWidth ?? 0;
      height.value = sizeElement.value?.clientHeight ?? 0;
    });

    const resize = ({ height: newHeight, width: newWidth }: { width: number; height: number }) => {
      width.value = newWidth;
      height.value = newHeight;
    };

    return {
      width,
      height,
      sizeElement,
      resize,
    };
  },
});
</script>

<style scoped></style>
