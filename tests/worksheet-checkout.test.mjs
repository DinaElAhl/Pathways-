import test from 'node:test'
import assert from 'node:assert/strict'
import { getWorksheetCheckout } from '../src/data/worksheetCheckout.js'
import { worksheetOffers } from '../src/data/worksheetOffers.js'

const ready = { reviewApproved: true, deliveryVerified: true, currency: 'USD', price: 9, checkoutUrl: 'https://payhip.com/b/Test123' }
test('a reviewed, delivery-tested product with a confirmed price can link to checkout', () => {
  assert.deepEqual(getWorksheetCheckout(ready), { url: ready.checkoutUrl, priceLabel: '$9.00' })
})
test('review, delivery, currency, price and URL all fail closed', () => {
  for (const patch of [{ reviewApproved: false }, { deliveryVerified: false }, { price: null }, { price: NaN }, { price: 0 }, { price: -1 }, { currency: 'EGP' }, { checkoutUrl: null }, { checkoutUrl: 'javascript:alert(1)' }, { checkoutUrl: 'https://payhip.com.evil.test/b/Test123' }, { checkoutUrl: 'https://payhip.com/' }, { checkoutUrl: 'https://user@payhip.com/b/Test123' }, { checkoutUrl: 'http://payhip.com/b/Test123' }]) {
    assert.equal(getWorksheetCheckout({ ...ready, ...patch }), null, JSON.stringify(patch))
  }
})
test('all nine age/stage tracks have samples while unconfigured paid access stays closed', () => {
  assert.equal(worksheetOffers.length, 9)
  assert.equal(new Set(worksheetOffers.map(offer => offer.track)).size, 9)
  for (const age of ['ES', 'MS', 'HS']) for (const level of ['C', 'B', 'A']) {
    const offer = worksheetOffers.find(item => item.track === `${age}-${level}`)
    assert.ok(offer)
    assert.equal(offer.pages, level === 'C' ? 43 : 25)
    assert.equal(offer.checkpoints, level === 'C' ? 6 : 3)
    assert.match(offer.sample, /-sample\.pdf$/)
    if (!offer.reviewApproved || !offer.deliveryVerified || !offer.price || !offer.checkoutUrl) {
      assert.equal(getWorksheetCheckout(offer), null)
    }
    assert.ok(!Object.values(offer).some(value => typeof value === 'string' && /Worksheets-(Colour|Low-Ink)\.pdf/.test(value)))
  }
})
