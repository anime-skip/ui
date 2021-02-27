<template>
  <div class="Slider">
    <div class="bar-container">
      <slot name="background">
        <div class="default-background" />
      </slot>
      <slot name="foreground" v-bind:progress="displayedProgress">
        <div class="default-foreground" :style="defaultForegroundOffsetStyle" />
      </slot>
    </div>
    <div class="thumb-container" :style="thumbOffsetStyle">
      <slot name="thumb">
        <div class="default-thumb" :class="{ seeking: isSeeking }" :style="thumbStyle">
          <div class="thumb-highlight" />
        </div>
      </slot>
    </div>
    <div class="mouse-event-handler select-none" @mousedown="onSeekStart" />
  </div>
</template>

<script lang="ts">
import Utils from '../Utils';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    progress: { type: Number, required: true },
    disableUpdateDuringSeek: Boolean,
    min: { type: Number, default: 0 },
    max: { type: Number, required: true, validator: (value: number) => value > 0 },
    defaultThumbSize: { type: Number },
  },
  emits: ['seek:start', 'seek:end', 'seek'],
  setup(props, { emit }) {
    const isSeeking = ref(false);
    const seekProgress = ref(0);
    const displayedProgress = computed<number>(() => {
      if (props.disableUpdateDuringSeek && isSeeking.value) {
        return seekProgress.value;
      }
      return props.progress;
    });
    const offsetLeftPercent = computed(() => {
      return ((displayedProgress.value - props.min) / (props.max - props.min)) * 100;
    });
    const updateProgressDuringSeek = (newProgress: number): void => {
      if (isSeeking.value && props.disableUpdateDuringSeek) {
        seekProgress.value = newProgress;
      } else if (newProgress !== displayedProgress.value) {
        emit('seek', newProgress);
      }
    };
    const progressFromMouseEvent = (event: MouseEvent, target?: HTMLDivElement): number => {
      const slider = target ?? (event.target as HTMLDivElement);
      const sliderClientX = slider.getBoundingClientRect().x;

      const extraPadding = 7;
      const min = sliderClientX + extraPadding;
      const max = sliderClientX + (slider.clientWidth - extraPadding);
      const boundedMouseX = Utils.boundedNumber(event.clientX, [min, max]);
      const decimalPercent = (boundedMouseX - min) / (max - min);
      const progress = (props.max - props.min) * decimalPercent + props.min;

      // console.debug(`Positions:\n
      //   slider.clientX: ${sliderClientX}
      //   slider.clientWidth: ${slider.clientWidth}
      //   slider.clientEnd: ${sliderClientX + slider.clientWidth}\n
      //   event.clientX: ${event.clientX}
      //   event.boundedClientX: ${boundedMouseX}\n
      //   min: ${min}
      //   max: ${max}
      //   percent: ${decimalPercent * 100}
      //   progress: ${progress}
      // `);
      return progress;
    };
    const onSeekEnd = (
      target: HTMLDivElement,
      onMouseMove: any,
      onMouseUpContainer: { callback?: any }
    ) =>
      function (event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        const newProgress = progressFromMouseEvent(event, target);
        isSeeking.value = false;
        emit('seek:end');
        emit('seek', newProgress);

        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUpContainer.callback);
      };
    const onSeekDrag = (target: HTMLDivElement) =>
      function (event: MouseEvent): void {
        const newProgress = progressFromMouseEvent(event, target);
        updateProgressDuringSeek(newProgress);
      };
    const onSeekStart = (event: MouseEvent) => {
      const newProgress = progressFromMouseEvent(event);
      isSeeking.value = true;
      emit('seek:start');
      updateProgressDuringSeek(newProgress);

      const localSeekDrag = onSeekDrag(event.target as HTMLDivElement);
      const localSeekEndContainer: { callback?: Function } = {};
      const localSeekEnd = onSeekEnd(
        event.target as HTMLDivElement,
        localSeekDrag,
        localSeekEndContainer
      );
      localSeekEndContainer.callback = localSeekEnd;
      window.addEventListener('mousemove', localSeekDrag);
      window.addEventListener('mouseup', localSeekEnd);
    };

    const thumbOffsetStyle = computed(() => `left: ${offsetLeftPercent.value}%;`);
    const thumbStyle = computed(
      () => `min-width: ${props.defaultThumbSize}px; min-height: ${props.defaultThumbSize}px;`
    );

    const defaultForegroundOffsetStyle = computed(
      () => `right: ${100 - offsetLeftPercent.value}%;`
    );

    return {
      thumbStyle,
      thumbOffsetStyle,
      defaultForegroundOffsetStyle,
      onSeekStart,
      isSeeking,
      displayedProgress,
    };
  },
});
</script>

<style lang="scss">
$height: 3px;
$thumbSize: $height + 4 * 2;
$thumbSizeUnitless: strip-unit($thumbSize);

.Slider {
  height: $height + 4px;
  overflow-y: visible;
  position: relative;
  flex-direction: row;
  --default-foreground-color: theme('colors.primary');
  --default-background-color: theme('colors.control-variant');

  .bar-container {
    position: absolute;
    left: 0;
    top: 2px;
    right: 0;
    height: $height;
  }

  .default-background {
    position: absolute;
    background-color: var(--default-background-color);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: $height;
    border-radius: $height / 2;
  }

  .default-foreground {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: var(--default-foreground-color);
    border-top-left-radius: $height / 2;
    border-bottom-left-radius: $height / 2;
  }

  .thumb-container {
    position: absolute;
    width: $thumbSize;
    height: $thumbSize;
    transform: (translateX(-$thumbSize / 2));
    top: -2px;
    overflow: visible;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .default-thumb {
      min-width: $thumbSize;
      min-height: $thumbSize;
      border-radius: 50%;
      background-color: var(--default-foreground-color);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;

      .thumb-highlight {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        content: '';
        background-color: transparent;
        opacity: 0;
        border-radius: 50%;
        transition: 200ms;
      }

      &.seeking {
        .thumb-highlight {
          left: -3px;
          right: -3px;
          top: -3px;
          bottom: -3px;
          opacity: 0.38;
          background-color: var(--default-foreground-color);
        }
      }
    }
  }

  .mouse-event-handler {
    position: absolute;
    left: -7px;
    right: -7px;
    top: -4px;
    bottom: -4px;
    cursor: pointer;
  }
}
</style>
