export type ViewType = 'month' | 'week' | 'day';
export type EventType = 'event' | 'todo' | 'reminder';

export interface CalendarItem {
  id: string;
  title: string;
  date: Date;
  type: EventType;
}