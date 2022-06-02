// Button
let right = document.getElementById("nextbtn");
right.addEventListener("mouseover", () => {
    document.querySelector("#rightdiv").classList.add("right");
});
right.addEventListener("mouseout", () => {
    document.querySelector("#rightdiv").classList.remove("right");
});

let left = document.getElementById("prevbtn");
left.addEventListener("mouseover", () => {
    document.querySelector("#leftdiv").classList.add("left");
});
left.addEventListener("mouseout", () => {
    document.querySelector("#leftdiv").classList.remove("left");
});
let q = [];

$(document).ready(function() {
    $ajax({
        url: "/getquestions",
        method: "POST",
        success: function(data) {
            for (var key in data.quest) {
                temp = temp + {
                    no: data.quest[key].qno,
                    q: data.quest[key].question,
                    options: [
                        data.quest[key].optiona,
                        data.quest[key].optionb,
                        data.quest[key].optionc,
                        data.quest[key].optiond,

                    ],
                    answer: data.quest[key].answer,
                    color: -1
                }

            }
        }
    });

});
/*
let ques = [{

        no: 1,
        q: "Javasript is ________ language.",
        options: [
            "client-side scripting language",
            "Object-Oriented language",
            "Programming Language",
            "None of these",
        ],
        answer: 1,
        color: -1

    },
    {
        no: 2,
        q: "Correct way of creating function.",
        options: [
            "def func(){}",
            "void func(){}",
            "function func(){}",
            "Create function func",
        ],
        answer: 3,
        color: -1
    },
    {
        no: 3,
        q: "Javascript is loosely bound language.",
        options: ["True", "False"],
        answer: 1,
        color: -1
    },
    {
        no: 4,
        q: "Which of the following is not javascript data types?",
        options: ["Null type", "Undefined type", "Number type", "All of the mentioned"],
        answer: 4,
        color: -1
    },
    {
        no: 5,
        q: "Which of the following object is the main entry point to all client-side JavaScript features and APIs?",
        options: ["Position", "Window", "Standard", "Location"],
        answer: 1,
        color: -1
    },
    {
        no: 6,
        q: "Which of the following scoping type does JavaScript use?",
        options: ["Sequential", "Segmental", "Lexical", "Literal"],
        answer: 3,
        color: -1
    },
    {
        no: 7,
        q: "What is the basic difference between JavaScript and Java?",
        options: ["Functions are considered as fields", "Functions are values, and there is no hard distinction between methods and fields", "Variables are specific", "There is no difference"],
        answer: 2,
        color: -1
    },
    {
        no: 8,
        q: "Why JavaScript Engine is needed?",
        options: ["Both Compiling & Interpreting the JavaScript", "Parsing the javascript", " Interpreting the JavaScript", "Compiling the JavaScript"],
        answer: 3,
        color: -1
    },
    {
        no: 9,
        q: "Which of the following is the property that is triggered in response to JS errors?",
        options: ["onclick", "onerror", "onmessage", "onexception"],
        answer: 2,
        color: -1
    },
    {
        no: 10,
        q: "Which of the following is not an error in JavaScript?",
        options: ["Missing of Bracket", "Division by zero", "Syntax error", "Missing of semicolons"],
        answer: 2,
        color: -1
    },
];
*/


let selectedOption = document.querySelectorAll(".optionDiv ul");
let listElements = document.querySelectorAll("ul li");
let checkAnswer = [...new Array(ques.length)].fill(-1);
// console.log(checkAnswer);

let question = document.querySelector("p");
let addQuesNo = document.getElementById("quesNo");
let currentQuestion = 0;
let submitBtn = document.querySelector(".submitBtn");



// Initially 
question.innerHTML = "Question " + ques[0].no + " : " + ques[0].q;
// console.log(ques[0].options.length);
for (let j = 0; j < ques[0].options.length; j++) {
    let element = document.createElement("li");
    element.innerHTML = j + 1 + ". " + ques[0].options[j];
    document.getElementById("list").appendChild(element);
}




// Next Button
function NextQuestion(i) {
    if (i >= ques.length) {
        i = ques.length - 1;
    }
    // console.log(ques.length,"current Question NEXT");
    question.innerHTML = "Question " + ques[i].no + " : " + ques[i].q;
    for (let j = 0; j < ques[i].options.length; j++) {
        let element = document.createElement("li");
        element.innerHTML = j + 1 + ". " + ques[i].options[j];
        document.getElementById("list").appendChild(element);
    }
    submit();
    listElements = document.querySelectorAll("ul li")
    clickColorChange();
    clickedAnswer(currentQuestion);
}
right.addEventListener("click", () => {
    if (currentQuestion >= ques.length) {
        currentQuestion = ques.length - 1;
    }
    if (currentQuestion < 0) {
        currentQuestion = 0;
    }
    let size = ques[currentQuestion].options.length;
    while (size > 0) {
        document.querySelector("ul li")
            .parentElement.removeChild(document.querySelector(" ul li"));
        size--;
    }
    currentQuestion++;
    NextQuestion(currentQuestion);
});






// Prev Button 
function PrevQuestion(i) {
    if (i < 0) {
        i = 0;
    }
    // console.log(i,"current Question PREV");
    question.innerHTML = "Question " + ques[i].no + " : " + ques[i].q;
    for (let j = 0; j < ques[i].options.length; j++) {
        let element = document.createElement("li");
        element.innerHTML = j + 1 + ". " + ques[i].options[j];
        document.getElementById("list").appendChild(element);
    }
    listElements = document.querySelectorAll("ul li");
    submit();
    clickColorChange();
    clickedAnswer(currentQuestion);
}
left.addEventListener("click", () => {
    // console.log(currentQuestion);
    if (currentQuestion < 0) {
        currentQuestion = 0;
    }
    if (currentQuestion >= ques.length) {
        currentQuestion = ques.length - 1;
    }
    // console.log(currentQuestion,"Checkkk");
    let size = ques[currentQuestion].options.length;
    while (size > 0) {
        document.querySelector("ul li").parentElement.removeChild(document.querySelector(" ul li"));
        size--;
    }

    currentQuestion--;
    PrevQuestion(currentQuestion);
});



listElements = document.querySelectorAll("ul li");
// console.log(listElements);
let colored = -1;

function clickColorChange() {
    if (currentQuestion < 0) {
        currentQuestion = 0;
    } else if (currentQuestion >= ques.length) {
        currentQuestion = ques.length - 1;
    }
    // console.log(currentQuestion," correct u");
    for (let i = 0; i < listElements.length; i++) {
        listElements[i].addEventListener("click", () => {
            listElements[i].style.background = "#185a9d";

            ques[currentQuestion].color = i;


            if ((i + 1) == ques[currentQuestion].answer) {
                checkAnswer[currentQuestion] = 1;
            } else {
                checkAnswer[currentQuestion] = 0;
            }


            for (let j = 0; j < listElements.length; j++) {
                if (i != j) {
                    listElements[j].style.background = "transparent";
                } else {
                    continue;
                }
            }

        });
    }
}

function submit() {
    if (currentQuestion >= ques.length) {
        currentQuestion = ques.length - 1;
    }
    if (currentQuestion == ques.length - 1) {
        submitBtn.addEventListener("click", () => {
            let total = 0;
            for (let i = 0; i < ques.length; i++) {
                if (checkAnswer[i] == 1) {
                    total += 1;
                } else {
                    continue;
                }
            }
            document.querySelector(".container").style.display = "none";
            document.querySelector(".Result").style.display = "block";
            document.querySelector(".submitBtn").style.display = "none";
            document.getElementById("marks").innerHTML = total + " / " + ques.length;
        });
        submitBtn.style.textDecoration = "none";
        submitBtn.style.cursor = "pointer";
    } else {
        submitBtn.style.textDecoration = "line-through";
        submitBtn.style.cursor = "none";
    }
}
clickColorChange();



function clickedAnswer(current) {

    if (current < 0) {
        current = 0;
    } else if (current >= ques.length) {
        current = ques.length - 1;
    }

    let i = ques[current].color;
    if (ques[current].color != -1) {
        listElements[i].style.background = "#185a9d";
    }
}