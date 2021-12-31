<template>
  <div
    class="TimelineSection"
    :class="{
      'as-buffered': buffered,
      'as-completed': completed,
      'as-skipped': skipped,
      'as-current': current,
    }"
    :style="positioning"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { TimestampData } from '../../@types/lib';

export default defineComponent({
  name: 'TimelineSection',
  props: {
    timestamp: { type: Object as PropType<TimestampData>, required: true },
    endTime: { type: Number, required: true }, // 0-100
    currentTime: { type: Number, default: undefined },
    skipped: Boolean,
    buffered: Boolean,
    completed: Boolean,
  },
  setup(props) {
    const left = computed<number>(() => {
      return props.timestamp.normalizedAt;
    });
    const width = computed<number>(() => {
      if (props.currentTime == null || props.currentTime > props.endTime) {
        return props.endTime - left.value;
      }
      if (props.currentTime < props.timestamp.normalizedAt) {
        return 0;
      }
      return props.currentTime - left.value;
    });
    const positioning = computed(() => ({ left: `${left.value}%`, width: `${width.value}%` }));

    const current = computed<boolean>(() => {
      if (props.currentTime == null) return false;

      return (
        props.currentTime >= props.timestamp.normalizedAt && props.currentTime <= props.endTime
      );
    });

    return {
      positioning,
      current,
    };
  },
});
</script>

<style lang="scss" scoped>
@use 'sass:map';
@import '../styles/variables-theme.scss';

$notCompletedColor: rgba(
  $color: lighten($textColor-background, 25%),
  $alpha: 0.75,
);

.TimelineSection {
  position: absolute;
  background-color: theme('colors.timeline-background');
  height: 3px;
  border-radius: 1.5px;
}
.as-skipped {
  background-color: transparent;
}
.as-buffered {
  @apply as-bg-on-surface as-bg-opacity-medium;
}
.as-completed {
  background-color: #{theme('colors.timeline-foreground')};
}
.as-current {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
