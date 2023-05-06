'use strict';

// Descrito en la documentación
import flatpickr from 'flatpickr';
// Importación adicional de estilos
import 'flatpickr/dist/flatpickr.min.css';
//Para mostrar notificaciones al usuario en lugar de window.alert() use la biblioteca notiflix.
import { Notify } from 'notiflix/build/notiflix-notify-aio';

/**
 * Selector del campo donde va la fecha y la hora
 */
const dateTimePicker = document.querySelector('#datetime-picker');
/**
 * Selector boton de inicio del conteo regresivo
 */
const btnStartCountdown = document.querySelector('[data-start]');
/**
 * Selector para el dato de los dias
 */
const daysTimer = document.querySelector('[data-days]');
/**
 * Selector para el dato de las horas
 */
const hoursTimer = document.querySelector('[data-hours]');
/**
 * Selector para el dato de los minutos
 */
const minutesTimer = document.querySelector('[data-minutes]');
/**
 * Selector para el dato de los segundos
 */
const secondsTimer = document.querySelector('[data-seconds]');

/**
 * Variable que almacena la fecha seleccionada por el usuario
 */
let getDateTime = new Date();
/**
 * Variable que almacena el valor de la diferencia entre la fecha seleccionada y la fecha actual
 */
let differenceBetweenDates = 0;

/**
 * Objeto que se puede pasar como parámetro opcional, en el segundo argumento de la función flatpickr(selector, options)
 */
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    getDateTime = selectedDates[0].getTime(); //Este parametro venia con la función console.log(selectedDates[0]);
    if (getDateTime < new Date().getTime()) {
      Notify.failure('Please choose a date in the future');
    } else {
      btnStartCountdown.removeAttribute('disabled');
    }
  },
};

/**
 * Uso de la biblioteca flatpickr para permitir al usuario seleccionar la fecha y la hora en un solo elemento de interfaz.
 * Para poder introducir el código CSS de la biblioteca en el proyecto, es necesario añadir otro importe además del
 * descrito en la documentación.
 */
flatpickr(dateTimePicker, options);

/**
 * Funcion para desactivar el boton de inicio del conteo regresivo
 * @returns
 */
const disableButton = () => {
  btnStartCountdown.setAttribute('disabled', true);
};
disableButton();

/**
 * Para calcular los valores, use la función preparada convertMs, donde ms es la diferencia entre
 * la fecha de finalización y la fecha actual en milisegundos.
 * @param {*} ms, la diferencia entre la fecha seleccionana y la fecha acutal en milisegundos
 * @returns Un Objeto con los datos de dias, horas, minutos y segundos
 */
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

/**
 * Funcion para formaterar el dato de la fecha
 * debe añadirse 0 si el número tiene menos de dos caracteres
 * @param {*} value
 */
const addLeadingZero = value => {
  if (value < 10) {
    return `${value}`.padStart(2, '0');
  }
  return `${value}`;
};

/**
 * Funcion para calcular una vez por segundo cuánto tiempo queda hasta la fecha especificada y actualiza la interfaz
 * del temporizador para mostrar cuatro dígitos: días, horas, minutos y segundos en el formato xx:xx:xx:xx.
 * @returns
 */
const countdownTimer = () => {
  disableButton();
  const currentDate = new Date().getTime(); //Variable que contiene la fecha actual
  differenceBetweenDates = getDateTime - currentDate;
  if (getDateTime <= currentDate) {
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(differenceBetweenDates);
  daysTimer.textContent = addLeadingZero(days);
  hoursTimer.textContent = addLeadingZero(hours);
  minutesTimer.textContent = addLeadingZero(minutes);
  secondsTimer.textContent = addLeadingZero(seconds);
  setTimeout(() => {
    countdownTimer();
  }, 1000);
};

/**
 * Evento para iniciar el conteo regresivo al dar click en el boton start
 */
btnStartCountdown.addEventListener('click', countdownTimer);

/**
 * ESTILOS CSS DE LOS ELEMENTOS DE LA INTERFAZ
 */

/**
 * Funcion para crear un color aleatorio en formato hexadecimal
 * @returns un numero hexadecimal aleatorio
 */
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
/**
 * Selector del contenedor del conteo regresivo
 */
const containerCountdown = document.querySelector('.timer');
/**
 * Selector contenedores de los elementos fecha y hora
 */
const styleContainers = document.getElementsByClassName('field');
/**
 * Selector de los elemenos numericos 00
 */
const styleNumbers = document.querySelectorAll('.value');
/**
 * Selector de los elementos Days, Hours, Minutes, Seconds
 */
const styleStrings = document.querySelectorAll('.label');

document.body.style.background = 'lightblue';
containerCountdown.style.border = '2px solid green';
containerCountdown.style.borderRadius = '5px';
containerCountdown.style.width = '600px';
containerCountdown.style.marginTop = '25px';
containerCountdown.style.padding = '10px';
containerCountdown.style.display = 'flex';
containerCountdown.style.gap = '20px';
containerCountdown.style.justifyContent = 'center';
for (const container of styleContainers) {
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'center';
}

for (const styleNumber of styleNumbers) {
  styleNumber.style.fontSize = '40px';
  styleNumber.style.fontFamily = 'Roboto, sans-serif';
  styleNumber.style.color = getRandomHexColor();
}

for (const styleString of styleStrings) {
  styleString.style.textTransform = 'uppercase';
  styleString.style.fontWeight = 'bold';
  styleString.style.fontSize = '30px';
  styleString.style.fontFamily = 'Roboto, sans-serif';
  styleString.style.color = getRandomHexColor();
}
