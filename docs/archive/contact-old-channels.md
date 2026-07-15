---
original_route: /contact
original_file: src/pages/Contact.jsx
removed_at: 2026-07-15
removed_in_commit: c865c46
reason: 'Contact page listed reserved-fake channels — hello@pathways.test (RFC 2606 reserved TLD), a 555-01xx phone (North American fictional prefix), and a "Lisbon HQ" that doesn't exist. Form submission was a no-op that toggled a local success state. Replaced with dinabudu@gmail.com + a mailto-composing form.'
---

# /contact — removed hero, contact channels, and form behavior

## Hero (rewritten)

**Was:**
- **Eyebrow:** Contact
- **H1:** Let's find your pathway together.
- **Body:** Questions about a pathway, partnerships, or mentorship? Drop us a note — a human replies within two business days.

**Now:** "Say hello." / body reframed around Roots + RQAP + direct-to-Dina.

## Contact info cards (removed)

Three `<ContactInfo>` cards in a sidebar column:

1. **Email**
   - Value: `hello@pathways.test`
   - Href: `mailto:hello@pathways.test`
   - Icon: mail
2. **Phone**
   - Value: `+1 (555) 010-0134`
   - Href: `tel:+15550100134`
   - Icon: phone
3. **Studio**
   - Value: `Remote-first · HQ in Lisbon, PT`
   - No href
   - Icon: pin

## Office hours card (removed)

```
Office hours
Mon – Thu     9:00 – 18:00
Friday        9:00 – 14:00
Weekends      Closed
```

## Form topics (kept, one relabeled)

Original topics dropdown:
- General question
- Pick a pathway for me
- Partner with us
- Mentor with us
- Press / media

New version keeps 4 of these, renames "Pick a pathway for me" → "Roots curriculum for my school".

## Form submit behavior (removed)

The original `onSubmit` did nothing but toggle a local `submitted`
state and reset the form fields — no server call, no email sent.
Success card rendered:

```
Thanks — your message is on its way.
A human from the team will reply within two business days.
[Send another message]
```

Both claims were false — no one received the message and no one
replied. New version composes a `mailto:dinabudu@gmail.com` link with
the subject and body prefilled, so the visitor's own email client
opens with the message ready to send.
