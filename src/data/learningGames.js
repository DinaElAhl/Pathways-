export const learningGames = [
  {
    "id": "letters",
    "title": "Arabic Letter Match",
    "arabic": "تعرّف على الحروف",
    "description": "Match five Arabic letters to their names.",
    "questions": [
      {
        "prompt": "Name this letter.",
        "display": "ب",
        "options": [
          "Bāʾ",
          "Tāʾ",
          "Nūn"
        ],
        "answer": 0,
        "explanation": "Bāʾ (ب) has one dot below. Its sound is b."
      },
      {
        "prompt": "Name this letter.",
        "display": "ت",
        "options": [
          "Bāʾ",
          "Tāʾ",
          "Yāʾ"
        ],
        "answer": 1,
        "explanation": "Tāʾ (ت) has two dots above. Its sound is t."
      },
      {
        "prompt": "Name this letter.",
        "display": "ن",
        "options": [
          "Mīm",
          "Bāʾ",
          "Nūn"
        ],
        "answer": 2,
        "explanation": "Nūn (ن) has one dot above. Its sound is n."
      },
      {
        "prompt": "Name this letter.",
        "display": "م",
        "options": [
          "Mīm",
          "Lām",
          "Alif"
        ],
        "answer": 0,
        "explanation": "Mīm (م) represents the m sound."
      },
      {
        "prompt": "Name this letter.",
        "display": "ل",
        "options": [
          "Alif",
          "Lām",
          "Nūn"
        ],
        "answer": 1,
        "explanation": "Lām (ل) represents the l sound."
      }
    ]
  },
  {
    "id": "words",
    "title": "Build an Arabic Word",
    "arabic": "رتّب حروف الكلمة",
    "description": "Build three everyday words using letter tiles with short vowels.",
    "questions": [
      {
        "prompt": "Build bāb — door. Choose letters in Arabic reading order (right to left).",
        "display": "باب",
        "letters": [
          "ا",
          "بَ",
          "ب"
        ],
        "sequence": [
          "بَ",
          "ا",
          "ب"
        ],
        "explanation": "بَ + ا + ب → بَاب (bāb): door. Fatḥah on ب gives ba; ا lengthens the vowel to ā."
      },
      {
        "prompt": "Build kitāb — book. Choose letters in Arabic reading order (right to left).",
        "display": "كتاب",
        "letters": [
          "ب",
          "ا",
          "كِ",
          "تَ"
        ],
        "sequence": [
          "كِ",
          "تَ",
          "ا",
          "ب"
        ],
        "explanation": "كِ + تَ + ا + ب → كِتَاب (kitāb): book. Kasrah gives ki; fatḥah with ا gives tā."
      },
      {
        "prompt": "Build qalam — pen. Choose letters in Arabic reading order (right to left).",
        "display": "قلم",
        "letters": [
          "م",
          "قَ",
          "لَ"
        ],
        "sequence": [
          "قَ",
          "لَ",
          "م"
        ],
        "explanation": "قَ + لَ + م → قَلَم (qalam): pen. Fatḥah gives qa and la."
      }
    ]
  },
  {
    "id": "listening",
    "title": "Listen & Match",
    "arabic": "استمع واختر الكلمة",
    "description": "Listen to five everyday Arabic words and choose the matching written word.",
    "questions": [
      {
        "prompt": "Tap Hear Arabic pronunciation, then choose the word you heard. You can reveal the transcript if needed.",
        "display": "",
        "audio": "بَاب",
        "options": [
          "كتاب",
          "باب",
          "قلم"
        ],
        "answer": 1,
        "explanation": "باب means door."
      },
      {
        "prompt": "Tap Hear Arabic pronunciation, then choose the word you heard. You can reveal the transcript if needed.",
        "display": "",
        "audio": "كِتَاب",
        "options": [
          "كتاب",
          "بيت",
          "ماء"
        ],
        "answer": 0,
        "explanation": "كتاب means book."
      },
      {
        "prompt": "Tap Hear Arabic pronunciation, then choose the word you heard. You can reveal the transcript if needed.",
        "display": "",
        "audio": "قَلَم",
        "options": [
          "باب",
          "قلم",
          "بيت"
        ],
        "answer": 1,
        "explanation": "قلم means pen."
      },
      {
        "prompt": "Tap Hear Arabic pronunciation, then choose the word you heard. You can reveal the transcript if needed.",
        "display": "",
        "audio": "بَيْت",
        "options": [
          "ماء",
          "كتاب",
          "بيت"
        ],
        "answer": 2,
        "explanation": "بيت means house."
      },
      {
        "prompt": "Tap Hear Arabic pronunciation, then choose the word you heard. You can reveal the transcript if needed.",
        "display": "",
        "audio": "مَاء",
        "options": [
          "ماء",
          "بيت",
          "قلم"
        ],
        "answer": 0,
        "explanation": "ماء means water."
      }
    ]
  },
  {
    "id": "vowels",
    "title": "Short Vowel Explorer",
    "arabic": "الحركات القصيرة",
    "description": "Practise fatḥah, kasrah and ḍammah through written examples and optional audio.",
    "questions": [
      {
        "prompt": "Which syllable matches this letter and vowel?",
        "display": "بَ",
        "spoken": "بَاء بِالْفَتْحَة",
        "options": [
          "ba",
          "bi",
          "bu"
        ],
        "answer": 0,
        "explanation": "Fatḥah (َ) gives a short a: بَ = ba."
      },
      {
        "prompt": "Which syllable matches this letter and vowel?",
        "display": "بِ",
        "spoken": "بَاء بِالْكَسْرَة",
        "options": [
          "bu",
          "ba",
          "bi"
        ],
        "answer": 2,
        "explanation": "Kasrah (ِ) gives a short i: بِ = bi."
      },
      {
        "prompt": "Which syllable matches this letter and vowel?",
        "display": "بُ",
        "spoken": "بَاء بِالضَّمَّة",
        "options": [
          "bi",
          "bu",
          "ba"
        ],
        "answer": 1,
        "explanation": "Ḍammah (ُ) gives a short u: بُ = bu."
      },
      {
        "prompt": "Which syllable matches this letter and vowel?",
        "display": "تَ",
        "spoken": "تَاء بِالْفَتْحَة",
        "options": [
          "ta",
          "ti",
          "tu"
        ],
        "answer": 0,
        "explanation": "Fatḥah (َ): تَ = ta."
      },
      {
        "prompt": "Which syllable matches this letter and vowel?",
        "display": "مِ",
        "spoken": "مِيم بِالْكَسْرَة",
        "options": [
          "ma",
          "mu",
          "mi"
        ],
        "answer": 2,
        "explanation": "Kasrah (ِ): مِ = mi."
      }
    ]
  },
  {
    "id": "meanings",
    "title": "Everyday Arabic Meanings",
    "arabic": "معاني العبارات اليومية",
    "description": "Listen, read and understand five useful everyday Arabic phrases.",
    "questions": [
      {
        "prompt": "Read or listen, then choose the meaning.",
        "display": "هَذَا كِتَاب",
        "spoken": "هَذَا كِتَاب",
        "options": [
          "This is a book.",
          "This is a pen.",
          "This is a house."
        ],
        "answer": 0,
        "explanation": "هذا كتاب — This is a book."
      },
      {
        "prompt": "Read or listen, then choose the meaning.",
        "display": "هَذَا قَلَم",
        "spoken": "هَذَا قَلَم",
        "options": [
          "This is water.",
          "This is a pen.",
          "This is a door."
        ],
        "answer": 1,
        "explanation": "هذا قلم — This is a pen."
      },
      {
        "prompt": "Read or listen, then choose the meaning.",
        "display": "أَيْنَ الْبَيْت؟",
        "spoken": "أَيْنَ الْبَيْت",
        "options": [
          "Where is the book?",
          "Where is the pen?",
          "Where is the house?"
        ],
        "answer": 2,
        "explanation": "أين البيت؟ — Where is the house?"
      },
      {
        "prompt": "Read or listen, then choose the meaning.",
        "display": "شُكْرًا",
        "spoken": "شُكْرًا",
        "options": [
          "Thank you.",
          "Good morning.",
          "Please."
        ],
        "answer": 0,
        "explanation": "شكرًا — Thank you."
      },
      {
        "prompt": "Read or listen, then choose the meaning.",
        "display": "صَبَاحُ الْخَيْر",
        "spoken": "صَبَاحُ الْخَيْر",
        "options": [
          "Good evening.",
          "Good morning.",
          "Goodbye."
        ],
        "answer": 1,
        "explanation": "صباح الخير — Good morning."
      }
    ]
  }
]
