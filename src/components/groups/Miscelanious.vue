<template>
  <Group title="Miscelanious">
    <div class="flex flex-col space-y-4">
      <h6>Timeline</h6>
      <div class="space-y-4 overflow-x-hidden">
        <Timeline class="w-48" :timestamps="timestamps1" :normalizedProgress="progress1" />
        <Timeline class="w-48" :timestamps="timestamps2" editing :normalizedProgress="progress1" />
        <Timeline class="w-48" :timestamps="timestamps3" />
      </div>
      <h6>Slider</h6>
      <div>
        <Slider class="w-48" :progress="progress1" :max="100" @seek="updateProgress1" />
      </div>
      <Body1>{{ progress1 }}</Body1>
      <div>
        <Slider
          class="w-48 slider-white"
          :progress="progress2"
          :max="100"
          @seek="updateProgress2"
          disableUpdateDuringSeek
        />
      </div>
      <Body1>{{ progress2 }}</Body1>
    </div>
  </Group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { TimestampData } from '../@types';

export default defineComponent({
  setup() {
    const timestamps1: TimestampData[] = [
      {
        key: '1',
        normalizedAt: 0,
      },
      {
        key: '2',
        normalizedAt: 10,
        skipped: true,
      },
      {
        key: '3',
        normalizedAt: 20,
      },
      {
        key: '4',
        normalizedAt: 90,
        skipped: true,
      },
    ];
    const timestamps2: TimestampData[] = [
      {
        key: '1',
        normalizedAt: 10,
        skipped: true,
      },
      {
        key: '2',
        normalizedAt: 20,
      },
      {
        key: 'new',
        normalizedAt: 70,
        edited: true,
      },
      {
        key: '3',
        normalizedAt: 90,
      },
    ];
    const timestamps3: TimestampData[] = [];

    const progress1 = ref(67);
    const updateProgress1 = (newProgress1: number) => {
      progress1.value = newProgress1;
    };

    const progress2 = ref(33);
    const updateProgress2 = (newProgress2: number) => {
      progress2.value = newProgress2;
    };

    return {
      timestamps1,
      timestamps2,
      timestamps3,
      progress1,
      updateProgress1,
      progress2,
      updateProgress2,
    };
  },
});
</script>

<style lang="scss">
@import '../../lib/scss/theme.scss';

.slider-white {
  --default-background-color: #{rgba($color: $backgroundColor-on-surface, $alpha: $opacity-low)} !important;
  --default-foreground-color: theme('colors.on-surface') !important;
}
</style>
