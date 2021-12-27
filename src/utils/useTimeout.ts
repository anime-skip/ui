import { onUnmounted, ref } from 'vue';

type UsedTimeout = [(...args: Parameters<typeof window.setTimeout>) => void, () => void];

/**
 * @returns `[setTimeout, clearTimeout]`
 */
export function useTimeout(): UsedTimeout {
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
