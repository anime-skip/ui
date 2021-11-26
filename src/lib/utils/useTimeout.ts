import { onUnmounted, ref } from 'vue';

/**
 * @returns `[setTimeout, clearTimeout]`
 */
export function useTimeout(): [
  (...args: Parameters<typeof window.setTimeout>) => void,
  () => void
] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timeout = ref<any | undefined>();
  const setCustomTimeout = (...args: Parameters<typeof window.setTimeout>) => {
    timeout.value = setTimeout(...args);
  };
  onUnmounted(() => {
    if (timeout.value != null) clearTimeout(timeout.value);
  });
  const clearCustomTimeout = () => {
    if (timeout.value != null) {
      clearTimeout(timeout.value);
    }
  };

  return [setCustomTimeout, clearCustomTimeout];
}
