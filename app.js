const questions = [
    // First question
    {
        question: "Which is the largest animal in the world?",
        answers:[
            { text : "Shark", correct : false},
            { text : "Blue whale", correct : true},
            { text : "Elephant", correct : false},
            { text : "Giraffe", correct : false}
        ]
    },
    // Second Question
    {
        question: "Which is the smallest continent in the world?",
        answers:[
            { text : "Asia", correct : false},
            { text : "Australia", correct : true},
            { text : "Arctic", correct : false},
            { text : "Africa", correct : false}
        ]
    },
    // Third Question
    {
        question: "Which is the richest country in the world?",
        answers:[
            { text : "USA", correct : true},
            { text : "Russia", correct : false},
            { text : "India", correct : false},
            { text : "China", correct : false}
        ]
    },
    // Fourth Question
    {
        question: "Which is the largest desert in the world?",
        answers:[
            { text : "Kalahari", correct : false},
            { text : "Gobi", correct : false},
            { text : "Thar", correct : false},
            { text : "Sahara", correct : true}
        ]
    },
    // Fifth Question
    {
        question: "Which is the largest service provider country in the world?",
        answers:[
            { text : "China", correct : false},
            { text : "Africa", correct : false},
            { text : "South Korea", correct : false},
            { text : "India", correct : true}
        ]
    },
    // Sixth Question
    {
        question: "Which is the largest Tech company in the India?",
        answers:[
            { text : "Infosys", correct : false},
            { text : "LTI", correct : false},
            { text : "RIL", correct : true},
            { text : "TCS", correct : false}
        ]
    }    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;


// Function to count score

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}


function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNO = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNO + ". " + currentQuestion.question;

    // to display the relates answer 
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display  = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of the ${questions.length}!`;
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();






