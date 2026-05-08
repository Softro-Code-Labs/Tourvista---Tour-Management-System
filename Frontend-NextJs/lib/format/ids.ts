export function formatReservationId(id: number): string {
  return `RES-${String(id).padStart(6, '0')}`;
}

export function fromatePaymentId(id: number): string {
  return `PAY-${String(id).padStart(6, '0')}`;
}
