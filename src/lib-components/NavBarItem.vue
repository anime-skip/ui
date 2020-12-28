<template>
  <a
    :href="link"
    class="block h-16 mx-1 px-2 py-5 emphasis-medium"
    :class="{
      'emphasis-max selected font-medium': isCurrentPath(),
      'hide-underline': hideUnderline,
    }"
    >{{ title }}</a
  >
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
export default defineComponent({
  props: {
    link: { type: String, required: true },
    title: { type: String, required: true },
    hideUnderline: Boolean,
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
@import '../lib-scss/colors.scss';

a:hover {
  opacity: unset;
}

.selected:not(.hide-underline) {
  border-bottom: 2px solid $primary;
}
</style>
