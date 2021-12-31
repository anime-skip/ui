<template>
  <div
    class="as-min-h-10 as-p-0 as-px-2 as-py-2 as-flex as-flex-row as-items-center as-justify-start as-space-x-3 as-select-none as-cursor-pointer as-transition-colors as-rounded as-overflow-x-hidden as-bg-transparent"
    :class="{
      'as-flex-row-reverse': rToL,
      'as-opacity-low as-pointer-events-none': disabled,
      'as-space-x-reverse': rToL,
      'hover:as-bg-on-surface hover:as-bg-opacity-hover hover:active:as-bg-opacity-active': flat,
    }"
    @click="toggleChecked()"
  >
    <CheckboxChecked
      v-if="checked === true"
      class="as-flex-shrink-0 as-opacity-100 as-transition-colors"
      :class="{
        'as-fill-secondary': flat && !disabled,
        [`as-fill-on-${onSurface}`]: !flat && !disabled && !!onSurface,
      }"
    />
    <CheckboxIndeterminate
      v-else-if="checked === 'indeterminate'"
      class="as-flex-shrink-0 as-opacity-100 as-transition-colors"
      :class="{
        'as-fill-secondary': flat && !disabled,
        [`as-fill-on-${onSurface}`]: !flat && !disabled && !!onSurface,
      }"
    />
    <CheckboxUnchecked v-else class="as-flex-shrink-0" />
    <label
      v-if="label"
      class="as-body-1 as-flex-1 as-text-opacity-high as-pointer-events-none as-pr-2"
      :class="{
        'as-text-right': rToL,
        [`as-text-on-${onSurface}`]: !flat && !disabled && !!onSurface,
      }"
      >{{ label }}</label
    >
    <slot v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import CheckboxChecked from './icons/CheckboxChecked.vue';
import CheckboxIndeterminate from './icons/CheckboxIndeterminate.vue';
import CheckboxUnchecked from './icons/CheckboxUnchecked.vue';

export default defineComponent({
  name: 'Checkbox',
  components: { CheckboxChecked, CheckboxIndeterminate, CheckboxUnchecked },
  props: {
    checked: { type: [Boolean, String] as PropType<boolean | 'indeterminate'>, default: undefined },
    label: { type: String, default: undefined },
    flat: { type: Boolean, default: true },
    disabled: Boolean,
    rToL: Boolean,
    onSurface: {
      type: String as PropType<
        'primary' | 'primary-variant' | 'secondary' | 'secondary-variant' | 'surface' | 'error'
      >,
      default: undefined,
    },
  },
  emits: ['update:checked'],
  setup(props, { emit }) {
    const toggleChecked = () => emit('update:checked', !props.checked);
    return {
      toggleChecked,
    };
  },
});
</script>
