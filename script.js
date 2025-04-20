const questions = [
    {
      question: "What is the capital of India?",
      options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
      answer: "Delhi"
    },
    {
      question: "Where is the Taj Mahal located?",
      options: ["Agra", "Jaipur", "Delhi", "Varanasi"],
      answer: "Agra"
    },
    {
      question: "Who is the Prime Minister of India?",
      options: ["Modi", "Rahul", "Kejriwal", "Yogi"],
      answer: "Modi"
    },
    {
      question: "When is Republic Day celebrated?",
      options: ["15 August", "26 January", "2 October", "5 September"],
      answer: "26 January"
    },
    {
      question: "How many states are there in India?",
      options: ["28", "29", "30", "27"],
      answer: "28"
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 100;
  let timer;
  
  function startQuiz() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    loadQuestion();
    startTimer();
  }
  
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("time").textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        endQuiz(false);
      }
    }, 1000);
  }
  
  function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("question").textContent = q.question;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
  
    q.options.forEach(option => {
      const btn = document.createElement("div");
      btn.textContent = option;
      btn.className = "option";
      btn.onclick = () => selectAnswer(btn, q.answer);
      optionsContainer.appendChild(btn);
    });
  }
  
  function selectAnswer(selected, correct) {
    const options = document.querySelectorAll(".option");
    options.forEach(opt => {
      opt.classList.add("disabled");
      if (opt.textContent === correct) {
        opt.classList.add("correct");
      }
      if (opt === selected && opt.textContent !== correct) {
        opt.classList.add("wrong");
      }
    });
  
    if (selected.textContent === correct) score++;
  }
  
  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      loadQuestion();
    } else {
      clearInterval(timer);
      endQuiz(true);
    }
  }
  
  function prevQuestion() {
    if (currentQuestion > 0) {
      currentQuestion--;
      loadQuestion();
    }
  }
  
  function endQuiz(completedInTime) {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("end-screen").style.display = "block";
  
    if (completedInTime) {
      document.getElementById("end-message").textContent = "🎉 Quiz Completed!";
    } else {
      document.getElementById("end-message").textContent = "⏰ Oops! Time is up!";
    }
  
    document.getElementById("final-score").textContent = `Your Score: ${score} / ${questions.length}`;
  }
  