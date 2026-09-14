function loadStats(){
    document.getElementById("totalQuestionsText").innerText = "všetky otázky: "+localStorage.getItem("totalQuestions");
    document.getElementById("totalCorrectText").innerText ="správne: "+ localStorage.getItem("totalCorrect");
    document.getElementById("totalInCorrectText").innerText = "nesprávne: "+localStorage.getItem("totalInCorrect");
}