<template>
  <div
    class="RaisedContainer flex flex-row justify-center items-center rounded ring-offset-transparent"
    :class="{
      'surface-primary': !dark && !secondary,
      down,
      'dark surface-control': dark,
      'secondary surface-secondary': secondary,
      disabled,
      'ring ring-primary': focused,
      'error surface-error': error,
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
@import '../scss/generated-config.scss';

$down-translation: 0px;
$neutral-translation: 3px;

$primary-dark: darken($backgroundColor-primary, 20%);
$secondary-dark: darken($backgroundColor-secondary, 10%);
$error-dark: desaturate(darken($backgroundColor-error, 17%), 25%);

@mixin Raised($color, $offset) {
  transform: translateY(-$offset);
  box-shadow: 0 $offset 0 0 $color;
}

.RaisedContainer {
  position: relative;
  color: $backgroundColor-on-primary;
  background-color: $backgroundColor-primary;
  transition: 200ms ease;
  outline-width: 0;
  @include Raised($primary-dark, $neutral-translation);

  &.secondary {
    background-color: $backgroundColor-secondary;
    @include Raised($secondary-dark, $neutral-translation);
  }

  &.dark {
    background-color: $backgroundColor-control;
    @include Raised($backgroundColor-control-variant, $neutral-translation);
  }

  &.error {
    background-color: $backgroundColor-error;
    @include Raised($error-dark, $neutral-translation);
  }

  &.down,
  &:active:hover {
    @include Raised($backgroundColor-primary-variant, $down-translation);
  }

  &.secondary.down,
  &.secondary:active:hover {
    @include Raised($secondary-dark, $down-translation);
  }

  &.dark.down,
  &.dark:active:hover {
    @include Raised($backgroundColor-control-variant, $down-translation);
  }

  &.error.down,
  &.error:active:hover {
    @include Raised($error-dark, $down-translation);
  }

  &.disabled {
    background-color: $backgroundColor-control-disabled;
    pointer-events: none;
    @include Raised($backgroundColor-control-disabled, $down-translation);
  }
}
</style>
