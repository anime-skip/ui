<template>
  <button
    @click="onClickItem"
    class="flex items-center subtitle-1 font-bold border-primary border-opacity-0 transition-colors bg-on-surface bg-opacity-0 hover:bg-opacity-hover cursor-pointer text-on-surface text-opacity-medium hover:text-opacity-high"
    :class="{
      'h-16 pt-2px border-b-2 px-4': !inOverflow,
      'h-12 border-l-4 px-13 self-stretch': inOverflow,
    }"
  >
    <template v-if="!!title">
      {{ title }}
    </template>
    <slot v-else />
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { injectNavBarOverflowState } from '../NavBarState';

export default defineComponent({
  name: 'NavBarClickItem',
  props: {
    onClick: { type: Function as PropType<() => void>, required: true },
    title: { type: String, default: undefined },
    inOverflow: Boolean,
    disableHideOverflowOnClick: Boolean,
  },
  setup(props) {
    const { updateIsOverflowOpen } = injectNavBarOverflowState();
    const onClickItem = () => {
      props.onClick();
      if (!props.disableHideOverflowOnClick) {
        updateIsOverflowOpen?.(false);
      }
    };
    return {
      onClickItem,
    };
  },
});
</script>

<style scoped>
.pt-2px {
  padding-top: 2px;
}
.px-13 {
  padding-left: 52px;
}
</style>
