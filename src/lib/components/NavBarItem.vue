<template>
  <router-link
    :to="link"
    class="flex items-center h-16 subtitle-1"
    :class="{
      'opacity-100 selected font-medium border-primary': isCurrentPath(),
      'opacity-medium': !isCurrentPath(),
      'px-6 heading-6': dropdown,
      'border-l-2': dropdown && isCurrentPath(),
      'mx-1 px-2': !dropdown,
      'border-b-2': !dropdown && isCurrentPath(),
    }"
    >{{ title }}</router-link
  >
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    link: { type: String, required: true },
    title: { type: String, required: true },
    dropdown: Boolean,
  },
  setup(props) {
    const base = computed<string>(() => props.link.split(/(#|\?)/)[0]);
    const isCurrentPath = () => window.location.pathname.startsWith(base.value);

    return {
      isCurrentPath,
    };
  },
});
</script>

<style lang="scss" scoped>
a:hover {
  opacity: unset;
}
</style>
