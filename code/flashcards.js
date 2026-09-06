const gramatika= ["veta","nadvetnaSyntax"]
var isShowingQuestion = true;
var currentQuestion = 0;
var currentQuestionSet;

function generateQuestionButtons(){

    var container = document.getElementById("buttonArea");

    for(const questionSet of gramatika){
        var button =document.createElement("BUTTON");
        button.innerText = questionSet;
        button.onclick= onButtonClick;

        container.appendChild(button);
    }
}

function onButtonClick(){
    const button = event.currentTarget;
    sessionStorage.setItem("file","../data/"+button.innerText+".json")
    window.open("../pages/flashcardQuizPage.html","_self");
}

async function loadQuestionSet(file) {
    const response = await fetch(file);
    const data = await response.json();
    console.log(data);
    currentQuestionSet = data;
    document.getElementById("button").innerText = currentQuestionSet[0].question;
}
function setFirstQuestion(){
    loadQuestionSet(sessionStorage.getItem("file"));

    document.getElementById("button").onclick=onFlashcardClick;
    document.getElementById("button").style.fontWeight = "bold";

}

function onFlashcardClick(){
    if((currentQuestion+1) == (currentQuestionSet.length) && !isShowingQuestion ){
        window.open("../pages/flashcardsMenu.html","_self");
    }
    if(isShowingQuestion){
        document.getElementById("button").innerText = currentQuestionSet[currentQuestion].answer;
        isShowingQuestion = false;
        document.getElementById("button").style.fontWeight = "normal";
    } else{
        currentQuestion+=1;
        document.getElementById("button").innerText = currentQuestionSet[currentQuestion].question;
        isShowingQuestion = true;
        document.getElementById("button").style.fontWeight = "bold";
    }
    
}
