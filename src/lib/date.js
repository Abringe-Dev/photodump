export function parseDateOnly(value) {
  if (value instanceof Date) return value;
  if (!value || typeof value !== "string") return null;

  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;

  return new Date(year, month - 1, day);
}

export function formatDate(value, options = {}) {
  const date = parseDateOnly(value);
  if (!date) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    ...options,
  }).format(date);
}

export function formatShortDate(value) {
  return formatDate(value, { month: "short" });
}
