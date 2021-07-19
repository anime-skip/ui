<template>
  <RaisedContainer
    class="RaisedButton flex flex-row min-h-10 cursor-pointer select-none"
    :secondary="secondary"
    :dark="dark"
    :disabled="disabled"
    :error="error"
  >
    <router-link
      v-if="link"
      :to="link"
      class="px-4 py-2.5 hover:no-underline flex flex-row items-center button-text justify-center"
      :class="classes"
    >
      <slot />
    </router-link>
    <span v-else class="button-text space-x-4 px-4 py-2.5" :class="classes"><slot /></span>
  </RaisedContainer>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
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
  },
  setup(props) {
    const classes = computed(() => ({
      'text-on-primary': !props.secondary && !props.dark && !props.disabled && !props.error,
      'text-on-secondary': props.secondary && !props.dark && !props.disabled && !props.error,
      'text-on-surface': !props.secondary && props.dark && !props.disabled && !props.error,
      'text-on-surface text-opacity-low': props.disabled,
      'text-on-error': !props.secondary && !props.dark && !props.disabled && props.error,
    }));
    return {
      classes,
    };
  },
});
</script>
