<template>
  <button
    class="FlatButton flex flex-row justify-center items-center rounded min-h-10 px-4 py-2.5 cursor-pointer select-none overflow-x-hidden"
    :class="{
      'surface surface-primary': !disabled && !secondary && !transparent,
      'surface surface-secondary': !disabled && secondary,
      transparent: !disabled && transparent,
      'bg-control-disabled pointer-events-none': disabled,
    }"
  >
    <p class="button-text" :class="{ disabled }"><slot /></p>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    secondary: Boolean,
    transparent: Boolean,
    disabled: Boolean,
  },
});
</script>

<style lang="scss" scoped>
@import '../scss/theme.scss';

.FlatButton {
  transition: ease 200ms filter;

  &:hover {
    filter: brightness(110%);
  }
  &:hover:active {
    filter: brightness(120%) saturate(95%);
  }

  &.transparent {
    background-color: transparent;
    transition-property: background-color;
    &:hover {
      background-color: rgba($color: $backgroundColor-on-surface, $alpha: 0.1);
    }
    &:hover:active {
      background-color: rgba($color: $backgroundColor-on-surface, $alpha: 0.2);
    }
  }
}

.button-text.disabled {
  @apply text-on-surface text-opacity-low;
}
</style>
