export const accreditedExams = [
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
            difficulty: 4,
            url: 'https://www.ets.org/toefl',
            prepResources: [
                { name: 'Official TOEFL Site', url: 'https://www.ets.org/toefl' },
                { name: 'Free Practice Tests', url: 'https://www.ets.org/toefl/test-takers/ibt/prepare' },
                { name: 'Khan Academy TOEFL Prep', url: 'https://www.khanacademy.org' }
                    ]
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
            difficulty: 3.5,
            url: 'https://www.ielts.org',
            prepResources: [
                { name: 'Official IELTS Portal', url: 'https://www.ielts.org' },
                { name: 'IELTS Practice Tests', url: 'https://www.ielts.org/for-test-takers' },
                { name: 'British Council Resources', url: 'https://www.britishcouncil.org' }
                    ]
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
            difficulty: 3,
            url: 'https://www.cambridgeenglish.org',
            prepResources: [
                { name: 'Cambridge Official Site', url: 'https://www.cambridgeenglish.org' },
                { name: 'Sample Papers', url: 'https://www.cambridgeenglish.org/exams-and-tests/find-past-papers-and-mark-schemes' },
                { name: 'Preparation Materials', url: 'https://www.cambridgeenglish.org/learning-english' }
                    ]
    },
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
            difficulty: 3.5,
            url: 'https://www.delfprimaire.org',
            prepResources: [
                { name: 'France Education Official', url: 'https://www.delfprimaire.org' },
                { name: 'DELF Exam Preparation', url: 'https://www.tv5monde.com/delf' },
                { name: 'Practice Materials', url: 'https://www.rfi.fr/fr/apprendre-le-francais' }
                    ]
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
            difficulty: 4.5,
            url: 'https://www.delfprimaire.org',
            prepResources: [
                { name: 'Official DALF Site', url: 'https://www.delfprimaire.org' },
                { name: 'Advanced Prep', url: 'https://www.francaisfacile.com' },
                { name: 'Literary Preparation', url: 'https://www.rfi.fr/fr' }
                    ]
    },
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
            difficulty: 3,
            url: 'https://www.cervantes.es',
            prepResources: [
                { name: 'Cervantes Institute', url: 'https://www.cervantes.es' },
                { name: 'DELE Exam Prep', url: 'https://www.cervantes.es/lengua_y_ensenanza/prueba_dele.html' },
                { name: 'Spanish Learning Portal', url: 'https://www.rtve.es/aprender-espanol' }
                    ]
    },
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
            difficulty: 3.5,
            url: 'https://www.goethe.de',
            prepResources: [
                { name: 'Goethe Institut', url: 'https://www.goethe.de' },
                { name: 'Exam Preparation', url: 'https://www.goethe.de/de/spr/kur.html' },
                { name: 'Sample Tests', url: 'https://www.goethe.de/de/spr/ueb.html' }
                    ]
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
            difficulty: 4.5,
            url: 'https://www.testdaf.de',
            prepResources: [
                { name: 'TestDAF Official', url: 'https://www.testdaf.de' },
                { name: 'Preparation Modules', url: 'https://www.testdaf.de/de/vorbereitung/' },
                { name: 'Sample Test', url: 'https://www.testdaf.de/de/teilnehmende/uebungsmaterialien/' }
                    ]
    },
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
            difficulty: 4,
            url: 'https://www.actfl.org',
            prepResources: [
                { name: 'ACTFL Official', url: 'https://www.actfl.org' },
                { name: 'Proficiency Guidelines', url: 'https://www.actfl.org/publications/actfl-proficiency-guidelines-2015' },
                { name: 'Prep Resources', url: 'https://www.actfl.org/professional-development' }
                    ]
    },
    {
            id: 10,
            name: 'ALPT (Arabic Language Proficiency Test)',
            category: 'Arabic',
            type: 'Standardized',
            countries: ['USA', 'Global'],
            description: 'Arabic proficiency test used by US military and government agencies.',
            recognizedBy: 'US government, military, intelligence agencies',
            level: '0-5 Scale',
            cost: 'Free for US government employees',
            availability: 'By appointment',
            difficulty: 4.5,
            url: 'https://www.cna.org',
            prepResources: [
                { name: 'Defense Language Institute', url: 'https://www.dli.army.mil' },
                { name: 'Language Prep', url: 'https://www.cna.org/about-us/divisions-and-programs/foreign-policy' },
                { name: 'Assessment Info', url: 'https://www.dli.army.mil/index.html' }
                    ]
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
            difficulty: 3.5,
            url: 'https://www.alecso.org',
            prepResources: [
                { name: 'ALECSO Official', url: 'https://www.alecso.org' },
                { name: 'Arabic Resources', url: 'https://www.alarabiya.net' },
                { name: 'Exam Centers', url: 'https://www.alecso.org' }
                    ]
    },
    {
            id: 12,
            name: 'DAAREM (Digital Arabic Assessment)',
            category: 'Arabic',
            type: 'Digital',
            countries: ['Global'],
            description: 'Modern digital Arabic proficiency assessment.',
            recognizedBy: 'International institutions',
            level: 'All levels',
            cost: '$50-150',
            availability: 'Online, on-demand',
            difficulty: 3,
            url: 'https://www.daarem.com',
            prepResources: [
                { name: 'DAAREM Platform', url: 'https://www.daarem.com' },
                { name: 'Digital Learning', url: 'https://www.duolingo.com/course/ar' },
                { name: 'Arabic Resources', url: 'https://www.busuu.com' }
                    ]
    },
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
            difficulty: 4,
            url: 'https://www.chinesetest.cn',
            prepResources: [
                { name: 'Official HSK', url: 'https://www.chinesetest.cn' },
                { name: 'Practice Tests', url: 'https://www.chinesetest.cn/goQuestionDetailAction.do' },
                { name: 'Study Materials', url: 'https://www.duolingo.com/course/zh' }
                    ]
    },
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
            difficulty: 4.5,
            url: 'https://www.jlpt.jp',
            prepResources: [
                { name: 'JLPT Official', url: 'https://www.jlpt.jp' },
                { name: 'Sample Tests', url: 'https://www.jlpt.jp/e/samples.html' },
                { name: 'Preparation Guides', url: 'https://www.japantimes.co.jp/life/2019/06/02/language/jlpt-study-tips/' }
                    ]
    },
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
            difficulty: 3.5,
            url: 'https://learn.microsoft.com/en-us/certifications',
            prepResources: [
                { name: 'Microsoft Learn', url: 'https://learn.microsoft.com' },
                { name: 'Exam Prep', url: 'https://learn.microsoft.com/en-us/certifications/browse/?resource_type=examination' },
                { name: 'Practice Tests', url: 'https://www.measureup.com' }
                    ]
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
            difficulty: 4,
            url: 'https://aws.amazon.com/certification',
            prepResources: [
                { name: 'AWS Training', url: 'https://aws.amazon.com/training/' },
                { name: 'Exam Prep', url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/' },
                { name: 'Practice Exams', url: 'https://www.tutorialsdojo.com' }
                    ]
    },
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
            difficulty: 2,
            url: 'https://www.coe.int/en/web/common-european-framework-reference-languages',
            prepResources: [
                { name: 'Council of Europe', url: 'https://www.coe.int' },
                { name: 'CEFR Description', url: 'https://www.coe.int/en/web/common-european-framework-reference-languages' },
                { name: 'Reference Guide', url: 'https://www.cambridge-university-press.org' }
                    ]
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
            difficulty: 4,
            url: 'https://www.collegeboard.org/sat',
            prepResources: [
                { name: 'College Board SAT', url: 'https://www.collegeboard.org/sat' },
                { name: 'Khan Academy SAT', url: 'https://www.khanacademy.org/test-prep/sat' },
                { name: 'Practice Tests', url: 'https://www.collegeboard.org/sat/practice' }
                    ]
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
            difficulty: 3.5,
            url: 'https://www.act.org',
            prepResources: [
                { name: 'ACT Official', url: 'https://www.act.org' },
                { name: 'Free Practice', url: 'https://www.act.org/content/act/parents/act-basics/test-prep.html' },
                { name: 'Test Prep', url: 'https://www.act.org/the-act/test-day-essentials' }
                    ]
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
            difficulty: 4.5,
            url: 'https://www.ets.org/gre',
            prepResources: [
                { name: 'GRE Official', url: 'https://www.ets.org/gre' },
                { name: 'Free Practice', url: 'https://www.ets.org/gre/revised_general/prepare' },
                { name: 'Study Guides', url: 'https://www.ets.org/gre/pdf/gre_guide.pdf' }
                    ]
    },
  {
            id: 21,
                        name: 'Ijazah in Quran Recitation (Hafs an Asim)',
                        category: 'Quran',
                        type: 'Certification',
                        countries: ['Saudi Arabia', 'Egypt', 'Global', 'Middle East & North Africa (MENA)'],
                        description: 'The gold standard Quranic certification — a continuous chain (isnad) back to the Prophet. Awarded after memorising the Quran and mastering Tajweed rules under a certified sheikh.',
                        recognizedBy: 'Islamic universities, mosques, and scholars worldwide',
                        level: 'Advanced — full Hifz with Tajweed mastery',
                        cost: 'Varies (often free with a qualified sheikh)',
                        availability: 'Year-round, by appointment with a certified scholar',
                        difficulty: 5,
                        url: 'https://quran.com',
                        prepResources: [
                { name: 'Quran.com — Read & Listen', url: 'https://quran.com' },
                { name: 'Bayyinah Institute — Arabic & Quran', url: 'https://bayyinah.com' },
                { name: 'Al-Azhar University Resources', url: 'https://azhar.edu.eg' },
                { name: 'Tajweed Rules (Tajweed Me)', url: 'https://tajweed.me' }
                        ]
},
{
            id: 22,
                        name: 'Ijazah in Quran Memorisation (Hifz)',
                        category: 'Quran',
                        type: 'Certification',
                        countries: ['Global', 'Saudi Arabia', 'Egypt', 'Pakistan', 'Middle East & North Africa (MENA)'],
                        description: 'Official certification for complete memorisation of the Holy Quran (30 juz). Issued by accredited Islamic institutes after oral examination with a certified examiner.',
                        recognizedBy: 'Islamic institutions, madrasas, and religious authorities globally',
                        level: 'All levels (partial Hifz certifications also available)',
                        cost: 'Varies by institution (many offer free certification)',
                        availability: 'Year-round — multiple examination sessions',
                        difficulty: 5,
                        url: 'https://quran.com/memorization',
                        prepResources: [
                { name: 'Quran.com Memorisation Tools', url: 'https://quran.com/memorization' },
                { name: 'Memorize Quran App', url: 'https://memorizequran.com' },
                { name: 'Tarteel AI — Quran Recitation', url: 'https://tarteel.ai' },
                { name: 'Al-Huda Institute', url: 'https://alhudapk.com' }
                        ]
},
{
            id: 23,
                        name: 'Quran Tajweed Certificate (Online)',
                        category: 'Quran',
                        type: 'Certificate',
                        countries: ['Global'],
                        description: 'Structured online certification in Quran recitation with correct Tajweed rules. Widely available through accredited online institutes with flexible scheduling.',
                        recognizedBy: 'Islamic learning centres, mosques and online Quran academies',
                        level: 'Beginner to Advanced',
                        cost: '$10-50 per month (institute-dependent)',
                        availability: 'Year-round, fully online',
                        difficulty: 2,
                        url: 'https://quranacademy.io',
                        prepResources: [
                { name: 'Quran Academy', url: 'https://quranacademy.io' },
                { name: 'Mishary Rashid Alafasy — Recitation', url: 'https://youtube.com/alafasy' },
                { name: 'Nouman Ali Khan — Bayyinah TV', url: 'https://bayyinah.tv' },
                { name: 'Learn Tajweed Free', url: 'https://learntajweed.com' }
                        ]
}  ,
  {
    id: 24,
    name: 'Pathways Arabic & Quran Proficiency Exam',
    category: 'Arabic',
    type: 'Proficiency Assessment',
    countries: ['Global'],
    description: 'A multi-level Arabic and Quranic literacy assessment by Pathways, mapping learners from elementary to advanced using CEFR standards (A1-C1) with Quranic surah benchmarks and tajweed evaluation.',
    recognizedBy: 'Pathways (Accreditation Pending)',
    level: 'A1-C1 (4 Levels)',
    cost: 'Free (Paid upon accreditation)',
    availability: 'Online, year-round',
    difficulty: 2,
    status: 'pending',
    levels: [
      { level: 1, arabic: 'Mubtadi', name: 'Mubtadi', audience: 'Elementary', cefr: 'A1', surahs: 'Al-Fatiha, Al-Ikhlas, Al-Kawthar, Al-Nas' },
      { level: 2, arabic: 'Asasi', name: 'Asasi', audience: 'Middle School', cefr: 'B1', surahs: 'Juz Amma short' },
      { level: 3, arabic: 'Mutawassit', name: 'Mutawassit', audience: 'High School', cefr: 'B2', surahs: 'Full Juz Amma + Al-Mulk excerpt' },
      { level: 4, arabic: 'Mutaqaddim', name: 'Mutaqaddim', audience: 'Adults', cefr: 'C1', surahs: 'Thematic study across Juz Amma' }
    ],
    prepResources: [
      { name: 'Take the Exam (Free)', url: 'https://claude.ai/public/artifacts/130ad91f-9ec4-42a3-8f5d-479aef8a5b59' },
      { name: 'Pathways Arabic Pathway', url: 'https://pathways-learn-gamma.vercel.app/pathways/arabic-language' },
      { name: 'Quran Study Resources', url: 'https://pathways-learn-gamma.vercel.app/resources' }
    ]
  }
];
