<template>
  <div
    class="RaisedContainer flex flex-row justify-center items-center rounded"
    :class="{
      'bg-primary': !dark && !secondary,
      down,
      'dark bg-control': dark,
      'secondary bg-secondary': secondary,
      disabled,
      ring: focused,
      'error bg-error': error,
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    down: Boolean,
    disabled: Boolean,
    focused: Boolean,
    secondary: Boolean,
    dark: Boolean,
    error: Boolean,
  },
});
</script>

<style lang="scss">
@import '../lib-scss/colors.scss';
$down-translation: 0px;
$neutral-translation: 3px;

$primary-dark: darken($primary, 20%);
$secondary-dark: darken($secondary, 10%);
$error-dark: desaturate(darken($error, 17%), 25%);

@mixin Raised($color, $offset) {
  transform: translateY(-$offset);
  box-shadow: 0 $offset 0 0 $color;
}

.RaisedContainer {
  position: relative;
  color: $on-primary;
  background-color: $primary;
  transition: 200ms ease;
  outline-width: 0;
  @include Raised($primary-dark, $neutral-translation);

  &.secondary {
    background-color: $secondary;
    @include Raised($secondary-dark, $neutral-translation);
  }

  &.dark {
    background-color: $control;
    @include Raised($control-variant, $neutral-translation);
  }

  &.error {
    background-color: $error;
    @include Raised($error-dark, $neutral-translation);
  }

  &.down,
  &:active:hover {
    @include Raised($primary-variant, $down-translation);
  }

  &.secondary.down,
  &.secondary:active:hover {
    @include Raised($secondary-dark, $down-translation);
  }

  &.dark.down,
  &.dark:active:hover {
    @include Raised($control-variant, $down-translation);
  }

  &.error.down,
  &.error:active:hover {
    @include Raised($error-dark, $down-translation);
  }

  &.disabled {
    background-color: $control-disabled;
    pointer-events: none;
    @include Raised($control-disabled, $down-translation);
  }
}
</style>
