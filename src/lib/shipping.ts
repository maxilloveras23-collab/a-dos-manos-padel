export const FREE_SHIPPING_THRESHOLD_ARS = 300_000;
export const FLAT_SHIPPING_COST_ARS = 8_000;

export function calculateShippingCost(subtotalArs: number): number {
  return subtotalArs >= FREE_SHIPPING_THRESHOLD_ARS ? 0 : FLAT_SHIPPING_COST_ARS;
}
