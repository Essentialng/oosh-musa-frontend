// import { formatDistance, formatRelative, subDays } from 'date-fns';

// // Formatting a post timestamp
// export function getPostTimestamp(createdAt: Date): string {
//     const timeStamp = new Date(Number(createdAt))
//   return formatDistance(timeStamp, new Date(), { addSuffix: false });
//   // Outputs like "3 hours ago", "2 days ago"
// }

// // More precise relative time for recent posts
// export function getDetailedTimestamp(createdAt: Date): string {
//   return formatRelative(createdAt, new Date());
//   // Outputs like "last Tuesday at 4:30 PM"
// }

// ---------- version 2 ------------
import {
  formatDistance,
  formatRelative,
  parseISO,
  formatDistanceToNow,
} from "date-fns";

// Formatting a post timestamp
export function getPostTimestamp(createdAt: Date | string): string {
  // Convert to Date object if it's a string
  const timeStamp = createdAt instanceof Date ? createdAt : new Date(createdAt);

  return formatDistance(timeStamp, new Date(), { addSuffix: false });
}

// More precise relative time for recent posts
export function getDetailedTimestamp(createdAt: Date | string): string {
  // Convert to Date object if it's a string
  const timeStamp = createdAt instanceof Date ? createdAt : new Date(createdAt);

  return formatRelative(timeStamp, new Date());
  // Outputs like "last Tuesday at 4:30 PM"
}

export function timeAgo(date: string | null | undefined) {
  try {
    if (!date) {
      return date;
    }

    const convertedDate = parseISO(date);

    if (isNaN(convertedDate.getTime())) {
      return date;
    }

    return formatDistanceToNow(convertedDate, { addSuffix: true });
  } catch (error) {
    console.log(error);
    return date;
  }
}
