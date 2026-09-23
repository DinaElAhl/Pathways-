// Legal pages — Privacy, Terms, Refunds.
//
// A good-faith baseline written to describe what the site actually does today,
// not a lawyer-reviewed document. If a data flow changes (a newsletter tool
// is chosen, the Apps Script registry is switched on, booking goes live), the
// matching section here must change with it. Rendered by src/pages/LegalPage.jsx.
//
// Each section: { heading, body: [paragraph strings], list?: [strings] }

export const LEGAL_EMAIL = 'roots@pathwayslearn.com'
export const LEGAL_UPDATED = '23 September 2026'

export const legalPages = {
  privacy: {
    path: '/privacy',
    title: 'Privacy Policy',
    intro:
      'This policy explains what personal information Roots (pathwayslearn.com) collects, why, how long we keep it, who else touches it, and how you can have it corrected or deleted. We have tried to write it in plain language and to describe only what the site really does.',
    sections: [
      {
        heading: 'What we collect',
        body: ['We collect as little as we can. Specifically:'],
        list: [
          'Your email address, when you ask for the free sample pack, ask to join our update list, or write to us. These forms open your own email app with a message addressed to us — nothing is stored by the website itself. We receive the email in our inbox like any other message.',
          'Exam details, when you sit a Roots exam. The RQAP Level 2 exam asks for the name you want on your certificate, your email, and optionally your country, age range and years of Arabic study. The RAQP proficiency exam asks for a student name and school type. Your answers are used to mark the exam.',
          'Your answers, when you submit an RQAP exam: the options you chose and the length of any written responses are sent to our scoring function to be marked. Audio recordings you make during the exam stay in your browser — only their length is sent, never the recording.',
          'Purchase details, when you buy from us on Payhip or Gumroad. Those platforms take the payment; we receive your name, email and what you bought so we can deliver it. We never see your card details.',
          'Basic technical data, such as IP address and browser type, which our hosting provider logs automatically when any web page is served.',
        ],
      },
      {
        heading: 'Why we use it',
        body: [],
        list: [
          'To send you what you asked for — the sample pack, a product, a reply.',
          'To mark exams, issue certificates, and let a school or parent check that a certificate is genuine.',
          'To keep the site running and secure.',
        ],
      },
      {
        heading: 'What we do not do',
        body: [
          'We do not sell, rent or trade your personal information. We do not use it for advertising, and we do not share it with anyone except the service providers listed below, who handle it only to provide their service to us.',
        ],
      },
      {
        heading: 'Service providers',
        body: ['These third parties process data on our behalf:'],
        list: [
          'Vercel — hosts the website, runs the exam-scoring function, and provides our page-view analytics.',
          'Google (Apps Script and Google Sheets) — our exam results and certificate registry. Where the registry is not yet switched on for an exam, results are kept only in your own browser.',
          'Payhip and Gumroad — sell and deliver our digital products and process payments.',
          'Our email provider — receives and stores the messages you send us.',
        ],
      },
      {
        heading: 'How long we keep it',
        body: [
          'Emails and correspondence: for as long as we need them to answer you and deliver what you asked for, and we will delete them on request.',
          'Exam and certificate records: for as long as the certificate can be verified, so that anyone you show it to can check it. You can ask us to remove a record, understanding that the certificate will then no longer verify.',
          'Purchase records: for as long as tax and accounting rules require.',
        ],
      },
      {
        heading: 'Children',
        body: [
          'Roots is used by children, usually through their school or family. We do not knowingly collect personal information from a child under 13 (under 16 in the EU and UK) without the consent of a parent, guardian, or a school acting on the parent’s behalf. Where a young learner sits a Roots exam, a parent, teacher or school should enter the details and supervise.',
          'If you believe a child has given us personal information without that consent, write to us and we will delete it.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          `Wherever you live, you can ask us to show you the personal information we hold about you, correct it, or delete it. Write to ${LEGAL_EMAIL} and we will respond within 30 days.`,
          'If you are in the EU or UK, the GDPR also gives you the right to object to or restrict processing, to data portability, and to complain to your local data protection authority. If you are a California resident, the CCPA gives you the right to know, delete and correct your information, and not to be discriminated against for exercising those rights. We do not sell or share personal information as the CCPA defines those terms.',
        ],
      },
      {
        heading: 'Cookies and local storage',
        body: [
          'We do not use advertising or tracking cookies. We count page visits with Vercel Web Analytics, which sets no cookies and does not identify you individually. Some pages save your progress in your own browser (local storage) — for example exam results on this device — so you can come back to them. You can clear this at any time from your browser settings.',
        ],
      },
      {
        heading: 'Changes',
        body: [
          'If we change how we handle personal information, we will update this page and the date at the top.',
        ],
      },
    ],
  },

  terms: {
    path: '/terms',
    title: 'Terms of Service',
    intro:
      'These terms apply when you use pathwayslearn.com and the Roots materials, exams and services offered through it. By using the site you agree to them. If you do not agree, please do not use the site.',
    sections: [
      {
        heading: 'Using the site',
        body: [
          'You may browse the site and use its free materials for your own learning, teaching and family use. Please do not misuse it: do not attempt to interfere with the site or its exams, access what is not offered to you, or use it for anything unlawful.',
        ],
      },
      {
        heading: 'Our content and your licence',
        body: [
          'The curriculum, lessons, exams, text, design and other content on this site belong to Roots or are used with permission, and are protected by copyright. We grant you a personal, non-exclusive, non-transferable licence to view and use them for your own learning and teaching.',
          'You may not resell, republish or redistribute our materials, or use them to build a competing product, without our written permission. Schools and organisations that want to use Roots with students do so under a school licence (see below).',
          'The Quranic text, hadith and classical sources we quote are not ours to license; our translations, commentary, arrangement and teaching materials around them are.',
        ],
      },
      {
        heading: 'Exams and certificates',
        body: [
          'Roots exams and certificates describe the level a candidate demonstrated on the day. You agree to sit an exam honestly and in your own name. We may withdraw a certificate that was obtained dishonestly.',
          'Where the site says an exam is aligned to a framework (such as the CEFR) or that accreditation is in progress, it means exactly that — it is not a claim of accreditation that has not been granted.',
        ],
      },
      {
        heading: 'No guarantee of outcomes',
        body: [
          'We work hard to make Roots accurate and effective, but learning depends on many things outside our control. The site and its materials are provided “as is”. We do not guarantee any particular result — a grade, an exam pass, admission, or a level of proficiency — from using them.',
          'To the extent the law allows, we are not liable for indirect or consequential losses arising from your use of the site. Nothing in these terms limits any right you have that cannot be limited by law.',
        ],
      },
      {
        heading: 'Payments',
        body: [
          'Prices are shown on the product page. Digital products are sold through Payhip and Gumroad, and their checkout terms also apply to your purchase.',
          'All sales of digital products are final unless expressly stated otherwise — see our Refund Policy for the cases where we do refund.',
        ],
      },
      {
        heading: 'School licences',
        body: [
          'Schools and organisations use Roots under a written licensing agreement signed with us. Where that agreement and these terms differ, the signed agreement governs the school’s use.',
        ],
      },
      {
        heading: 'Links to other sites',
        body: [
          'We link to other sites, including shops and recommended resources. We are not responsible for their content or practices.',
        ],
      },
      {
        heading: 'Governing law and disputes',
        body: [
          `These terms are governed by the laws of the Arab Republic of Egypt. If a dispute arises, please write to us first at ${LEGAL_EMAIL} — most things can be resolved by talking. Any dispute we cannot resolve together will be subject to the jurisdiction of the courts of Cairo, Egypt.`,
        ],
      },
      {
        heading: 'Changes',
        body: [
          'We may update these terms. The date at the top shows when they last changed; continuing to use the site after a change means you accept the updated terms.',
        ],
      },
    ],
  },

  refund: {
    path: '/refund',
    title: 'Refund Policy',
    intro:
      'We want you to be glad you bought from Roots. This page sets out when we refund and how to ask. To request a refund, write to us with your order details.',
    sections: [
      {
        heading: 'Digital products',
        body: [
          'For digital products such as the Tajweed Series — and paid exam attempts, once those are offered — you can ask for a full refund within 14 days of purchase, provided it is unused — for a paid exam attempt, that means the attempt has not been started.',
          'Where a product page states its own refund terms, those terms apply to that product. For example, the Pathways for Teachers desktop app carries a 7-day, no-questions-asked refund.',
        ],
      },
      {
        heading: 'School licences',
        body: [
          'A school licence can be cancelled for a full refund within 30 days of signing, as long as implementation has not begun. Once implementation has started — materials delivered for use with students, or teacher onboarding under way — the licence is non-refundable. Any different terms in your signed licensing agreement take precedence.',
        ],
      },
      {
        heading: 'Consultations and calls',
        body: [
          'Paid calls and consultations can be cancelled or rescheduled free of charge up to 24 hours before the start time, and you will be refunded in full. Cancellations made less than 24 hours before the session are not refunded. Once a session has begun, it is not refundable.',
          'If we need to cancel or reschedule, you choose between a new time and a full refund.',
        ],
      },
      {
        heading: 'How refunds are paid',
        body: [
          'Refunds go back to the original payment method through the platform you paid on (Payhip, Gumroad or the booking provider). How long it takes to appear depends on your bank.',
        ],
      },
      {
        heading: 'Your statutory rights',
        body: [
          'This policy does not affect any rights you have under the consumer law of the country where you live.',
        ],
      },
    ],
  },
}
