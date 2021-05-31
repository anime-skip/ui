<template>
  <RaisedContainer :dark="!checked" :down="!checked" :disabled="disabled">
    <Checkbox
      class="flex-1 px-2 text-left"
      :checked="checked"
      :label="label"
      :disabled="disabled"
      :r-to-l="rToL"
      :flat="false"
      disable-hover-effects
      :on-surface="onSurface"
      @update:checked="updateChecked"
    />
  </RaisedContainer>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import RaisedContainer from './RaisedContainer.vue';

export default defineComponent({
  name: 'RaisedCheckbox',
  components: { RaisedContainer },
  emits: ['update:checked'],
  props: {
    checked: { type: [Boolean, String] as PropType<boolean | 'indeterminate'>, default: undefined },
    label: { type: String, default: undefined },
    disabled: Boolean,
    rToL: Boolean,
  },
  setup(props, { emit }) {
    const updateChecked = (newChecked: boolean) => {
      emit('update:checked', newChecked);
    };
    const onSurface = computed(() => {
      if (props.checked) return 'primary';
      return 'surface';
    });
    return {
      onSurface,
      updateChecked,
    };
  },
});
</script>
