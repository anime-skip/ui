<template>
  <RaisedContainer
    class="RaisedButton flex flex-row min-h-10 px-4 py-2.5 cursor-pointer select-none"
    :secondary="secondary"
    :dark="dark"
    :disabled="disabled"
    :error="error"
  >
    <span
      class="button-text space-x-4"
      :class="{
        'text-on-primary': !secondary && !dark && !disabled && !error,
        'text-on-secondary': secondary && !dark && !disabled && !error,
        'text-on-surface': !secondary && dark && !disabled && !error,
        'text-on-surface text-opacity-low': disabled,
        'text-on-error': !secondary && !dark && !disabled && error,
      }"
      ><slot
    /></span>
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
    error: Boolean,
  },
});
</script>
