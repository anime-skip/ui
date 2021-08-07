export interface SectionData {
  timestamp: TimestampData;
  endTime: number;
  isSkipped: boolean;
}

export interface TimestampData {
  key: string;
  title?: string;
  normalizedAt: number;
  color?: string;
  skipped?: boolean;
  active?: boolean;
}
