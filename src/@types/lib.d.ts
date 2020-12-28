export interface SectionData {
  timestamp: TimestampData;
  endTime: number;
  isSkipped: boolean;
}

export interface TimestampData {
  key: string;
  normalizedAt: number;
  edited?: boolean;
  skipped?: boolean;
  active?: boolean;
}
