<template>
  <div
    ref="timelineRef"
    class="Timeline as-relative as-pt-1 as--mt-1 as-pb-2 as--mb-2"
    @mouseenter="toggleHover(true)"
    @mouseleave="toggleHover(false)"
    @mousemove="moveOverlay"
  >
    <!-- Overlay -->
    <div
      v-if="allowOverlay"
      class="as-absolute as-w-full as-h-0 as--top-1 as-transition-opacity as-whitespace-nowrap as-z-10 as-pointer-events-none as-select-none"
      :class="{
        'as-opacity-100': isShowingHoverOverlay,
        'as-opacity-0': !isShowingHoverOverlay,
      }"
    >
      <div
        ref="overlayRef"
        class="as-absolute as-bottom-0 as--translation-x-50% as-px-2"
        :style="`left: ${hoverOverlayLeftPx}px`"
      >
        <card :elevation="12" class="as-py-2 as-px-2.5 as-text-center">
          <p class="as-subtitle-1 as-text-opacity-100 as-text-primaryPalette-300 as-font-bold">
            {{ hoverOverlayTimestamp }}
          </p>
          <p>{{ hoverOverlayTime }}</p>
        </card>
      </div>
    </div>

    <!-- Timeline -->
    <TimelineSection
      v-for="section of sections"
      :key="section.timestamp.key"
      :timestamp="section.timestamp"
      :end-time="section.endTime"
      :skipped="section.isSkipped"
    />
    <TimelineSection
      v-for="section of completedSections"
      :key="'completed' + section.timestamp.key"
      :timestamp="section.timestamp"
      :end-time="section.endTime"
      :current-time="normalizedProgress"
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
      <path d="M6 6L0 0H12L6 6Z" :class="pathClass(timestamp)" />
    </svg>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import TimelineSection from './TimelineSection.vue';
import { SectionData, TimestampData } from '../../@types/lib';
import theme from '../styles/generated-config';
import Card from './Card.vue';
import * as Utils from '../Utils';

export default defineComponent({
  name: 'Timeline',
  components: { TimelineSection, Card },
  props: {
    timestamps: { type: Array as PropType<TimestampData[]>, required: true },
    normalizedProgress: { type: Number, default: undefined }, // 0-100
    editing: Boolean,
    allowOverlay: Boolean,
    duration: { type: Number, required: true },
    forceOverlayNormalizedAt: { type: Number, default: undefined },
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
        'as-active': timestamp.active,
      };
    };
    const pathClass = (timestamp: TimestampData) => {
      return timestamp.fillClass ?? 'as-fill-timeline-foreground';
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

    // Hover

    const overlayBaseTime = computed<number>(() =>
      props.forceOverlayNormalizedAt != null
        ? props.forceOverlayNormalizedAt
        : hoverOverlayNormalizedAt.value
    );

    const isHovering = ref(false);
    const toggleHover = (newIsHovering: boolean) => {
      if (!props.allowOverlay) return;
      isHovering.value = newIsHovering;
    };
    const isShowingHoverOverlay = computed<boolean>(
      () => isHovering.value || props.forceOverlayNormalizedAt != null
    );

    const hoverOverlayLeftPx = computed<number>(() => {
      if (overlayRef.value == null || timelineRef.value == null) return 0;

      const overlayWidth = overlayRef.value?.clientWidth ?? 0;
      const totalWidth = timelineRef.value?.clientWidth ?? 0;
      const x = totalWidth * (overlayBaseTime.value / 100);
      const min = overlayWidth / 2;
      const max = totalWidth - overlayWidth / 2;
      return Utils.boundedNumber(x, [min, max]);
    });
    const hoverOverlayNormalizedAt = ref(0);
    const overlayRef = ref<HTMLDivElement | null>();
    const timelineRef = ref<HTMLDivElement | null>();
    const moveOverlay = (event: MouseEvent) => {
      if (!props.allowOverlay) return;

      const totalWidth = timelineRef.value?.clientWidth ?? 0;
      const mouseX = Utils.boundedNumber(event.clientX - (timelineRef.value?.offsetLeft ?? 0), [
        0,
        totalWidth,
      ]);
      hoverOverlayNormalizedAt.value = (mouseX / totalWidth) * 100;
    };

    const hoverOverlayTimestamp = computed<string | undefined>(() => {
      if (props.timestamps == null || props.timestamps.length === 0) return undefined;
      const timestampsBeforeTime = props.timestamps.filter(
        ({ normalizedAt }) =>
          normalizedAt <= (props.forceOverlayNormalizedAt ?? hoverOverlayNormalizedAt.value)
      );
      return timestampsBeforeTime.pop()?.title?.trim() ?? 'Unknown';
    });
    const hoverOverlayTime = computed<string>(() => {
      return Utils.formatSeconds(props.duration * (overlayBaseTime.value / 100), false);
    });

    return {
      timestampStyle,
      timestampClass,
      pathClass,
      sections,
      completedSections,
      hoverOverlayLeftPx,
      isShowingHoverOverlay,
      toggleHover,
      hoverOverlayTimestamp,
      hoverOverlayTime,
      moveOverlay,
      overlayRef,
      timelineRef,
    };
  },
});
</script>

<style lang="scss" scoped>
$translationDefault: 4px;
$translationInactiveSliderDefault: 4px;

$translationVrv: 0px;
$translationInactiveSliderVrv: 3px;

.Timeline {
  height: 3px;

  &.as-add-margin {
    margin-left: 24px;
    margin-right: 24px;
  }

  .as-slider {
    top: 0;
    left: 0;
    right: 0;
    transition: top;

    .as-slider-foreground {
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

    &.as-active {
      transform: translateX(-50%) translateY(-12px);
    }
  }
}

.as--translation-x-50\% {
  transform: translateX(-50%);
}
</style>
