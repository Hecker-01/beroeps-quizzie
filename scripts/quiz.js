document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const quizName = urlParams.get("quiz");

  if (!quizName) {
    alert("No quiz specified in the URL!");
    window.location.href = "../";
    return;
  }

  const questionContainer = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  let currentQuestionIndex = 0;
  let score = 0;
  let questions = [];

  // Load questions from the JSON file
  fetch("../scripts/questions.json")
    .then((response) => response.json())
    .then((data) => {
      if (!data[quizName]) {
        alert(`Quiz "${quizName}" not found!`);
        return;
      }
      questions = Object.entries(data[quizName]);
      showQuestion();
    })
    .catch((error) => console.error("Error loading quiz data:", error));

  function showQuestion() {
    resetState();
    if (currentQuestionIndex >= questions.length) {
      finishQuiz();
      return;
    }

    const [questionText, questionData] = questions[currentQuestionIndex];
    questionContainer.textContent = questionText;

    Object.entries(questionData.answers).forEach(([key, answer]) => {
      const button = document.createElement("button");
      button.textContent = `${key}: ${answer}`;
      button.classList.add("btn");
      button.addEventListener("click", () =>
        selectAnswer(key, questionData.correct)
      );
      answerButtons.appendChild(button);
    });
  }

  function resetState() {
    answerButtons.innerHTML = "";
  }

  function selectAnswer(selected, correct) {
    if (selected === correct) {
      score++;
    }
    currentQuestionIndex++;
    showQuestion();
  }

  function finishQuiz() {
    localStorage.setItem(
      "quizResults",
      JSON.stringify({ quizName, score, total: questions.length })
    );
    window.location.href = "./results.html";
  }
});
