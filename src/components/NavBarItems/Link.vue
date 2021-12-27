<template>
  <router-link
    :to="link"
    class="as-flex as-items-center as-subtitle-1 as-font-bold as-border-primary as-border-opacity-0 as-transition-colors as-bg-on-surface as-bg-opacity-0 hover:as-bg-opacity-hover as-text-on-surface hover:as-no-underline"
    :class="{
      'as-h-16 as-pt-2px as-border-b-2 as-px-4': !inOverflow,
      'as-h-12 as-border-l-4 as-px-13': inOverflow,
      'as-text-opacity-100 as-border-opacity-100': isCurrentPath,
      'as-text-opacity-medium': !isCurrentPath,
    }"
  >
    <vnode v-if="icon" :node="icon()" />{{ title }}
  </router-link>
</template>

<script lang="ts">
import { computed, defineComponent, FunctionalComponent, h, PropType, VNode } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import NavBarItemIconWrapper from './NavBarItemIconWrapper.vue';

const Vnode: FunctionalComponent<{ node: VNode }> = ({ node }) =>
  h(NavBarItemIconWrapper, null, node);

export default defineComponent({
  name: 'NavBarLinkItem',
  components: { RouterLink, Vnode },
  props: {
    link: { type: String, required: true },
    title: { type: String, required: true },
    icon: { type: Function as PropType<() => VNode>, default: undefined },
    inOverflow: Boolean,
  },
  setup(props) {
    const linkBase = computed<string>(() => props.link.split(/(#|\?)/)[0]);
    const route = useRoute();

    const isCurrentPath = computed(() => route.path.startsWith(linkBase.value));

    return {
      isCurrentPath,
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
