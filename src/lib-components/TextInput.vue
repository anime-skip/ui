<template>
  <div class="TextInput flex flex-col min-w-0 cursor-text">
    <Body2 v-if="!!label" class="mb-3 emphasis-high">{{ label }}</Body2>
    <RaisedContainer
      class="input-wrapper h-12 space-x-4 px-4 items-center min-w-0"
      dark
      :disabled="disabled"
      :down="isFocused || !!value || !!internalValue"
      :focused="isFocused"
      :error="!isValid"
      @click="focus()"
    >
      <slot name="left-icon" v-bind:disabled="disabled" v-bind:focused="isFocused" />
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
      <slot name="right-icon" v-bind:disabled="disabled" v-bind:focused="isFocused" />
    </RaisedContainer>
    <Caption v-if="errorMessage" class="text-error m-0 mt-2">{{ errorMessage }}</Caption>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import RaisedContainer from './RaisedContainer.vue';
import Caption from './text/Caption.vue';
import Body2 from './text/Body2.vue';

export default defineComponent({
  components: { RaisedContainer, Caption, Body2 },
  props: {
    id: String,
    label: String,
    placeholder: { type: String, required: true },
    errorMessage: String,
    autocomplete: String as PropType<'username' | 'current-password'>,
    defaultValue: String,
    type: { type: String as PropType<'text' | 'password'>, default: 'text' },
    isValid: { type: Boolean, default: true },
    value: String,
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
@import '../lib-scss/colors.scss';

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
    background-color: transparent;
    box-sizing: border-box;
    line-height: 12rem;
    caret-color: $primary;
    min-width: 0;

    color: $on-surface-emphasis-high;
    &::placeholder {
      color: $on-surface-emphasis-medium;
    }

    &.error {
      caret-color: $on-error;
      color: $on-error-emphasis-high;
      &::placeholder {
        color: $on-error-emphasis-medium;
      }
    }

    &:disabled {
      color: $on-surface-emphasis-medium;
      &::placeholder {
        color: $on-surface-emphasis-low;
      }
    }
  }
}
</style>
