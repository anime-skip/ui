<template>
  <div
    class="flex h-16 py-5 opacity-high font-bold hover:opacity-100 cursor-pointer space-x-1"
    :class="{
      'px-6 heading-6': dropdown,
      'mx-1 px-2': !dropdown,
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NavBarButton',
  props: {
    dropdown: Boolean,
  },
});
</script>
