<template>
  <div class="TextInput flex flex-col min-w-0 cursor-text">
    <Body2 v-if="!!label" class="mb-3 text-opacity-high">{{ label }}</Body2>
    <div
      class="rounded-sm ring-primary transition-all flex"
      :class="{
        'ring ring-opacity-low': isFocused,
        'ring-1 ring-error ring-opacity-100': !isValid,
      }"
    >
      <RaisedContainer
        class="input-wrapper h-12 space-x-4 px-4 items-center min-w-0 flex-1"
        dark
        :disabled="disabled"
        :down="isFocused || !!errorMessage || !!internalValue"
        @click="focus()"
        tabindex="-1"
      >
        <slot name="left-icon" :disabled="disabled" :focused="isFocused" />
        <input
          ref="input"
          class="input body-1 h-12 flex-1 p-0 min-w-0 outline-none"
          :class="{ error: !isValid }"
          v-model="internalValue"
          :type="type"
          :placeholder="placeholder"
          :autocomplete="autocomplete || 'off'"
          :disabled="disabled"
          @focus="onFocus"
          @blur="onBlur"
          @keydown.esc.stop.prevent="onPressEsc"
          @keyup.enter="$emit('submit')"
        />
        <slot name="right-icon" :disabled="disabled" :focused="isFocused" />
      </RaisedContainer>
    </div>
    <Caption v-if="errorMessage" class="text-error m-0 mt-2">{{ errorMessage }}</Caption>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import RaisedContainer from './RaisedContainer.vue';
import Caption from './text/Caption.vue';
import Body2 from './text/Body2.vue';

export default defineComponent({
  name: 'TextInput',
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

.TextInput {
  .input {
    @apply text-on-surface text-opacity-100;
    background-color: transparent;
    box-sizing: border-box;
    line-height: 12rem;
    caret-color: theme('colors.primary');
    min-width: 0;

    &::placeholder {
      @apply text-on-surface text-opacity-medium;
    }

    // &.error {
    //   @apply text-on-error text-opacity-high;
    //   caret-color: theme('colors.on-error');
    //   &::placeholder {
    //     @apply text-on-error text-opacity-medium;
    //   }
    // }

    &:disabled {
      @apply text-on-surface text-opacity-medium;
      &::placeholder {
        @apply text-on-surface text-opacity-low;
      }
    }
  }
}
</style>
