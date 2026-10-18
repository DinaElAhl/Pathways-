# Worksheet paid-access setup

The worksheet catalogue is at `/shop?preview=worksheets`. It offers one public
sample page per track. Full workbooks must not be committed or placed in `public/`.

There are nine separate products: ES-C/B/A, MS-C/B/A and HS-C/B/A. Their currency
is USD; prices and product URLs remain unset until confirmed. ES/MS/HS describe
the learner age group; C/B/A describe Roots learning stages, not CEFR ratings.

## For each product

1. Review the matching complete colour and low-ink editions, including the
   adult answer guide, checkpoints and age adaptation. Finalise the use terms.
2. In the Roots Payhip account, create a digital product with the exact track
   name. Upload that track's two PDFs. Use its single-page sample as a preview;
   never use the free sample as the only purchased file.
3. Set the confirmed USD price and paste the prepared description. State the
   exact number of worksheets, checkpoints and pages per edition. Videos,
   audio, live teaching and school-wide rights are not included by default.
4. Verify the connected payment account can receive payments. Do not replace
   existing Tajweed product links with these new products or reuse their IDs.
5. Test the product checkout and download delivery using Payhip's documented
   test process. Check that the download page and email link provide the
   correct two PDFs and that a phone can open both.
6. Update only that offer in `src/data/worksheetOffers.js`: `price`,
   `checkoutUrl`, `reviewApproved: true`, `deliveryVerified: true`. Keep
   `currency: 'USD'`. The website links to Payhip; it does not process payment,
   send purchase emails or grant a local website entitlement.
7. Run `node --test tests/worksheet-checkout.test.mjs`, then
   `npm run build`. Verify the matching age/stage on the deployed shop.

Unconfigured products stay unavailable. A checkout return URL or a browser flag
must never be treated as proof of payment. The provider controls paid file
delivery. Do not put purchased PDFs into a publicly accessible website route.

## Provider instructions

- [Adding digital products and testing checkout](https://help.payhip.com/article/59-adding-a-digital-product)
- [Customer receipt and download delivery](https://help.payhip.com/article/208-customer-did-not-receive-email)

No marketing email subscription is implied by a purchase. This setup does not
create a newsletter service, paid video membership or automated teacher payouts.
