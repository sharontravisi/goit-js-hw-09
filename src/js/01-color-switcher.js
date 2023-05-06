'use strict';

/**
 * Selector boton para empezar cambio de color
 */
const btnStart = document.querySelector('[data-start]');
/**
 * Selector para pausar el cambio de color
 */
const btnStop = document.querySelector('[data-stop]');
/**
 * variable timer
 */
let timerId = null;

/**
 * Funcion para crear un color aleatorio en formato hexadecimal
 * @returns un numero hexadecimal aleatorio
 */
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

/**
 * Funcion para cambiar background del elemento body cada minuto y deshabilitar el boton start
 */
const switcherColor = () => {
  timerId = setTimeout(()=>{
    document.body.style.backgroundColor = getRandomHexColor();
    switcherColor();
  },1000)
  btnStart.setAttribute('disabled', true);
  btnStop.removeAttribute('disabled');
}

/**
 * Funcion para deshacer la llamada de la funcion switcherColor y deshabilitar el boton stop
 * @returns
 */
const stopChangeColor = ()=>{
  clearTimeout(timerId);
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', true);
}

/**
 * Evento que al dar click sobre el btnStar llama la función cambiar de color del body
 */
btnStart.addEventListener('click', switcherColor);

/**
 * Evento que al dar click sobre el btnStop llama a la funcion stopChangeColor
 */
btnStop.addEventListener('click', stopChangeColor);



