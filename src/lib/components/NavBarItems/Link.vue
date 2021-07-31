<template>
  <router-link
    :to="link"
    class="flex items-center subtitle-1 font-bold border-primary border-opacity-0 transition-colors bg-on-surface bg-opacity-0 hover:bg-opacity-hover text-on-surface hover:no-underline"
    :class="{
      'h-16 pt-2px border-b-2 px-4': !inOverflow,
      'h-12 border-l-4 px-13': inOverflow,
      'text-opacity-100 border-opacity-100': isCurrentPath,
      'text-opacity-medium': !isCurrentPath,
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
.pt-2px {
  padding-top: 2px;
}
.px-13 {
  padding-left: 52px;
}
</style>
