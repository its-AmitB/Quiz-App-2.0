const startBtn = document.getElementById("start-btn");
const quizScreen = document.getElementById("quiz-screen");
const startScreen = document.getElementById("start-screen");
const resultScreen = document.getElementById("result-screen");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const restartBtn = document.getElementById("restart-btn");

let currentQ = 0;
let score = 0;
let timeLeft;
let timer;

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlinks Text Madeup Language"
    ],
    answer: 0
  },
  {
    question: "What does CSS control?",
    options: ["Structure", "Database", "Styling", "Programming"],
    answer: 2
  },
  {
    question: "Which language is used for web interactivity?",
    options: ["HTML", "Python", "CSS", "JavaScript"],
    answer: 3
  }
];

startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  currentQ = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  resetState();
  const q = questions[currentQ];
  questionEl.textContent = q.question;
  q.options.forEach((opt, index) => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.addEventListener("click", () => selectAnswer(index));
    optionsEl.appendChild(li);
  });
  startTimer();
}

function resetState() {
  nextBtn.classList.add("hidden");
  optionsEl.innerHTML = "";
  clearInterval(timer);
}

function selectAnswer(index) {
  const q = questions[currentQ];
  const allOptions = optionsEl.querySelectorAll("li");

  allOptions.forEach((li, i) => {
    if (i === q.answer) li.classList.add("correct");
    if (i === index && i !== q.answer) li.classList.add("wrong");
    li.style.pointerEvents = "none";
  });

  if (index === q.answer) score++;
  nextBtn.classList.remove("hidden");
  clearInterval(timer);
}

function nextQuestion() {
  currentQ++;
  if (currentQ < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function startTimer() {
  timeLeft = 15;
  timerEl.textContent = `${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function endQuiz() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${questions.length}`;
}

function restartQuiz() {
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");

  currentQ = 0;
  score = 0;
  clearInterval(timer);
  timerEl.textContent = "";
}
