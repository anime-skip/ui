export function boundedNumber(
  value: number,
  [lowBound, highBound]: [number | undefined, number | undefined]
): number {
  if (lowBound != null && value < lowBound) return lowBound;
  if (highBound != null && value > highBound) return highBound;
  return value;
}

export function formatSeconds(seconds: number, includeDecimals: boolean): string {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const hr = hours;
  const min = minutes % 60;
  const sec = seconds % 60;

  let decimalSec: string | number = padLeft(Math.floor(sec), 2);
  if (includeDecimals) {
    decimalSec = `${decimalSec}.${padRight(Math.floor((sec - Math.floor(sec)) * 100), 2)}`;
  }

  let sections: Array<string | number>;
  if (hr > 0) sections = [hr, padLeft(min, 2), decimalSec];
  else sections = [min, decimalSec];

  return sections.join(':');
}

export function padLeft(value: number | string, size: number, char = '0'): string {
  let num = value.toString();
  while (num.length < size) num = char + num;
  return num;
}

export function padRight(value: number | string, size: number, char = '0'): string {
  let num = value.toString();
  while (num.length < size) num += char;
  return num;
}
