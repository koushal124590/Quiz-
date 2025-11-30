let dataSet = [];       
let currentIndex = 0;   
let userResponses = [];    
fetch('questions.json')
  .then(res => res.json())
  .then(data => {
    shuffle(data);
    dataSet = data.slice(0, 15);
    console.log("Random 15 questions loaded:", dataSet);
  });
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function startQuiz(){
  if(dataSet.length === 0){
    alert("Questions not loaded yet!");
    return;
  }
  document.getElementById("intro").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  currentIndex = 0;
  showQuestion(currentIndex);
}
function showQuestion(i){
  let q = dataSet[i];
  document.getElementById("question").innerText = q.question;
  document.getElementById("lbl1").innerText = q.options[0];
  document.getElementById("lbl2").innerText = q.options[1];
  document.getElementById("lbl3").innerText = q.options[2];
  document.getElementById("lbl4").innerText = q.options[3];
  document.querySelectorAll('input[name="option"]').forEach(opt => {
    opt.checked = (userResponses[i] === opt.value);
  });
}
function nextQuestion(){
  saveResponse();
  if(currentIndex < dataSet.length-1){
    currentIndex++;
    showQuestion(currentIndex);
  }
}
function prevQuestion(){
  saveResponse();
  if(currentIndex > 0){
    currentIndex--;
    showQuestion(currentIndex);
  }
}
function saveResponse(){
  let selected = document.querySelector('input[name="option"]:checked');
  if(selected){
    userResponses[currentIndex] = selected.value;
  }
}
function submitQuiz(){
  saveResponse();
  let score = 0;
  let answersHTML = "";
  dataSet.forEach((q, i) => {
    let chosen = userResponses[i];
    let correctIndex = q.answer;
    let correctText = q.options[correctIndex];
    let chosenIndex = chosen ? parseInt(chosen.replace("option","")) - 1 : null;

    if(chosenIndex === correctIndex) score++;
  });
  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";
  document.getElementById("score").innerText = `You scored ${score} / ${dataSet.length}`;
  document.getElementById("answers").innerHTML = answersHTML;
}