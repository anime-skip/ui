<template>
  <div class="SelectDropDown as-flex as-flex-col as-min-w-0">
    <Body2 v-if="!!label" class="as-mb-3 as-text-opacity-high">{{ label }}</Body2>
    <div
      class="as-rounded-sm as-ring-primary as-transition-all as-flex"
      :class="{
        'as-ring as-ring-opacity-low': isFocused,
        'as-ring-1 as-ring-error as-ring-opacity-100': !isValid,
      }"
    >
      <RaisedContainer
        class="as-input-wrapper as-h-12 as-space-x-4 as-px-4 as-items-center as-min-w-0 as-flex-1 as-cursor-pointer"
        dark
        :disabled="disabled"
        :down="isFocused || !!errorMessage || !!internalValue"
        @click="focus()"
        :tabindex="-1"
      >
        <slot name="left-icon" :disabled="disabled" :focused="isFocused" />
        <select
          ref="input"
          class="as-input as-body-1 as-h-12 as-flex-1 as-p-0 as-min-w-0 as-outline-none as-cursor-pointer"
          :class="{
            'as-error': !isValid,
            'as-empty': !value,
          }"
          v-model="internalValue"
          :type="type"
          :placeholder="placeholder"
          :autocomplete="autocomplete || 'off'"
          :disabled="disabled"
          @focus="onFocus"
          @blur="onBlur"
          @keydown.esc.stop.prevent="onPressEsc"
          @keyup.enter="$emit('submit')"
        >
          <option disabled value="">Select one:</option>
          <slot />
        </select>
      </RaisedContainer>
    </div>
    <Caption v-if="errorMessage" class="as-text-error as-m-0 as-mt-2">{{ errorMessage }}</Caption>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import RaisedContainer from './RaisedContainer.vue';
import Caption from './text/Caption.vue';
import Body2 from './text/Body2.vue';

export default defineComponent({
  name: 'SelectDropDown',
  components: { RaisedContainer, Caption, Body2 },
  props: {
    id: { type: String, default: undefined },
    label: { type: String, default: undefined },
    placeholder: { type: String, required: true },
    errorMessage: { type: String, default: undefined },
    autocomplete: { type: String as PropType<'username' | 'current-password'>, default: undefined },
    defaultValue: { type: String, default: undefined },
    type: { type: String as PropType<'text' | 'password'>, default: 'text' },
    isValid: { type: Boolean, default: true },
    value: { type: String, default: undefined },
    disabled: Boolean,
  },
  emits: ['focus', 'blur', 'update:value', 'keypress-esc', 'submit'],
  data() {
    return {
      internalValue: this.value ?? this.defaultValue ?? '',
      isFocused: false,
    };
  },
  watch: {
    value(newValue: string | undefined) {
      this.internalValue = newValue ?? '';
    },
    internalValue(newInternalValue: string | undefined) {
      if (newInternalValue !== this.value) {
        this.$emit('update:value', newInternalValue);
      }
    },
  },
  methods: {
    focus(selectAll = false) {
      const input = this.$refs.input as HTMLInputElement | undefined;
      if (input) {
        if (selectAll) input.setSelectionRange(0, input.value.length);
        input.focus();
      } else {
        console.warn('Failed to focus on input, ref did not exist');
      }
    },
    onFocus() {
      this.$emit('focus');
      this.isFocused = true;
    },
    blur() {
      (this.$refs.input as HTMLInputElement | undefined)?.blur();
    },
    onBlur() {
      this.$emit('blur');
      this.isFocused = false;
    },
    onPressEsc() {
      this.$emit('keypress-esc');
    },
    setInputValue(value: string) {
      this.$emit('update:value', value);
    },
  },
});
</script>

<style lang="scss">
$colorNotActive: rgba(
  $color: black,
  $alpha: 0.24,
);
$colorFongNotActive: rgba(
  $color: black,
  $alpha: 0.32,
);
$transitionMs: 200ms;
$inputHeight: 48px;

.SelectDropDown {
  .as-input {
    @apply as-text-on-surface as-text-opacity-100;
    background-color: transparent;
    box-sizing: border-box;
    line-height: 12rem;
    caret-color: theme('colors.primary');
    min-width: 0;

    &::placeholder {
      @apply as-text-on-surface as-text-opacity-medium;
    }

    // &.as-error {
    //   @apply as-text-on-error as-text-opacity-high;
    //   caret-color: theme('colors.on-error');
    //   &::placeholder {
    //     @apply as-text-on-error as-text-opacity-medium;
    //   }
    // }

    &:disabled {
      @apply as-text-on-surface as-text-opacity-medium;
      &::placeholder {
        @apply as-text-on-surface as-text-opacity-low;
      }
    }
  }
}

.as-empty {
  --tw-text-opacity: 0.38 !important;
}
</style>
