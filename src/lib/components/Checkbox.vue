<template>
  <div
    class="Checkbox min-h-10 p-0 px-2 py-2 flex flex-row items-center justify-start space-x-3 select-none cursor-pointer transition-colors rounded overflow-x-hidden bg-transparent"
    :class="{
      'flex-row-reverse': rToL,
      'opacity-low pointer-events-none': disabled,
      'space-x-reverse': rToL,
      'hover:bg-on-surface hover:bg-opacity-hover hover:active:bg-opacity-active': flat,
    }"
    @click="toggleChecked()"
  >
    <CheckboxChecked
      v-if="checked === true"
      class="flex-shrink-0 opacity-100 transition-colors"
      :class="{
        'fill-secondary': flat && !disabled,
        [`fill-on-${onSurface}`]: !flat && !!onSurface,
      }"
    />
    <CheckboxIndeterminate
      v-else-if="checked === 'indeterminate'"
      class="flex-shrink-0 opacity-100 transition-colors"
      :class="{
        'fill-secondary': flat && !disabled,
        [`fill-on-${onSurface}`]: !flat && !!onSurface,
      }"
    />
    <CheckboxUnchecked v-else class="flex-shrink-0" />
    <label
      v-if="label"
      class="body-1 flex-1 text-opacity-high pointer-events-none pr-2"
      :class="{
        'text-right': rToL,
        [`text-on-${onSurface}`]: !flat && !!onSurface,
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
  components: { CheckboxChecked, CheckboxIndeterminate, CheckboxUnchecked },
  props: {
    checked: [Boolean, String] as PropType<boolean | 'indeterminate'>,
    label: String,
    flat: { type: Boolean, default: true },
    disabled: Boolean,
    rToL: Boolean,
    onSurface: String as PropType<
      'primary' | 'primary-varient' | 'secondary' | 'secondary-variant' | 'surface' | 'error'
    >,
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
