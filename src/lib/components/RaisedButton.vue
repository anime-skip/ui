<template>
  <RaisedContainer
    class="RaisedButton flex flex-row min-h-10 px-4 py-2.5 cursor-pointer select-none"
    :secondary="secondary"
    :dark="dark"
    :disabled="disabled"
  >
    <span class="button-text space-x-4" :class="{ disabled }"><slot /></span>
  </RaisedContainer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RaisedContainer from './RaisedContainer.vue';

export default defineComponent({
  components: { RaisedContainer },
  props: {
    secondary: Boolean,
    dark: Boolean,
    disabled: Boolean,
  },
});
</script>

<style lang="css" scoped>
.button-text.disabled {
  @apply text-on-surface text-opacity-low;
}
</style>
