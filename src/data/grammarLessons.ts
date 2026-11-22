export type GrammarLesson = { day: number; title: string; example: string; translation: string; rule: string; question: string; answer: string; distractors: readonly [string, string] };
export const grammarLessons: readonly GrammarLesson[] = [
  {
    "day": 2,
    "title": "be動詞 am / are / is",
    "example": "I am happy.",
    "translation": "私はうれしいです。",
    "rule": "I と am、you / we / they と are、he / she / it と is を組み合わせます。",
    "question": "I ___ happy.",
    "answer": "am",
    "distractors": [
      "are",
      "is"
    ]
  },
  {
    "day": 3,
    "title": "be動詞の否定文",
    "example": "She is not busy.",
    "translation": "彼女は忙しくありません。",
    "rule": "be動詞の後ろに not を置くと否定文になります。",
    "question": "She ___ not busy.",
    "answer": "is",
    "distractors": [
      "are",
      "am"
    ]
  },
  {
    "day": 5,
    "title": "一般動詞の否定文",
    "example": "I do not eat meat.",
    "translation": "私は肉を食べません。",
    "rule": "I / you / we / they の否定文は do not + 動詞の原形です。",
    "question": "I ___ not eat meat.",
    "answer": "do",
    "distractors": [
      "does",
      "am"
    ]
  },
  {
    "day": 6,
    "title": "三人称単数の否定文",
    "example": "He does not play tennis.",
    "translation": "彼はテニスをしません。",
    "rule": "he / she / it の否定文は does not + 動詞の原形です。",
    "question": "He ___ not play tennis.",
    "answer": "does",
    "distractors": [
      "do",
      "is"
    ]
  },
  {
    "day": 7,
    "title": "be動詞の疑問文",
    "example": "Are you ready?",
    "translation": "準備はできていますか。",
    "rule": "be動詞を主語の前に出して疑問文を作ります。",
    "question": "___ you ready?",
    "answer": "Are",
    "distractors": [
      "Is",
      "Am"
    ]
  },
  {
    "day": 8,
    "title": "一般動詞の疑問文",
    "example": "Do you like music?",
    "translation": "音楽は好きですか。",
    "rule": "I / you / we / they の疑問文は Do + 主語 + 動詞の原形です。",
    "question": "___ you like music?",
    "answer": "Do",
    "distractors": [
      "Does",
      "Are"
    ]
  },
  {
    "day": 9,
    "title": "三人称単数の疑問文",
    "example": "Does she speak English?",
    "translation": "彼女は英語を話しますか。",
    "rule": "he / she / it の疑問文は Does + 主語 + 動詞の原形です。",
    "question": "___ she speak English?",
    "answer": "Does",
    "distractors": [
      "Do",
      "Is"
    ]
  },
  {
    "day": 10,
    "title": "疑問詞 what / who",
    "example": "What is this?",
    "translation": "これは何ですか。",
    "rule": "what は「何」、who は「だれ」を尋ねます。",
    "question": "___ is this?（これは何ですか）",
    "answer": "What",
    "distractors": [
      "Who",
      "Where"
    ]
  },
  {
    "day": 11,
    "title": "疑問詞 where / when",
    "example": "Where do you live?",
    "translation": "あなたはどこに住んでいますか。",
    "rule": "where は場所、when は時を尋ねます。",
    "question": "___ do you live?（どこに住んでいますか）",
    "answer": "Where",
    "distractors": [
      "When",
      "Why"
    ]
  },
  {
    "day": 12,
    "title": "疑問詞 why / how",
    "example": "Why are you tired?",
    "translation": "なぜ疲れているのですか。",
    "rule": "why は理由、how は方法や状態を尋ねます。",
    "question": "___ are you tired?（なぜ疲れていますか）",
    "answer": "Why",
    "distractors": [
      "How",
      "What"
    ]
  },
  {
    "day": 13,
    "title": "名詞の複数形",
    "example": "I have two books.",
    "translation": "私は本を2冊持っています。",
    "rule": "数えられる名詞は複数なら通常 -s、場合によって -es を付けます。",
    "question": "I have two ___.",
    "answer": "books",
    "distractors": [
      "book",
      "bookes"
    ]
  },
  {
    "day": 14,
    "title": "a / an / the",
    "example": "I have an apple.",
    "translation": "私はリンゴを1つ持っています。",
    "rule": "単数の数えられる名詞には a / an を使い、母音の音で始まる語には an を使います。",
    "question": "I have ___ apple.",
    "answer": "an",
    "distractors": [
      "a",
      "thee"
    ]
  },
  {
    "day": 15,
    "title": "this / that / these / those",
    "example": "These are my shoes.",
    "translation": "これらは私の靴です。",
    "rule": "these は近くの複数、those は遠くの複数を指します。",
    "question": "___ are my shoes.（これらは）",
    "answer": "These",
    "distractors": [
      "This",
      "That"
    ]
  },
  {
    "day": 16,
    "title": "所有格 my / your / his / her",
    "example": "This is her bag.",
    "translation": "これは彼女のかばんです。",
    "rule": "my は私の、your はあなたの、his は彼の、her は彼女の、を表します。",
    "question": "This is ___ bag.（彼女の）",
    "answer": "her",
    "distractors": [
      "his",
      "my"
    ]
  },
  {
    "day": 17,
    "title": "代名詞 me / him / her / us",
    "example": "Please help me.",
    "translation": "私を手伝ってください。",
    "rule": "動詞の目的語には I ではなく me などの目的格を使います。",
    "question": "Please help ___.（私を）",
    "answer": "me",
    "distractors": [
      "I",
      "my"
    ]
  },
  {
    "day": 18,
    "title": "can できる",
    "example": "I can swim.",
    "translation": "私は泳げます。",
    "rule": "can の後ろには動詞の原形を置きます。",
    "question": "I can ___.",
    "answer": "swim",
    "distractors": [
      "swims",
      "swimming"
    ]
  },
  {
    "day": 19,
    "title": "can の否定と疑問",
    "example": "Can you drive?",
    "translation": "運転できますか。",
    "rule": "疑問文は Can + 主語 + 動詞の原形。否定文は cannot / can't です。",
    "question": "___ you drive?",
    "answer": "Can",
    "distractors": [
      "Do can",
      "Are"
    ]
  },
  {
    "day": 20,
    "title": "現在進行形 be + ing",
    "example": "She is reading.",
    "translation": "彼女は読書中です。",
    "rule": "今している動作は be動詞 + 動詞の -ing 形で表します。",
    "question": "She is ___.",
    "answer": "reading",
    "distractors": [
      "read",
      "reads"
    ]
  },
  {
    "day": 21,
    "title": "過去形 be動詞 was / were",
    "example": "I was tired yesterday.",
    "translation": "私は昨日疲れていました。",
    "rule": "am / is の過去形は was、are の過去形は were です。",
    "question": "I ___ tired yesterday.",
    "answer": "was",
    "distractors": [
      "were",
      "am"
    ]
  },
  {
    "day": 22,
    "title": "一般動詞の過去形",
    "example": "I played soccer yesterday.",
    "translation": "私は昨日サッカーをしました。",
    "rule": "規則動詞の過去形は通常 -ed を付けます。",
    "question": "I ___ soccer yesterday.",
    "answer": "played",
    "distractors": [
      "play",
      "plays"
    ]
  },
  {
    "day": 23,
    "title": "不規則動詞の過去形",
    "example": "I went to school.",
    "translation": "私は学校へ行きました。",
    "rule": "go の過去形は went。動詞によっては -ed を付けず形が変わります。",
    "question": "I ___ to school yesterday.",
    "answer": "went",
    "distractors": [
      "goed",
      "go"
    ]
  },
  {
    "day": 24,
    "title": "過去形の否定文",
    "example": "I did not watch TV.",
    "translation": "私はテレビを見ませんでした。",
    "rule": "過去の否定文は did not + 動詞の原形です。",
    "question": "I ___ not watch TV.",
    "answer": "did",
    "distractors": [
      "do",
      "was"
    ]
  },
  {
    "day": 25,
    "title": "過去形の疑問文",
    "example": "Did you call her?",
    "translation": "彼女に電話しましたか。",
    "rule": "過去の疑問文は Did + 主語 + 動詞の原形です。",
    "question": "___ you call her?",
    "answer": "Did",
    "distractors": [
      "Do",
      "Were"
    ]
  },
  {
    "day": 26,
    "title": "未来表現 will",
    "example": "I will call you tomorrow.",
    "translation": "明日あなたに電話します。",
    "rule": "will の後ろには動詞の原形を置きます。",
    "question": "I will ___ you tomorrow.",
    "answer": "call",
    "distractors": [
      "called",
      "calls"
    ]
  },
  {
    "day": 27,
    "title": "未来表現 be going to",
    "example": "She is going to cook.",
    "translation": "彼女は料理をする予定です。",
    "rule": "予定は be going to + 動詞の原形で表せます。",
    "question": "She is going to ___.",
    "answer": "cook",
    "distractors": [
      "cooks",
      "cooking"
    ]
  },
  {
    "day": 28,
    "title": "比較級 -er / more",
    "example": "This bag is smaller.",
    "translation": "このかばんはより小さいです。",
    "rule": "短い形容詞の比較級には通常 -er を付けます。",
    "question": "This bag is ___.（より小さい）",
    "answer": "smaller",
    "distractors": [
      "small",
      "smallest"
    ]
  },
  {
    "day": 29,
    "title": "最上級 -est / most",
    "example": "This is the tallest tree.",
    "translation": "これは最も高い木です。",
    "rule": "短い形容詞の最上級には通常 -est を付け、the と組み合わせます。",
    "question": "This is the ___ tree.",
    "answer": "tallest",
    "distractors": [
      "taller",
      "tall"
    ]
  },
  {
    "day": 30,
    "title": "30日間の総復習",
    "example": "She is going to study.",
    "translation": "彼女は勉強する予定です。",
    "rule": "主語と動詞、時制、疑問文、未来表現を振り返ります。",
    "question": "She ___ going to study.",
    "answer": "is",
    "distractors": [
      "are",
      "am"
    ]
  }
];
export function getGrammarLesson(day: number): GrammarLesson | undefined { return grammarLessons.find((lesson) => lesson.day === day); }
