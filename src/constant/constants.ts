export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "video/mp4",
  "video/quicktime",
];
export const ALLOWED_STATUS_IMAGE = ["image/jpeg", "image/png", "image/gif"];
export const ALLOWED_STATUS_VIDEO = ["video/mp4", "video/quicktime"];

const whatsAppStatusColors = [
  { bg: "#FF5733", text: "#FFFFFF" }, // Bright Red
  { bg: "#25D366", text: "#FFFFFF" }, // WhatsApp Green
  { bg: "#3498DB", text: "#FFFFFF" }, // Bright Blue
  { bg: "#2ECC71", text: "#000000" }, // Emerald Green
  { bg: "#9B59B6", text: "#FFFFFF" }, // Purple
  { bg: "#F1C40F", text: "#000000" }, // Yellow
  { bg: "#E67E22", text: "#FFFFFF" }, // Orange
  { bg: "#34495E", text: "#FFFFFF" }, // Dark Blue Gray
  { bg: "#1ABC9C", text: "#000000" }, // Turquoise
  { bg: "#E74C3C", text: "#FFFFFF" }, // Bright Red
  { bg: "#2980B9", text: "#FFFFFF" }, // Deep Blue
  { bg: "#8E44AD", text: "#FFFFFF" }, // Dark Purple
  { bg: "#16A085", text: "#FFFFFF" }, // Green Sea
  { bg: "#27AE60", text: "#000000" }, // Nephritis Green
  { bg: "#D35400", text: "#FFFFFF" }, // Pumpkin Orange
];

export default whatsAppStatusColors;
