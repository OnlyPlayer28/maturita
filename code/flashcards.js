const gramatika = ["veta", "nadvetnaSyntax", "zvukovaStrankaJazyka", "suvetie"]
const displayGramatika = ["veta", "nadvetná syntax", "zvuková stránka jazyka", "súvetie"]
const literatura = ["slovenskaMedzivojnovaDrama"]
const displayLiteratura = ["Slovenská medzivojnová dráma"]
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

}
function setDisplayQuestionNumber(){
    document.getElementById("displayQuestionNum").innerText=currentQuestion+1 + " z "+currentQuestionSet.length;
}
function onFlashcardClick() {
    if ((currentQuestion + 1) == (currentQuestionSet.length) && !isShowingQuestion) {
        window.open("../pages/flashcardsMenu.html", "_self");
    }
    if (isShowingQuestion) {
        console.log("j");
        setNextQuestion();
        /*document.getElementById("button").innerHTML = currentQuestionSet[currentQuestion].answer;*/
        isShowingQuestion = false;
        /*document.getElementById("button").style.fontWeight = "normal";*/
    } else {
        console.log("l");
        currentQuestion += 1;
        setNextQuestion();
        /*document.getElementById("button").innerHTML = currentQuestionSet[currentQuestion].question;*/
        isShowingQuestion = true;
        /*document.getElementById("button").style.fontWeight = "bold";*/
    }

    setDisplayQuestionNumber();
}
