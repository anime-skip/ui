<template>
  <div
    class="FlatButton flex flex-row justify-center items-center rounded min-h-10 px-4 py-2 cursor-pointer select-none overflow-x-hidden"
    :class="{
      'bg-primary': !secondary && !transparent,
      'bg-secondary': secondary,
      transparent,
    }"
  >
    <p class="button-text" :class="{ disabled }"><slot /></p>
  </div>
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
@import '../lib-scss/utilities.scss';

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
      background-color: rgba($color: $on-surface, $alpha: 0.1);
    }
    &:hover:active {
      background-color: rgba($color: $on-surface, $alpha: 0.2);
    }
  }
}

.button-text.disabled {
  color: $on-surface-emphasis-low;
}
</style>
