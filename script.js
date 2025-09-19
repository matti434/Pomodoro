const inputStudy = document.getElementById("inputStudy");
const inputBreak = document.getElementById("inputBreak");
const stateDisplay = document.getElementById("stateDisplay");
const timerDisplay = document.getElementById("timerDisplay");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
// primero creamos una variable para saber si es true "estudio" o false "descanso"
let isStudy = true;
let timeLeft = 0; // segundos restantes
let timerInterval = null; // referencia del setInterval

/*
let timerInterval = null	No hay timer activo
if (!timerInterval)	Solo arrancar si no hay un timer en marcha
clearInterval(timerInterval)	Detener el timer actual
timerInterval = null	Marcar que ya no hay ningún timer activo
*/

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0"); // redondea para abajo, saca el resto lo vuelve una cadena y le agrega cerros al comienzo si tiene menos de 2 caracteres
  timerDisplay.textContent = `${minutes}:${seconds}`;
  stateDisplay.textContent = isStudy ? "Study Time" : "Break time";
}

function startTimer() {
  if (!timerInterval) {
    // si no hay temporizador corriendo //!timerInterval será true si timerInterval es null, undefined o 0.
    if (timeLeft <= 0) {
      //Si el tiempo restante es 0 o menos, quiere decir que el temporizador está "vacío".
      timeLeft = parseInt(isStudy ? inputStudy.value : inputBreak.value) * 60;
    }

    
    timerInterval = setInterval(() => {
      timeLeft--;
      updateDisplay();

      if (timeLeft <= 0) {
        clearInterval(timerInterval); //Se detiene el setInterval actual (clearInterval)
        timerInterval = null; //Se pone timerInterval = null para permitir crear uno nuevo
        isStudy = !isStudy; // cambia entre estudio y descanso
        startTimer(); // Comienza el siguiente ciclo automaticamente
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  pauseTimer();
  isStudy = true;
  timeLeft = parseInt(inputStudy.value) * 60;
  updateDisplay();
}

inputStudy.addEventListener("input",() =>{
    if(isStudy && !timerInterval){
        timeLeft = parseInt(inputStudy.value)*60 || 0;
        updateDisplay();
    }
});

inputBreak.addEventListener("input", () => {
  if (!isStudy && !timerInterval) {
    timeLeft = parseInt(inputBreak.value) * 60 || 0;
    updateDisplay();
  }
});

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

//inicializa el display
timeLeft = parseInt(inputStudy.value) * 60;
updateDisplay();
