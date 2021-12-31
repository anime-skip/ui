<template>
  <button
    class="FlatButton as-flex as-flex-row as-justify-center as-items-center as-rounded as-min-h-10 as-cursor-pointer as-select-none as-overflow-x-hidden"
    :class="{
      'as-surface as-surface-primary': !disabled && !secondary && !transparent && !error,
      'as-surface as-surface-secondary': !disabled && secondary && !error,
      'as-transparent': !disabled && transparent && !error,
      'as-surface as-surface-error': !disabled && !transparent && error,
      'as-bg-control-disabled as-pointer-events-none': disabled,
    }"
  >
    <a
      v-if="link && link.startsWith('https')"
      :href="link"
      :target="target"
      class="as-px-4 as-py-2.5 hover:as-no-underline as-flex as-flex-row as-items-center as-button-text as-justify-center"
      :class="classes"
    >
      <slot />
    </a>
    <router-link
      v-else-if="link"
      :to="link"
      :target="target"
      class="as-px-4 as-py-2.5 hover:as-no-underline as-flex as-flex-row as-items-center as-button-text as-justify-center"
      :class="classes"
    >
      <slot />
    </router-link>
    <p v-else class="as-button-text as-px-4 as-py-2.5" :class="classes">
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
      'as-text-on-primary':
        !props.secondary && !props.transparent && !props.disabled && !props.error,
      'as-text-on-secondary':
        props.secondary && !props.transparent && !props.disabled && !props.error,
      'as-text-on-surface':
        !props.secondary && props.transparent && !props.disabled && !props.error,
      'as-text-on-surface as-text-opacity-low': props.disabled,
      'as-text-on-error': !props.secondary && !props.transparent && !props.disabled && props.error,
    }));
    return {
      classes,
    };
  },
});
</script>

<style lang="scss" scoped>
.FlatButton {
  transition: ease 200ms filter;

  &:hover {
    filter: brightness(110%);
  }
  &:hover:active {
    filter: brightness(120%) saturate(95%);
  }

  &.as-transparent {
    background-color: transparent;
    transition-property: background-color;
    &:hover {
      @apply as-bg-on-surface as-bg-opacity-hover;
    }
    &:hover:active {
      @apply as-bg-on-surface as-bg-opacity-active;
    }
  }
}
</style>
