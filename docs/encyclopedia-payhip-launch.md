# Quran Encyclopedia — Payhip launch preparation

Status: PREPARATION ONLY. No product has been created or charged through this work. Existing Payhip/Gumroad products and payment integrations are unchanged. No emails have been sent.

## Product listing draft

Title: The Quran Encyclopedia | موسوعة القرآن — Roots Digital Edition

Format: EPUB digital download. Not a printed book, PDF, video course, or subscription.

Description:

Read, understand and reflect with a surah-by-surah Qur'an study companion from Roots. The full edition brings together all 114 surahs with Arabic text, transliteration, English translation, overviews, vocabulary notes, life applications and reflection questions. Use the free Al-Fatiha sample before deciding whether this format suits you.

After successful payment, Payhip sends a purchase receipt with a download link. Save the email and open the EPUB in a compatible reading app. This product does not grant access to paid videos or a private reader on pathwayslearn.com.

The study prompts are educational aids, not a substitute for tafsir or qualified teaching. Arabic is credited to Tanzil in the source book; English verse translation is credited to Abdullah Yusuf Ali. Preserve the book's full source and copyright notices.

Price/currency: awaiting owner confirmation. No price is assumed.

Cover: use an approved Roots cover, not an unrelated screenshot or the draft's internal review banner.

## Current files are not sale-ready

The full private working EPUB is `.work/encyclopedia-complete/Roots-Quran-Encyclopedia-Working-Edition.epub`. Its 114 chapters and 6,236 numbered verse inventory were checked. Dedicated sourced stories are still missing; source notes and interpretations require editorial review. Do not upload it as an approved final product. The private browser preview must not be put in public assets: it contains the complete text.

## Owner setup in Payhip

1. In Payhip, open Account → Settings → Payment Details and connect the appropriate verified PayPal account. Confirm the connection in PayPal yourself. Never share passwords or secret keys in chat.
2. Create a Digital Product listing in draft/unlisted state, with the final reviewed EPUB, approved cover, description and confirmed one-time price.
3. Confirm the upload actually includes the EPUB. A listing without a file cannot deliver the book.
4. Set receipt/support wording and link the current Roots terms, privacy and refund policies. Make sure the published listing and site promise the same delivery and refund terms.
5. Complete a controlled checkout test, confirm the email arrives and the file downloads and opens, then provide the verified `https://payhip.com/b/...` product link.
6. Set `src/data/encyclopediaCommerce.js`: confirmed price, currency, real product URL and `finalEditionApproved: true`. Build and verify the live sample page before announcing sales.

Do not use an existing Tajweed bundle checkout link for this product. Do not request live payment until the final file and delivery have been tested.

## Activation guard

The website renders a purchase link only when a final edition is explicitly approved, the price is positive and a valid Payhip product URL is set. Otherwise it states payments are not yet accepted. No client-side flags grant access to the full book.

## Paid video courses are a separate phase

Payhip can host courses with customer login, or Roots can later implement a private learning area. Watching on pathwayslearn.com requires server-verified purchase entitlements, secure authentication, private media storage and payment/refund synchronization. Existing public preview files and local-storage login flags are not sufficient. Do not upload paid lessons into `public/` or promise on-site access before this exists.

Official references:
- https://help.payhip.com/article/64-connecting-your-paypal-account
- https://help.payhip.com/article/164-how-to-sell-your-first-product-on-payhip
- https://help.payhip.com/article/379-did-not-receive-files-or-orders
- https://help.payhip.com/article/178-add-course-products
