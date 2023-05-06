'use strict';

/**
 * Para mostrar las notificaciones al usuario en lugar de console.log() se usa la biblioteca notiflix.
 */
import { Notify } from 'notiflix/build/notiflix-notify-aio';

/**
 * Selector del elemento formulario
 */
const formPromiseGenerator = document.querySelector('form');
/**
 * Selector del campo Delay
 */
const inputDelay = document.querySelector('[name = "delay"]');
/**
 * Selector del campo Step
 */
const inputStep = document.querySelector('[name = "step"]');
/**
 * Selector del campo Amount
 */
const inputAmount = document.querySelector('[name = "amount"]');
/**
 * Selector boton de envio del formulario
 */

const btnSubmit = document.querySelector('button');

/**
 * Funcion para crear las promesas
 * @param {*} position
 * @param {*} delay
 */
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    Promise.resolve({ position, delay }).then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    });
  } else {
    Promise.reject({ position, delay }).catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
}

/**
 * Funcion manejadora de los eventos submit
 * @param {*} event
 */
const handleSubmit = event => {
  event.preventDefault();
  let delay = Number(inputDelay.value);
  const step = Number(inputStep.value);
  const amount = Number(inputAmount.value);
  let position = 0;
  setTimeout(()=>{
    position++;
    createPromise(position,delay);
    const timerId = setInterval(()=>{
      position++;
      delay+=step;
      createPromise(position,delay)
      if(position>=amount){
        clearInterval(timerId);
      }
    },step);
  },delay);
};

/**
 * Evento submit que al enviar el formulario
 */
formPromiseGenerator.addEventListener('submit', handleSubmit);

/**
 * ESTILOS CSS DEL FORMULARIO
 */

inputDelay.style.display = "block";
inputStep.style.display = "block";
inputAmount.style.display = "block";
formPromiseGenerator.style.display = "flex";
formPromiseGenerator.style.gap = "10px";
formPromiseGenerator.style.alignItems = "flex-end"