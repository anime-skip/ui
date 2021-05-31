<template>
  <Icon path="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Icon from './Icon.vue';

export default defineComponent({
  name: 'DrawerOpen',
  components: { Icon },
});
</script>
