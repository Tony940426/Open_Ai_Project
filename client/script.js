import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat-Container');

let loadInterval;

function loader(element) {
  element.textContent = '';
  loadInterval = setInterval(() => {
    element.textContent += '.';
    if(element.textContent === '...') {
      element.textContent = '';
    }
  }, 300)
}

function typeText(element, text){
  let index = 0;
  let interval = setInterval(() => {
    if(index < text.length){
      element.innerHTML += text.chartAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

function generateUniqueId() {
  const timeStamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);
  return `id-${timeStamp}-${hexadecimalString}`;
}

function chatStripe (isAi, value, uniqueId){
  return (
    `
    <div class="wrapper ${isAi && 'ai'}">
      <div class="chat">
        <div className = 'profile'>
          <img
            src = "${isAi ? bot : user}"
            alt = "${isAI ? 'bot' : 'user'}"
          />
        </div>
        <div class="message" id =${uniqueId}>${value}</div>
      </div>
    </div>
    `
  )
}

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  //users
  chatContainer.innerHTML += chatStripe (false, data.get('prompt'));
  form.reset();

  //bot
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  const messageDiv = document.getElementById(uniqueId);
  loader(messageDiv);
}

form.addEventListener("submit", handleSubmit)
