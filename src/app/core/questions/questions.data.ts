import { Questions } from "../../interfaces/questions";

export const QuestionsLite: Questions[] = [
  {
    question:
      "Какой из этих ингредиентов НЕ используется в приготовлении классического гуакамоле?",
    answers: [
      { text: "Авокадо", right: false },
      { text: "Лук", right: false },
      { text: "Чеснок", right: true },
      { text: "Лайм", right: false },
    ],
    round: 1,
    type: "radio",
  },
  {
    question:
      "Какое из этих овощных масел обычно используется для салатов и заправок?",
    answers: [
      { text: "оливковое", right: true },
      { text: "Оливковое", right: true },
    ],
    round: 1,
    type: "input",
  },
  {
    question: "Сопоставьте каждый кулинарный ингредиент с его изображением",
    answers: [
      { text: "мука", right: false },
      { text: "сахар", right: false },
      { text: "соль", right: false },
      { text: "яйца", right: false },
    ],
    round: 2,
    type: "drag",
  },
  {
    question:
      "Какие из этих ингредиентов обычно используются для приготовления классического гуакамоле?",
    answers: [
      { text: "Авокадо", right: true },
      { text: "Картофель", right: false },
      { text: "Лук", right: true },
      { text: "Лайм", right: true },
      { text: "Помидоры", right: false },
      { text: "Чеснок", right: true },
    ],
    round: 2,
    type: "check",
  },
];

export const QuestionsMedium: Questions[] = [
  {
    question:
      "Какое основное различие между итальянской пиццей и американской пиццей?",
    answers: [
      { text: "Форма", right: false },
      { text: "Тип теста", right: true },
      { text: "Начинка", right: false },
      { text: "Соус", right: false },
    ],
    round: 1,
    type: "radio",
  },
  {
    question:
      "Какой основной ингредиент используется для приготовления классического крем-брюле?",
    answers: [
      { text: "яйца", right: true },
      { text: "Яйца", right: true },
    ],
    round: 1,
    type: "input",
  },
  {
    question:
      "Сопоставьте каждый метод приготовления с его соответствующим кулинарным применением",
    answers: [
      { text: "Варка", right: false },
      { text: "Жарка", right: false },
      { text: "Запекание", right: false },
      { text: "Тушение", right: false },
    ],
    round: 2,
    type: "drag",
  },
  {
    question:
      "Какие из этих ингредиентов обычно используются для приготовления традиционного французского луковго супа?",
    answers: [
      { text: "Лук", right: true },
      { text: "Картофель", right: false },
      { text: "Бульон", right: true },
      { text: "Помидоры", right: false },
      { text: "Вино", right: true },
      { text: "Гренки", right: true },
    ],
    round: 2,
    type: "check",
  },
];

export const QuestionsHard: Questions[] = [
  {
    question:
      "Какое основное различие между процессами ферментации и созревания при производстве вина?",
    answers: [
      {
        text: "Ферментация происходит в емкостях, а созревание - в бочках",
        right: false,
      },
      {
        text: "Ферментация - это преобразование сахаров в этанол, а созревание - медленное окисление и изменение вкусовых характеристик",
        right: true,
      },
      {
        text: " Ферментация длится несколько дней, а созревание - несколько месяцев",
        right: false,
      },
      {
        text: "Ферментация происходит при низких температурах, а созревание - при высоких",
        right: false,
      },
    ],
    round: 1,
    type: "radio",
  },
  {
    question:
      "Какой химический компонент придает горькие и пикантные ароматы хмелю, используемому при варке пива?",
    answers: [
      { text: "гумулон", right: true },
      { text: "Гумулон", right: true },
    ],
    round: 1,
    type: "input",
  },
  {
    question:
      "Сопоставьте традиционные французские сыры с их основными характеристиками",
    answers: [
      { text: "", right: false },
      { text: "", right: false },
      { text: "", right: false },
      { text: "", right: false },
    ],
    round: 2,
    type: "drag",
  },
  {
    question:
      "Какие ингредиенты используются в традиционном японском блюде под названием 'такояки'?",
    answers: [
      { text: "Рис", right: false },
      { text: "Тесто", right: false },
      { text: "Осьминог", right: false },
      { text: "Майонез", right: false },
      { text: "Бульон", right: false },
      { text: "Лук-порей", right: false },
      { text: "Имбирь", right: false },
    ],
    round: 2,
    type: "check",
  },
];
