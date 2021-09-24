export function formatCurrency(price: number): string {
  return price.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR',
  })
}
