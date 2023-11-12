const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const leaderboardContainer = document.getElementById('leaderboard');

// Sample Questions
let allQuestions = [
  { question: "What is 2+2?", answers: { a: "4", b: "22", c: "5" }, correctAnswer: "a" },
  { question: "What is the capital of France?", answers: { a: "London", b: "Berlin", c: "Paris" }, correctAnswer: "c" },
 
  
    { question: "Which element has the chemical symbol 'Fe'?", answers: { a: "Lead", b: "Gold", c: "Iron" }, correctAnswer: "c" },
    { question: "In which year did the Titanic sink?", answers: { a: "1912", b: "1915", c: "1905" }, correctAnswer: "a" },
    { question: "What is the largest planet in our solar system?", answers: { a: "Jupiter", b: "Saturn", c: "Neptune" }, correctAnswer: "a" },
    { question: "Who wrote 'To Kill a Mockingbird'?", answers: { a: "Mark Twain", b: "Harper Lee", c: "J.D. Salinger" }, correctAnswer: "b" },
    { question: "What is the square root of 144?", answers: { a: "12", b: "14", c: "16" }, correctAnswer: "a" },
    { question: "Who painted the Mona Lisa?", answers: { a: "Vincent Van Gogh", b: "Leonardo da Vinci", c: "Pablo Picasso" }, correctAnswer: "b" },
    { question: "What is the capital of Japan?", answers: { a: "Beijing", b: "Seoul", c: "Tokyo" }, correctAnswer: "c" },
    { question: "Which language is primarily spoken in Brazil?", answers: { a: "Spanish", b: "Portuguese", c: "French" }, correctAnswer: "b" },
    { question: "What is the smallest prime number?", answers: { a: "1", b: "2", c: "3" }, correctAnswer: "b" },
    { question: "Who discovered penicillin?", answers: { a: "Marie Curie", b: "Alexander Fleming", c: "Louis Pasteur" }, correctAnswer: "b" },

];

let currentQuestionIndex = 0;
let numCorrect = 0;
let attemptedQuestions = 0;
const totalQuestions = 3; // Total questions to be answered per attempt

// Shuffle questions and start the quiz
function buildQuiz() {
  shuffleQuestions(allQuestions);
  showNextQuestion();
}

// Display the next question
function showNextQuestion() {
  if (attemptedQuestions >= totalQuestions) {
    showResults();
    return;
  }

  const currentQuestion = allQuestions[currentQuestionIndex];
  quizContainer.innerHTML = generateQuestionHTML(currentQuestion);
}

// Generate HTML for the current question
function generateQuestionHTML(question) {
  const answersHTML = Object.keys(question.answers).map(
    letter => `<label>
                  <input type="radio" name="question" value="${letter}">
                  ${letter} : ${question.answers[letter]}
                </label>`
  ).join('');

  return `<div class="question">${question.question}</div>
          <div class="answers">${answersHTML}</div>`;
}

// Handle the answer submission
submitButton.addEventListener('click', () => {
  const selectedAnswer = document.querySelector('input[name="question"]:checked');
  if (!selectedAnswer) return;

  const userAnswer = selectedAnswer.value;
  const currentQuestion = allQuestions[currentQuestionIndex];

  if (userAnswer === currentQuestion.correctAnswer) {
    numCorrect++;
  }

  attemptedQuestions++;
  currentQuestionIndex = (currentQuestionIndex + 1) % allQuestions.length;
  showNextQuestion();
});

// Show the results and update the leaderboard
function showResults() {
  resultsContainer.innerHTML = `Score: ${numCorrect} out of ${totalQuestions}`;
  saveAndDisplayScores(numCorrect);
  submitButton.style.display = 'none'; // Hide submit button after showing results
}

// Shuffle the questions array
function shuffleQuestions(questions) {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
}

// Save and display scores in the leaderboard
function saveAndDisplayScores(currentScore) {
  const previousScores = JSON.parse(localStorage.getItem('quizScores')) || [];
  previousScores.push(currentScore);
  if (previousScores.length > 10) {
    previousScores.shift();
  }
  localStorage.setItem('quizScores', JSON.stringify(previousScores));
  displayLeaderboard(previousScores);
}

// Display the leaderboard
function displayLeaderboard(scores) {
  leaderboardContainer.innerHTML = '<h2>Leaderboard</h2>';
  scores.forEach((score, index) => {
    leaderboardContainer.innerHTML += `<p>Attempt ${index + 1}: ${score} / ${totalQuestions}</p>`;
  });
}

// Initialize the quiz
buildQuiz();
