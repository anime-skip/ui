<template>
  <div
    ref="timelineRef"
    class="Timeline relative pt-1 -mt-1 pb-2 -mb-2"
    @mouseenter="toggleHover(true)"
    @mouseleave="toggleHover(false)"
    @mousemove="moveOverlay"
  >
    <!-- Overlay -->
    <div
      v-if="allowOverlay"
      class="absolute w-full h-0 -top-1 opacity-0 transition-opacity whitespace-nowrap z-10 pointer-events-none select-none"
      :class="{
        'opacity-100': isShowingHoverOverlay,
      }"
    >
      <div
        ref="overlayRef"
        class="absolute bottom-0 -translation-x-50% px-2"
        :style="`left: ${hoverOverlayLeftPx}px`"
      >
        <card :elevation="12" class="py-2 px-2.5 text-center">
          <p class="subtitle-1 text-opacity-100 text-primaryPalette-300 font-bold">
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
      <path d="M6 6L0 0H12L6 6Z" :style="pathStyle(timestamp)" />
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
        active: timestamp.active,
      };
    };
    const pathStyle = (timestamp: TimestampData) => {
      return {
        fill: timestamp.color ?? theme['textColor-primaryPalette-400'],
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
      pathStyle,
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
      fill: theme('colors.primaryPalette.500');
    }
    &.edited {
      path {
        fill: theme('colors.complementaryPalette.500');
      }
    }

    &.active {
      transform: translateX(-50%) translateY(-12px);
    }
  }
}

.-translation-x-50\% {
  transform: translateX(-50%);
}
</style>
