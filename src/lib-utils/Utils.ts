export default {
  boundedNumber(
    value: number,
    [lowBound, highBound]: [number | undefined, number | undefined]
  ): number {
    if (lowBound != null && value < lowBound) return lowBound;
    if (highBound != null && value > highBound) return highBound;
    return value;
  },
};
