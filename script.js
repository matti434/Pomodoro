const inputStudy = document.getElementById("inputStudy");
// primero creamos una variable para saber si es true "estudio" o false "descanso"
let isStudy=true;
let timeLeft=0; // segundos restantes
let timerInvertal = null; // referencia del setInterval  

/*
let timerInterval = null	No hay timer activo
if (!timerInterval)	Solo arrancar si no hay un timer en marcha
clearInterval(timerInterval)	Detener el timer actual
timerInterval = null	Marcar que ya no hay ningún timer activo
*/

function startTimer(){
    if(!timerInvertal){ // si no hay temporizador corriendo //!timerInterval será true si timerInterval es null, undefined o 0.
        if(timeLeft<=0){ //Si el tiempo restante es 0 o menos, quiere decir que el temporizador está "vacío".
            timeLeft= parseInt(isStudy ? inputStudy.value : inputBreak.value)*60;
        }
    }
    timerInvertal= setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if(timeLeft<=0){
            clearInterval(timerInvertal);//Se detiene el setInterval actual (clearInterval)
            timerInvertal=null;//Se pone timerInterval = null para permitir crear uno nuevo
            isStudy=!isStudy; // cambia entre estudio y descanso
            startTimer(); // Comienza el siguiente ciclo automaticamente
        }
    },1000);
}

function pauseTimer(){
    clearInterval(timerInvertal);
    timerInvertal=null
}

function resetTimer(){
    pauseTimer();
    isStudy=true;
    timeLeft = parseInt(inputStudy.value)*60;
    updateDisplay();
}