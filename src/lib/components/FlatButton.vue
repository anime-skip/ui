<template>
  <button
    class="FlatButton flex flex-row justify-center items-center rounded min-h-10 cursor-pointer select-none overflow-x-hidden"
    :class="{
      'surface surface-primary': !disabled && !secondary && !transparent && !error,
      'surface surface-secondary': !disabled && secondary && !error,
      transparent: !disabled && transparent && !error,
      'surface surface-error': !disabled && !transparent && error,
      'bg-control-disabled pointer-events-none': disabled,
    }"
  >
    <a
      v-if="link && link.startsWith('https')"
      :href="link"
      :target="target"
      class="px-4 py-2.5 hover:no-underline flex flex-row items-center button-text justify-center"
      :class="classes"
    >
      <slot />
    </a>
    <router-link
      v-else-if="link"
      :to="link"
      :target="target"
      class="px-4 py-2.5 hover:no-underline flex flex-row items-center button-text justify-center"
      :class="classes"
    >
      <slot />
    </router-link>
    <p v-else class="button-text px-4 py-2.5" :class="classes">
      <slot />
    </p>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'FlatButton',
  props: {
    secondary: Boolean,
    transparent: Boolean,
    disabled: Boolean,
    error: Boolean,
    link: { type: String, default: undefined },
    target: { type: String, default: undefined },
  },
  setup(props) {
    const classes = computed(() => ({
      'text-on-primary': !props.secondary && !props.transparent && !props.disabled && !props.error,
      'text-on-secondary': props.secondary && !props.transparent && !props.disabled && !props.error,
      'text-on-surface': !props.secondary && props.transparent && !props.disabled && !props.error,
      'text-on-surface text-opacity-low': props.disabled,
      'text-on-error': !props.secondary && !props.transparent && !props.disabled && props.error,
    }));
    return {
      classes,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '../styles/variables-theme.scss';

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
  .button-text.disabled {
    @apply text-on-surface text-opacity-low;
  }
}
</style>
