// New worksheet products use external checkout links only. Paid files stay off
// public hosting; the matching Payhip product must deliver the uploaded pack.
export function getWorksheetCheckout(offer) {
  if (!offer || offer.reviewApproved !== true || offer.deliveryVerified !== true) return null
  if (offer.currency !== 'USD' || !Number.isFinite(offer.price) || offer.price <= 0) return null
  try {
    const url = new URL(offer.checkoutUrl)
    if (url.protocol !== 'https:' || url.hostname !== 'payhip.com') return null
    if (url.username || url.password || url.port || !/^\/b\/[A-Za-z0-9]+\/?$/.test(url.pathname)) return null
    return { url: url.href, priceLabel: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(offer.price) }
  } catch {
    return null
  }
}
