<template>
  <div class="Card rounded surface elevated" :class="classes"><slot /></div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    elevation: { type: Number as PropType<2 | 3 | 4 | 6 | 8 | 12 | 16 | 24>, default: 1 },
  },
  setup(props) {
    const classes = computed(() => [`surface-${props.elevation}`].join(' '));
    return {
      classes,
    };
  },
});
</script>

<style scoped></style>
