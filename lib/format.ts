// lib/format.ts
// Utilities for consistent UTC date formatting.
export function isoUTC(d: Date) {
  return d.toISOString().slice(0, 10);
}
