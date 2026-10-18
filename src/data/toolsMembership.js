export const toolsMembership = {
  title: 'Roots memberships',
  monthlyPrice: null,
  currency: 'USD',
  status: 'planning',
  // No checkout link until recurring billing, sign-in, server-side entitlements
  // and cancellation / expiry handling are working and verified.
  checkoutUrl: null,
  plans: [
    {
      id: 'teacher', title: 'Individual teacher', audience: 'For an independent teacher or homeschool educator',
      color: 'yellow', monthlyPrice: null, pricing: 'monthly', scope: 'One teacher’s own teaching work',
      benefits: ['Private lesson plans and reusable templates', 'Saved classes, assignments and feedback', 'Personal progress records across devices'],
      boundary: 'Proposed individual access. Sharing a login or reselling resources would not be included.',
    },
    {
      id: 'team', title: 'Small teaching business', audience: 'For tutors working together or a small learning centre',
      color: 'mint', monthlyPrice: null, pricing: 'monthly', scope: 'A shared workspace for a small team',
      benefits: ['Individual teacher features for agreed team seats', 'Shared lesson templates and class organisation', 'An owner view of team activity and learner progress'],
      boundary: 'Proposed team access. Teacher seats and learner limits would be agreed before purchase.',
    },
    {
      id: 'school', title: 'School', audience: 'For schools coordinating several teachers and classes',
      color: 'coral', monthlyPrice: null, pricing: 'quote', scope: 'A workspace sized for your school',
      benefits: ['An agreed number of teacher and administrator seats', 'School-wide organisation and progress reporting', 'An onboarding plan matched to your school'],
      boundary: 'School-specific quote based on staff, learners and support needs. Curriculum licensing is separate.',
    },
  ],
  freeTools: [
    { title: 'E² Mini LMS pilot', description: 'Organise classes, lessons and manual learner-file exchanges on this browser.', href: '/e2-mini', cta: 'Open the workspace' },
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
