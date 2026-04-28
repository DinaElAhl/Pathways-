export const accreditedExams = [
    // English Language Exams
  {
        id: 1,
        name: 'TOEFL (Test of English as a Foreign Language)',
        category: 'English',
        type: 'Standardized',
        countries: ['USA', 'Canada', 'UK', 'Australia', 'Global'],
        description: 'The most widely recognized English proficiency test, accepted by thousands of institutions worldwide.',
        recognizedBy: 'Universities and employers globally',
        level: 'All levels (iBT: 0-120)',
        cost: '$245',
        availability: 'Year-round',
        url: 'https://www.ets.org/toefl'
  },
  {
        id: 2,
        name: 'IELTS (International English Language Testing System)',
        category: 'English',
        type: 'Standardized',
        countries: ['UK', 'Australia', 'Canada', 'New Zealand', 'USA'],
        description: 'British English proficiency test widely accepted for university and immigration purposes.',
        recognizedBy: 'UK universities, immigration authorities, employers',
        level: 'Band 1-9',
        cost: '$220-300',
        availability: 'Multiple dates throughout the year',
        url: 'https://www.ielts.org'
  },
  {
        id: 3,
        name: 'Cambridge English Exams',
        category: 'English',
        type: 'Standardized',
        countries: ['UK', 'Europe', 'Global'],
        description: 'A series of Cambridge qualifications at various levels from A1 to C2.',
        recognizedBy: 'Universities, employers, governments',
        level: 'A1-C2 (CEFR)',
        cost: '$150-250',
        availability: 'Multiple sessions per year',
        url: 'https://www.cambridgeenglish.org'
  },
    // French Language Exams
  {
        id: 4,
        name: 'DELF (Diplôme d\'Études en Langue Française)',
        category: 'French',
        type: 'Standardized',
        countries: ['France', 'Europe', 'Global'],
        description: 'French government-recognized diploma for non-native speakers at A1-B2 levels.',
        recognizedBy: 'French institutions, employers, immigration',
        level: 'A1, A2, B1, B2',
        cost: '$60-120',
        availability: 'Multiple dates per year',
        url: 'https://www.delfprimaire.org'
  },
  {
        id: 5,
        name: 'DALF (Diplôme Approfondi de Langue Française)',
        category: 'French',
        type: 'Standardized',
        countries: ['France', 'Europe', 'Global'],
        description: 'Advanced French diploma for non-native speakers at C1-C2 levels.',
        recognizedBy: 'French universities, employers, immigration',
        level: 'C1, C2',
        cost: '$120-150',
        availability: 'Multiple dates per year',
        url: 'https://www.delfprimaire.org'
  },
    // Spanish Language Exams
  {
        id: 6,
        name: 'DELE (Diplomas de Español como Lengua Extranjera)',
        category: 'Spanish',
        type: 'Standardized',
        countries: ['Spain', 'Latin America', 'Global'],
        description: 'Spanish government-recognized diploma for non-native speakers.',
        recognizedBy: 'Spanish universities, employers, immigration',
        level: 'A1-C2',
        cost: '$80-150',
        availability: 'Multiple convocations per year',
        url: 'https://www.cervantes.es'
  },
    // German Language Exams
  {
        id: 7,
        name: 'Goethe-Zertifikat',
        category: 'German',
        type: 'Standardized',
        countries: ['Germany', 'Europe', 'Global'],
        description: 'German proficiency certification from the Goethe Institute.',
        recognizedBy: 'German universities, employers, immigration',
        level: 'A1-C2',
        cost: '$60-130',
        availability: 'Multiple dates throughout the year',
        url: 'https://www.goethe.de'
  },
  {
        id: 8,
        name: 'TestDAF (Test Deutsch als Fremdsprache)',
        category: 'German',
        type: 'Standardized',
        countries: ['Germany', 'Austria', 'Switzerland'],
        description: 'German language exam specifically for university admission in German-speaking countries.',
        recognizedBy: 'German universities',
        level: 'C1 equivalent',
        cost: '$150-180',
        availability: 'Multiple dates per year',
        url: 'https://www.testdaf.de'
  },
    // Arabic Language Exams
  {
        id: 9,
        name: 'ACTFL OPI (Oral Proficiency Interview)',
        category: 'Arabic',
        type: 'Standardized',
        countries: ['USA', 'Global'],
        description: 'American standard oral proficiency assessment for Arabic and other languages.',
        recognizedBy: 'US universities, US government, employers',
        level: 'Novice-Superior',
        cost: '$150-200',
        availability: 'By appointment',
        url: 'https://www.actfl.org'
  },
  {
        id: 10,
        name: 'ALPT (Arabic Language Proficiency Test)',
        category: 'Arabic',
        type: 'Standardized',
        countries: ['USA', 'Global'],
        description: 'Arabic proficiency test used by US military and government agencies.',
        recognizedBy: 'US government, military, intelligence agencies',
        level: ' 0-5 Scale',
        cost: 'Free for US government employees',
        availability: 'By appointment',
        url: 'https://www.cna.org'
  },
  {
        id: 11,
        name: 'ALECSO Arabic Certification',
        category: 'Arabic',
        type: 'Standardized',
        countries: ['Arab States', 'MENA'],
        description: 'Arab League Educational, Cultural and Scientific Organization certification.',
        recognizedBy: 'Arab universities and institutions',
        level: 'A1-C2',
        cost: '$50-100',
        availability: 'Variable by center',
        url: 'https://www.alecso.org'
  },
  {
        id: 12,
        name: 'DAAREM (Digital Arabic Assessment and Review of Essential Modern)',
        category: 'Arabic',
        type: 'Digital',
        countries: ['Global'],
        description: 'Modern digital Arabic proficiency assessment.',
        recognizedBy: 'International institutions',
        level: 'All levels',
        cost: '$50-150',
        availability: 'Online, on-demand',
        url: 'https://www.daarem.com'
  },
    // Chinese Language Exams
  {
        id: 13,
        name: 'HSK (Hanyu Shuiping Kaoshi)',
        category: 'Chinese',
        type: 'Standardized',
        countries: ['China', 'Global'],
        description: 'Chinese proficiency test for non-native speakers administered by Confucius Institutes.',
        recognizedBy: 'Chinese universities, employers',
        level: 'Level 1-6',
        cost: '$30-120',
        availability: 'Multiple dates throughout the year',
        url: 'https://www.chinesetest.cn'
  },
    // Japanese Language Exams
  {
        id: 14,
        name: 'JLPT (Japanese Language Proficiency Test)',
        category: 'Japanese',
        type: 'Standardized',
        countries: ['Japan', 'Global'],
        description: 'Primary Japanese proficiency test for non-native speakers.',
        recognizedBy: 'Japanese universities, employers, immigration',
        level: 'N5-N1',
        cost: '$40-80',
        availability: '2x per year',
        url: 'https://www.jlpt.jp'
  },
    // Professional Certifications
  {
        id: 15,
        name: 'Microsoft Certified Associate',
        category: 'Technology',
        type: 'Professional',
        countries: ['Global'],
        description: 'Microsoft certification validating technical skills and knowledge.',
        recognizedBy: 'Tech employers worldwide',
        level: 'Associate to Expert',
        cost: '$100-150 per exam',
        availability: 'Year-round',
        url: 'https://learn.microsoft.com/en-us/certifications'
  },
  {
        id: 16,
        name: 'AWS Certified Solutions Architect',
        category: 'Technology',
        type: 'Professional',
        countries: ['Global'],
        description: 'Amazon Web Services certification for cloud architecture professionals.',
        recognizedBy: 'Cloud computing employers',
        level: 'Associate to Professional',
        cost: '$150 per exam',
        availability: 'Year-round',
        url: 'https://aws.amazon.com/certification'
  },
    // Additional International Exams
  {
        id: 17,
        name: 'CEFR (Common European Framework of Reference)',
        category: 'European Standard',
        type: 'Framework',
        countries: ['Europe', 'Global'],
        description: 'International standard for describing language proficiency levels A1-C2.',
        recognizedBy: 'Educational institutions worldwide',
        level: 'A1-C2',
        cost: 'Varies by exam',
        availability: 'Used by many exams',
        url: 'https://www.coe.int/en/web/common-european-framework-reference-languages'
  },
  {
        id: 18,
        name: 'SAT (Scholastic Assessment Test)',
        category: 'University Entrance',
        type: 'Standardized',
        countries: ['USA', 'Global'],
        description: 'American college entrance examination required by most US universities.',
        recognizedBy: 'US colleges and universities',
        level: '400-1600',
        cost: '$57-81',
        availability: '7x per year',
        url: 'https://www.collegeboard.org/sat'
  },
  {
        id: 19,
        name: 'ACT (American College Test)',
        category: 'University Entrance',
        type: 'Standardized',
        countries: ['USA', 'Global'],
        description: 'American college entrance examination alternative to SAT.',
        recognizedBy: 'US colleges and universities',
        level: '1-36',
        cost: '$68-91',
        availability: '7x per year',
        url: 'https://www.act.org'
  },
  {
        id: 20,
        name: 'GRE (Graduate Record Examination)',
        category: 'University Entrance',
        type: 'Standardized',
        countries: ['Global'],
        description: 'Graduate school entrance exam required by most American graduate programs.',
        recognizedBy: 'Graduate schools worldwide',
        level: '260-340',
        cost: '$205',
        availability: 'Year-round',
        url: 'https://www.ets.org/gre'
  }
  ];

export const examCategories = [
    'All Exams',
    'English',
    'French',
    'Spanish',
    'German',
    'Arabic',
    'Chinese',
    'Japanese',
    'Technology',
    'University Entrance',
    'Professional',
    'European Standard'
  ];

export const examRegions = [
    'Global',
    'North America',
    'Europe',
    'Asia',
    'Middle East & North Africa (MENA)',
    'Latin America',
    'Australia & Oceania'
  ];
