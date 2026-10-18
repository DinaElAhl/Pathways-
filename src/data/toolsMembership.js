export const toolsMembership = {
  title: 'Roots Teacher Membership',
  monthlyPrice: null,
  currency: 'USD',
  status: 'planning',
  // No checkout link until recurring billing, sign-in, server-side entitlements
  // and cancellation / expiry handling are working and verified.
  checkoutUrl: null,
  freeTools: [
    { title: 'E² Teacher Studio', description: 'Use the current planning and assessment tools.', href: '/teacher-studio/index.html', static: true },
    { title: 'E² rubrics and reflection', description: 'Reflect on a lesson and choose your next step.', href: '/teacher-studio/e2-rubrics-assessment.html', static: true },
    { title: 'Roots Spelling Bee', description: 'Practise or run a timed classroom spelling challenge.', href: '/spelling-bee' },
  ],
  plannedBenefits: [
    { title: 'Your private teaching workspace', description: 'Proposed: save and organise your work across devices after signing in.' },
    { title: 'An expanded editable resource library', description: 'Proposed: classroom-ready templates and practice sets, with clear use terms.' },
    { title: 'More ways to run class challenges', description: 'Proposed: teacher-managed events and saved results after the competition service is ready.' },
  ],
}
