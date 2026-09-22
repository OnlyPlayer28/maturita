const gramatika = ["veta", "nadvetnaSyntax", "zvukovaStrankaJazyka", "suvetie","versoveSystemy"]
const displayGramatika = ["Veta", "Nadvetná syntax", "Zvuková stránka jazyka", "Súvetie","Veršové systémy"]
const literatura = ["slovenskaMedzivojnovaDrama","starovekaLiteratura"]
const displayLiteratura = ["Slovenská medzivojnová dráma","Staroveká literatúra"]
var isShowingQuestion = true;
var currentQuestion = 0;
var currentQuestionSet;
var currentQuestionSetOrder = [];

function generateQuestionButtons() {

    var container = document.getElementById("buttonArea");

    for (const question of gramatika) {
        createButton(container,displayGramatika[gramatika.indexOf(question)]);
    }
    for (const question of literatura) {
        createButton(container,displayLiteratura[literatura.indexOf(question)]);
    }
}
function createButton(container,displayName) {
    var button = document.createElement("BUTTON");
    button.innerText = displayName;
    button.onclick = onButtonClick;

    container.appendChild(button);
}
function getButtonNameNoPunctuation(buttonName){
    if(displayGramatika.includes(buttonName)){
        return gramatika[displayGramatika.indexOf(buttonName)];
    }else{
        return literatura[displayLiteratura.indexOf(buttonName)];
    }
}

function onButtonClick() {
    const button = event.currentTarget;
    sessionStorage.setItem("file", "../data/" + getButtonNameNoPunctuation(button.innerText) + ".json")
    window.open("../pages/flashcardQuizPage.html", "_self");
}
function onReactionButtonClick(id){
    if(id == "yes"){
        localStorage.setItem("totalCorrect",Number(localStorage.getItem("totalCorrect")) + 1)
    }else{
        localStorage.setItem("totalInCorrect",Number(localStorage.getItem("totalInCorrect")) + 1)
    }
    onFlashcardClick(true);
}

async function loadQuestionSet(file) {
    currentQuestionSet = [];
    const response = await fetch(file);
    const data = await response.json();
    console.log(data);
    currentQuestionSet = data;
    generateQuestionOrder();
    document.getElementById("button").innerHTML = currentQuestionSet[currentQuestionSetOrder[currentQuestion]].question;
    document.getElementById("button").style.fontWeight = "bold";
    setDisplayQuestionNumber();
}
function generateQuestionOrder(){
    var indeces = [];
    for (let _index = 0; _index < currentQuestionSet.length; _index++) {
        indeces.push(_index);
    }
    for (let index = 0; index < currentQuestionSet.length; index++) {
        const element = indeces[Math.floor(Math.random() * (indeces.length))];

        currentQuestionSetOrder[index] = element;
        indeces.splice(indeces.indexOf(element),1);
    }
}
function setNextQuestion(){

    if (isShowingQuestion) {
        document.getElementById("button").innerHTML = currentQuestionSet[currentQuestionSetOrder[currentQuestion]].answer;
        document.getElementById("button").style.fontWeight = "normal";
    } else {
        document.getElementById("button").innerHTML = currentQuestionSet[currentQuestionSetOrder[currentQuestion]].question;
        document.getElementById("button").style.fontWeight = "bold";
    }
}
function setFirstQuestion() {
    loadQuestionSet(sessionStorage.getItem("file"));

    document.getElementById("button").onclick = onFlashcardClick;
    document.getElementById("button").style.fontWeight = "bold";

    document.getElementById("yes").style.opacity = 0;
    document.getElementById("no").style.opacity = 0;

}
function setDisplayQuestionNumber(){
    document.getElementById("displayQuestionNum").innerText=currentQuestion+1 + " z "+currentQuestionSet.length;
}
function onFlashcardClick(iniciatedByButton = false) {
    if ((currentQuestion + 1) == (currentQuestionSet.length) && !isShowingQuestion) {
        window.open("../pages/flashcardsMenu.html", "_self");
    }
    if (isShowingQuestion) {
        setNextQuestion();
        isShowingQuestion = false;
        document.getElementById("yes").style.opacity = 1;
        document.getElementById("no").style.opacity = 1;
    } else {
        localStorage.setItem("totalQuestions",Number(localStorage.getItem("totalQuestions")) + 1);
        currentQuestion += 1;
        setNextQuestion();
        isShowingQuestion = true;
        document.getElementById("yes").style.opacity = 0;
        document.getElementById("no").style.opacity = 0;
        if(!iniciatedByButton){
            localStorage.setItem("totalCorrect",Number(localStorage.getItem("totalCorrect")) + 1)
        }
    }

    setDisplayQuestionNumber();
}
