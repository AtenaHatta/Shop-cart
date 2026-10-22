export const GST_HST_RATE = 0.13;

export function gstHst(subtotalCents: number): number {
  return Math.round(subtotalCents * GST_HST_RATE);
}
