<template>
  <div
    :ref="heightElement"
    class="as-transition-all as-overflow-hidden as-ease-out"
    :style="`max-height: ${displayHeight}px; transition-duration: ${durationMs}ms`"
  >
    <vue-resize-sensor @resize="resize">
      <slot v-if="showingContent" />
    </vue-resize-sensor>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import VueResizeSensor from '@seregpie/vue-resize-sensor';
import { useTimeout } from '../utils/useTimeout';

export default defineComponent({
  name: 'HeightReveal',
  components: { VueResizeSensor },
  props: {
    durationMs: { type: Number, default: 250 },
    visible: Boolean,
  },
  setup(props) {
    const actualHeight = ref(0);
    const heightElement = ref();
    onMounted(() => {
      actualHeight.value = heightElement.value?.clientHeight ?? 0;
    });
    const resize = ({ height: newHeight }: { width: number; height: number }) => {
      actualHeight.value = newHeight;
    };

    const showingContent = ref(props.visible);
    const [setShowingContentTimeout, clearShowingContentTimeout] = useTimeout();
    watch(
      () => props.visible,
      newVisible => {
        clearShowingContentTimeout();
        if (newVisible) {
          showingContent.value = true;
        } else {
          setShowingContentTimeout(() => {
            showingContent.value = false;
          }, props.durationMs);
        }
      }
    );

    const displayHeight = computed(() => {
      if (!props.visible) return 0;
      return actualHeight.value;
    });

    return {
      displayHeight,
      heightElement,
      resize,
      showingContent,
    };
  },
});
</script>
