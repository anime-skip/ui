<template>
  <div
    class="Checkbox min-h-10 p-0 px-2 py-2 flex flex-row items-center justify-start space-x-4 select-none cursor-pointer transition-colors rounded overflow-x-hidden"
    :class="{
      'flex-row-reverse': rToL,
      'emphasis-low pointer-events-none': disabled,
      'space-x-reverse': rToL,
      'disable-hover-effects': disableHoverEffects,
    }"
    @click="toggleChecked()"
  >
    <CheckboxChecked v-if="checked === true" :emphasisHigh="!disabled" class="flex-shrink-0" />
    <CheckboxIndeterminate
      v-else-if="checked === 'indeterminate'"
      :emphasisHigh="!disabled"
      class="flex-shrink-0"
    />
    <CheckboxUnchecked v-else :emphasisLow="!disabled" class="flex-shrink-0" />
    <label
      class="body-1 flex-1 emphasis-high pointer-events-none"
      :class="{
        'text-right': rToL,
      }"
      >{{ label }}</label
    >
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import CheckboxChecked from './icons/CheckboxChecked.vue';
import CheckboxIndeterminate from './icons/CheckboxIndeterminate.vue';
import CheckboxUnchecked from './icons/CheckboxUnchecked.vue';

export default defineComponent({
  components: { CheckboxChecked, CheckboxIndeterminate, CheckboxUnchecked },
  props: {
    checked: [Boolean, String] as PropType<boolean | 'indeterminate'>,
    label: String,
    disabled: Boolean,
    rToL: Boolean,
    disableHoverEffects: Boolean,
  },
  emits: ['update:checked'],
  setup(props, { emit }) {
    const toggleChecked = () => emit('update:checked', !props.checked);
    const iconClass = computed(() => ({
      'emphasis-high': !props.disabled,
    }));
    const uncheckedIconClass = computed(() => ({
      'emphasis-low': !props.disabled,
    }));
    return {
      toggleChecked,
      iconClass,
      uncheckedIconClass,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '../lib-scss/colors.scss';

.Checkbox {
  background-color: transparent;
  &:hover:not(.disable-hover-effects) {
    background-color: rgba($color: $on-surface, $alpha: 0.06);
  }
  &:hover:active:not(.disable-hover-effects) {
    background-color: rgba($color: $on-surface, $alpha: 0.12);
  }
}
</style>
