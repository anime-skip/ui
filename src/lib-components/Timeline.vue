<template>
  <div class="Timeline relative">
    <TimelineSection
      v-for="section of sections"
      :key="section.timestamp.key"
      :timestamp="section.timestamp"
      :endTime="section.endTime"
      :skipped="section.isSkipped"
    />
    <TimelineSection
      v-for="section of completedSections"
      :key="'completed' + section.timestamp.key"
      :timestamp="section.timestamp"
      :endTime="section.endTime"
      :currentTime="normalizedProgress"
      completed
    />
    <svg
      v-for="timestamp of timestamps"
      :key="`t${timestamp.key}`"
      class="Timestamp"
      :class="timestampClass(timestamp)"
      :style="timestampStyle(timestamp)"
      width="12"
      height="6"
      viewBox="0 0 12 6"
    >
      <path d="M6 6L0 0H12L6 6Z" />
    </svg>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import TimelineSection from './TimelineSection.vue';
import { SectionData, TimestampData } from '../@types/lib';

export default defineComponent({
  name: 'Timeline',
  components: { TimelineSection },
  props: {
    timestamps: { type: Array as PropType<TimestampData[]>, required: true },
    normalizedProgress: Number, // 0-100
    editing: Boolean,
  },
  emits: ['seek'],
  setup(props) {
    // Timestamps
    const timestampStyle = (timestamp: TimestampData) => {
      return {
        left: `${timestamp.normalizedAt}%`,
      };
    };
    const timestampClass = (timestamp: TimestampData): Record<string, boolean | undefined> => {
      return {
        active: timestamp.active,
        edited: timestamp.edited,
      };
    };

    // Sections
    const startTimestamp = (): TimestampData => ({
      key: 'start',
      normalizedAt: 0,
    });
    const endTimestamp = (): TimestampData => ({
      key: 'end',
      normalizedAt: 100,
    });
    const sections = computed<SectionData[]>(() => {
      if (props.timestamps.length === 0) {
        return [
          {
            timestamp: startTimestamp(),
            endTime: 100,
            isSkipped: false,
          },
        ];
      }
      const withEnd: TimestampData[] = [...props.timestamps, endTimestamp()];
      return props.timestamps.map<SectionData>(
        (timestamp: TimestampData, index: number): SectionData => ({
          timestamp: timestamp,
          endTime: withEnd[index + 1].normalizedAt,
          isSkipped: !!timestamp.skipped,
        })
      );
    });
    const completedSections = computed<SectionData[]>(() => {
      return sections.value.filter(section => !section.timestamp.skipped);
    });

    return {
      timestampStyle,
      timestampClass,
      sections,
      completedSections,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '../lib-scss/colors.scss';

$translationDefault: 4px;
$translationInactiveSliderDefault: 4px;

$translationVrv: 0px;
$translationInactiveSliderVrv: 3px;

.Timeline {
  height: 3px;

  &.add-margin {
    margin-left: 24px;
    margin-right: 24px;
  }

  .slider {
    top: 0;
    left: 0;
    right: 0;
    transition: top;

    .slider-foreground {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }

  .Timestamp {
    position: absolute;
    height: 6px;
    width: 12px;
    transform: translateX(-50%);
    transition: 250ms ease transform;

    path {
      fill: $primary-500;
    }
    &.edited {
      path {
        fill: $complementary-500;
      }
    }

    &.active {
      transform: translateX(-50%) translateY(-12px);
    }
  }
}
</style>
