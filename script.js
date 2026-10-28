
const cards = [
  {
    question: "What is HTML?",
    answer: "HTML structures the content of web pages."
  },
  {
    question: "What is CSS?",
    answer: "CSS styles web pages with colors, layouts and fonts."
  },
  {
    question: "What is JavaScript?",
    answer: "JavaScript adds interactivity and dynamic behavior to websites."
  },
  {
    question: "What does DOM stand for?",
    answer: "Document Object Model. It represents a web page as objects."
  },
  {
    question: "What is an array in JavaScript?",
    answer: "An array stores multiple values in a single variable."
  },
  {
    question: "What is a JavaScript object?",
    answer: "An object stores data as key-value pairs."
  },
  {
    question: "What is a CSS transform?",
    answer: "It rotates, scales, moves or skews an element."
  },
  {
    question: "What does addEventListener() do?",
    answer: "It runs a function when a specified event occurs."
  },
  {
    question: "What is responsive web design?",
    answer: "A design that adapts to different screen sizes and devices."
  },
  {
    question: "What is GitHub Pages?",
    answer: "A service that hosts websites directly from a GitHub repository."
  }
];

const flashcard = document.getElementById("flashcard");
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const cardNumber = document.getElementById("cardNumber");
const progressPercent = document.getElementById("progressPercent");
const progressBar = document.getElementById("progressBar");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const statusMessage = document.getElementById("statusMessage");

let currentIndex = 0;

function renderCard() {
  const card = cards[currentIndex];
  const total = cards.length;
  const progress = Math.round(((currentIndex + 1) / total) * 100);

  questionElement.textContent = card.question;
  answerElement.textContent = card.answer;

  cardNumber.textContent = `Card ${currentIndex + 1} of ${total}`;
  progressPercent.textContent = `${progress}% through deck`;
  progressBar.style.width = `${progress}%`;

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === total - 1;

  flashcard.classList.remove("flipped");
  flashcard.setAttribute("aria-pressed", "false");
  statusMessage.textContent = "";
}

function flipCard() {
  const isFlipped = flashcard.classList.toggle("flipped");
  flashcard.setAttribute("aria-pressed", String(isFlipped));
  statusMessage.textContent = isFlipped
    ? "Answer revealed!"
    : "Question revealed.";
}

function showPrevious() {
  if (currentIndex > 0) {
    currentIndex--;
    renderCard();
  }
}

function showNext() {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    renderCard();
  }
}

function shuffleCards() {
  // Fisher-Yates shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  currentIndex = 0;
  renderCard();
  statusMessage.textContent = "Deck shuffled! Start learning.";
}

flashcard.addEventListener("click", flipCard);
prevBtn.addEventListener("click", showPrevious);
nextBtn.addEventListener("click", showNext);
shuffleBtn.addEventListener("click", shuffleCards);

document.addEventListener("keydown", (event) => {
  // Don't navigate while interacting with buttons using the keyboard.
  if (event.target.closest("button")) return;

  if (event.key === "ArrowLeft") {
    showPrevious();
  } else if (event.key === "ArrowRight") {
    showNext();
  } else if (event.key === "Enter" || event.key === " ") {
    // Flip only when focus is not on a button.
    flipCard();
  }
});

renderCard();
