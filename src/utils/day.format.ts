import { formatDistance, formatRelative, subDays } from 'date-fns';

// Formatting a post timestamp
export function getPostTimestamp(createdAt: Date): string {
    const timeStamp = new Date(Number(createdAt))
  return formatDistance(timeStamp, new Date(), { addSuffix: false });
  // Outputs like "3 hours ago", "2 days ago"
}

// More precise relative time for recent posts
export function getDetailedTimestamp(createdAt: Date): string {
  return formatRelative(createdAt, new Date());
  // Outputs like "last Tuesday at 4:30 PM"
}
