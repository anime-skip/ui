<template>
  <RaisedContainer
    class="RaisedButton flex flex-row min-h-10 px-4 py-2 cursor-pointer select-none"
    :secondary="secondary"
    :dark="dark"
    :disabled="disabled"
  >
    <p class="button-text" :class="{ disabled }"><slot /></p>
  </RaisedContainer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RaisedContainer from './RaisedContainer.vue';

export default defineComponent({
  components: { RaisedContainer },
  props: {
    secondary: Boolean,
    dark: Boolean,
    disabled: Boolean,
  },
});
</script>

<style lang="scss" scoped>
@import '../lib-scss/colors.scss';

.button-text.disabled {
  color: $on-surface-emphasis-low;
}
</style>
