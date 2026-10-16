// Product setup only. No payment secrets or full-book files belong in the client.
// Activate after the final edition, price and real Payhip listing are confirmed.
export const encyclopediaCommerce = {
  provider: 'Payhip',
  currency: 'USD',
  price: null,
  productUrl: null,
  finalEditionApproved: false,
  delivery: [
    { title: 'Choose the full edition', text: 'Read the free sample first. The full book will be sold as a separate digital product.' },
    { title: 'Pay securely on Payhip', text: 'When sales open, checkout will take place on Payhip using the payment methods enabled in the Roots store.' },
    { title: 'Check your email', text: 'After a successful purchase, Payhip will send a receipt with a link to download the EPUB. Keep that email for later access.' },
  ],
}

export function encyclopediaCheckoutReady(product = encyclopediaCommerce) {
  if (!product.finalEditionApproved || !Number.isFinite(product.price) || product.price <= 0) return false
  try {
    const url = new URL(product.productUrl)
    return url.protocol === 'https:' && url.hostname === 'payhip.com' && url.pathname.startsWith('/b/') && url.pathname.length > 3
  } catch { return false }
}
