<template>
  <RaisedContainer :dark="!checked" :down="!checked" :disabled="disabled">
    <Checkbox
      class="flex-1 px-2 text-left"
      :checked="checked"
      :label="label"
      :disabled="disabled"
      :rToL="rToL"
      :flat="false"
      disableHoverEffects
      @update:checked="updateChecked"
    />
  </RaisedContainer>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import RaisedContainer from './RaisedContainer.vue';

export default defineComponent({
  components: { RaisedContainer },
  emits: ['update:checked'],
  props: {
    checked: [Boolean, String] as PropType<boolean | 'indeterminate'>,
    label: String,
    disabled: Boolean,
    rToL: Boolean,
  },
  setup(_, { emit }) {
    const updateChecked = (newChecked: boolean) => {
      emit('update:checked', newChecked);
    };
    return {
      updateChecked,
    };
  },
});
</script>
