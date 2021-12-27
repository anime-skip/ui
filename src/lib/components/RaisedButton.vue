<template>
  <RaisedContainer
    class="RaisedButton as-flex as-flex-row as-min-h-10 as-cursor-pointer as-select-none"
    :secondary="secondary"
    :dark="dark"
    :disabled="disabled"
    :error="error"
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
    <span v-else class="as-button-text as-space-x-4 as-px-4 as-py-2.5" :class="classes"
      ><slot
    /></span>
  </RaisedContainer>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import RaisedContainer from './RaisedContainer.vue';

export default defineComponent({
  name: 'RaisedButton',
  components: { RaisedContainer, RouterLink },
  props: {
    secondary: Boolean,
    dark: Boolean,
    disabled: Boolean,
    error: Boolean,
    link: { type: String, default: undefined },
    target: { type: String, default: undefined },
  },
  setup(props) {
    const classes = computed(() => ({
      'as-text-on-primary': !props.secondary && !props.dark && !props.disabled && !props.error,
      'as-text-on-secondary': props.secondary && !props.dark && !props.disabled && !props.error,
      'as-text-on-surface': !props.secondary && props.dark && !props.disabled && !props.error,
      'as-text-on-surface text-opacity-low': props.disabled,
      'as-text-on-error': !props.secondary && !props.dark && !props.disabled && props.error,
    }));
    return {
      classes,
    };
  },
});
</script>
