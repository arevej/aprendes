const chooseOptionExerciseQuestions = [
  {
    verb: 'hablar',
    translation: 'to speak',
    options: ['1st', '2nd', '3rd'],
    answer: '1st',
    type: 'options',
    format: 'choose_option',
  },
  {
    verb: 'comer',
    translation: 'to eat',
    options: ['1st', '2nd', '3rd'],
    answer: '2nd',
    type: 'options',
    format: 'choose_option',
  },
  {
    verb: 'creer',
    translation: 'to believe',
    options: ['1st', '2nd', '3rd'],
    answer: '2nd',
    type: 'options',
    format: 'choose_option',
  },
  {
    verb: 'ayudar',
    translation: 'to help',
    options: ['1st', '2nd', '3rd'],
    answer: '1st',
    type: 'options',
    format: 'choose_option',
  },
  {
    verb: 'vivir',
    translation: 'to live',
    options: ['1st', '2nd', '3rd'],
    answer: '3rd',
    type: 'options',
    format: 'choose_option',
  },
  {
    verb: 'entrar',
    translation: 'to enter',
    options: ['1st', '2nd', '3rd'],
    answer: '1st',
    type: 'options',
    format: 'choose_option',
  },
];

const openBracketsExerciseQuestions = [
  {
    sentence: '(vivir) ... en España',
    subject: 'Yo',
    correctSentence: 'Yo vivo en España',
    correctSentenceTranslation: 'I live in Spain',
    translation: 'I (to live) ... in Spain',
    options: ['vive', 'viven', 'vivo'],
    answer: 'vivo',
    type: 'input',
    format: 'open_brackets',
  },
  {
    sentence: '(hablar) ... ruso',
    subject: 'Nosotros ',
    correctSentence: 'Nosotros hablamos ruso',
    correctSentenceTranslation: 'We speak Russian',
    translation: 'We (to speak) ... Russian',
    options: ['hablen', 'hablamos', 'hables'],
    answer: 'hablamos',
    type: 'input',
    format: 'open_brackets',
  },
];

const fillInInputExerciseQuestions = [
  {
    sentence: 'Yo no vivo ... Madrid',
    correctSentence: 'Yo no vivo en Madrid',
    correctSentenceTranslation: "I don't live in Madrid",
    answer: 'en',
    type: 'input',
    format: 'fill_in_input',
  },
  {
    sentence: 'Ella va ... la escuela',
    correctSentence: 'Ella va a la escuela',
    correctSentenceTranslation: 'She goes to school',
    answer: 'a',
    type: 'input',
    format: 'fill_in_input',
  },
];

const understandSpeechExerciseQuestions = [
  {
    sentence: 'Yo no como manzanas',
    sentenceTranslation: "I don't eat apples",
    answer: 'yo no como manzanas',
    type: 'input',
    format: 'understand_speech',
  },
  {
    verb: 'hablar',
    translation: 'to speak',
    options: ['1st', '2nd', '3rd'],
    answer: '1st',
    type: 'options',
    format: 'choose_option',
  },
  {
    sentence: 'Ella descansa en casa',
    sentenceTranslation: 'She rests at home',
    answer: 'ella descansa en casa',
    type: 'input',
    format: 'understand_speech',
  },
  {
    sentence: 'Nosotros leemos un libro',
    sentenceTranslation: 'We read a book',
    answer: 'nosotros leemos un libro',
    type: 'input',
    format: 'understand_speech',
  },
  {
    sentence: 'Ellos no beben vino',
    sentenceTranslation: "They don't drink vine",
    answer: 'ellos no beben vino',
    type: 'input',
    format: 'understand_speech',
  },
];

const fillInInputsExerciseQuestions = [
  {
    sentence:
      'Yo no vivo __ Madrid. __ la mañana yo tengo __ ir en tren 40 minutos.',
    correctSentenceTranslation:
      "I don't live in Madrid. In the morning I need to go by train 40 minutes.",
    answer: ['en', 'por', 'que'],
    type: 'inputs',
  },
  {
    sentence: 'Yo no ... Madrid',
    correctSentence: 'Yo no vivo en Madrid',
    correctSentenceTranslation: "I don't live in Madrid",
    translation: "I don't live ... in Madrid ",
    answer: 'en',
    type: 'input',
    format: 'fill_in_input',
  },
];

export const topics = [
  {
    name: 'Choose an option',
    slug: 'choose_opt',
    questions: chooseOptionExerciseQuestions,
    task: 'Choose correct group (conjugation)',
  },
  {
    name: 'Open Brackets',
    slug: 'open_brackets',
    questions: openBracketsExerciseQuestions,
    task: 'Choose correct verb form:',
  },
  {
    name: 'Fill in input',
    slug: 'fill_in_input',
    questions: fillInInputExerciseQuestions,
    task: 'Fill in blank with a missing preposion',
  },
  {
    name: 'Understand a speech',
    slug: 'understand_speech',
    questions: understandSpeechExerciseQuestions,
    task: 'Fill in input with speech text',
  },
  {
    name: 'Fill in blanks',
    slug: 'fill_in_blanks',
    questions: fillInInputsExerciseQuestions,
    task: 'Fill in blank with speech text:',
  },
];
