const questions = [
    {
        question: "O que devemos fazer com o lixo na praia?",
        answers: [ 
            { id: 1, text: " Jogar no mar para os peixes comerem", correct:false},
            { id: 2, text: "Enterrar na areia", correct:false},
            { id: 3, text: "Guardar e jogar no lixo certo depois", correct:true},
            { id: 4, text: "Deixar lá mesmo, o vento leva", correct:false},
        ]
    },
     {
        question: "O que é reciclar?",
        answers: [ 
            { id: 1, text: "Jogar lixo no chão", correct:false},
            { id: 2, text: "Usar o lixo de novo para fazer coisas novas", correct:true},
            { id: 3, text: "Colocar fogo no lixo", correct:false},
            { id: 4, text: "Levar o lixo para a floresta", correct:false},
        ]
    },
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0
    nextButton.innerHTML = "Proxima";
    showQuestion();
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showQuestion() {
    resetState(); 
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("Button");
        button.innerHTML = answer.text;
        button.dataset.id = answer.id;
        button.classList.add("btn");
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function selectAnswer(e) {
    answers = questions[currentQuestionIndex].answers;
    const correctAnswer = answers.filter((answer) => answer.correct == true)[0];

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.id == correctAnswer.id;
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++; 
    } else { 
        selectedBtn.classList.add("incorrect");
    } 
    Array.from(answerButtons.children).forEach((button) => {
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = ('aprender é sempre bom continue estudando!');
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}



nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();  
