<template>
  <button
    class="RaisedContainer as-flex as-flex-row as-justify-center as-items-center as-rounded as-ring-offset-transparent"
    :class="{
      'as-surface-primary': !dark && !secondary,
      'as-down': down,
      'as-dark as-surface-control': dark,
      'as-secondary as-surface-secondary': secondary,
      'as-disabled': disabled,
      'as-ring as-ring-primary': focused,
      'as-error as-surface-error': error,
    }"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RaisedContainer',
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
@import '../styles/variables-theme.scss';

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

  &.as-secondary {
    background-color: $backgroundColor-secondary;
    @include Raised($secondary-dark, $neutral-translation);
  }

  &.as-dark {
    background-color: $backgroundColor-control;
    @include Raised($backgroundColor-control-variant, $neutral-translation);
  }

  &.as-error {
    background-color: $backgroundColor-error;
    @include Raised($error-dark, $neutral-translation);
  }

  &.as-down,
  &:active:hover {
    @include Raised($backgroundColor-primary-variant, $down-translation);
  }

  &.as-secondary.as-down,
  &.as-secondary:active:hover {
    @include Raised($secondary-dark, $down-translation);
  }

  &.as-dark.as-down,
  &.as-dark:active:hover {
    @include Raised($backgroundColor-control-variant, $down-translation);
  }

  &.as-error.as-down,
  &.as-error:active:hover {
    @include Raised($error-dark, $down-translation);
  }

  &.as-disabled {
    background-color: $backgroundColor-control-disabled;
    pointer-events: none;
    @include Raised($backgroundColor-control-disabled, $down-translation);
  }
}
</style>
