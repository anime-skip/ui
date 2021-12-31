<template>
  <button
    @click="onClickItem"
    class="as-flex as-items-center as-subtitle-1 as-font-bold as-border-primary as-border-opacity-0 as-transition-colors as-bg-on-surface as-bg-opacity-0 hover:as-bg-opacity-hover as-cursor-pointer as-text-on-surface as-text-opacity-medium hover:as-text-opacity-high"
    :class="{
      'as-h-16 as-pt-2px as-border-b-2 as-px-4': !inOverflow,
      'as-h-12 as-border-l-4 as-px-13 as-self-stretch': inOverflow,
    }"
  >
    <vnode v-if="icon" :node="icon()" />
    <template v-if="!!title">
      {{ title }}
    </template>
    <slot v-else />
  </button>
</template>

<script lang="ts">
import { defineComponent, FunctionalComponent, h, PropType, VNode } from 'vue';
import { injectNavBarOverflowState } from '../NavBarState';
import NavBarItemIconWrapperVue from './NavBarItemIconWrapper.vue';

const Vnode: FunctionalComponent<{ node: VNode }> = ({ node }) =>
  h(NavBarItemIconWrapperVue, null, () => node);

export default defineComponent({
  name: 'NavBarClickItem',
  components: { Vnode },
  props: {
    onClick: { type: Function as PropType<() => void>, required: true },
    title: { type: String, default: undefined },
    icon: { type: Function, default: undefined },
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
.as-pt-2px {
  padding-top: 2px;
}
.as-px-13 {
  padding-left: 52px;
}
</style>
