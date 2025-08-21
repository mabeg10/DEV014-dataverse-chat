import characters from '../data/dataset.js';
import { getOpenAi } from '../lib/openAi.js';
import { navigateTo } from '../router.js';

const ChatGroupView = () => {
  const container = document.createElement('div');
  container.className = 'chat-container';

  const header = document.createElement('div');
  header.className = 'chat-headergroup';

  const backButton = document.createElement('button');
  backButton.className = 'back-button-group';
  backButton.innerHTML = '←';
  backButton.addEventListener('click', () => navigateTo('/'));

  const imagenchat = document.createElement('img');
  imagenchat.src = "https://okdiario.com/img/series/2016/02/1445601206_241811_1445601596_sumario_normal.jpg";
  imagenchat.classList.add('imagenchatgrupal');
  imagenchat.alt = 'Stars Hollow';

  const title = document.createElement('div');
  title.className = 'title';
  title.textContent = 'Stars Hollow';

  header.appendChild(backButton);
  header.appendChild(imagenchat);
  header.appendChild(title);

  const chatBox = document.createElement('div');
  chatBox.id = 'chat-box';

  const inputWrap = document.createElement('div');
  inputWrap.className = "cuadroinput";

  const messageInput = document.createElement('textarea');
  messageInput.rows = 1;
  messageInput.placeholder = 'Escribe tu mensaje…';

  const sendButton = document.createElement('button');
  sendButton.textContent = 'Enviar';
  sendButton.className = "send";

  sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim() === '') {
      alert('Por favor, escribe un mensaje.');
      return;
    }

    const userMessageElement = document.createElement('p');
    userMessageElement.textContent = `Tú: ${message}`;
    userMessageElement.className = 'user-message';
    chatBox.appendChild(userMessageElement);
    messageInput.value = '';

    const prompts = characters.map((character) => ({
      role: 'user',
      content: `Actúa simulando ser ${character.name}, ${message}`
    }));

    Promise.all(prompts.map((msg) => getOpenAi([msg])))
      .then((responses) => {
        responses.forEach((res, index) => {
          const aiMessageEl = document.createElement('p');
          aiMessageEl.className = 'bot-message';
          aiMessageEl.textContent = `${characters[index].name}: ${res}`;
          chatBox.appendChild(aiMessageEl);
        });
      })
      .catch(console.error);
  });

  inputWrap.appendChild(messageInput);
  inputWrap.appendChild(sendButton);

  container.appendChild(header);
  container.appendChild(chatBox);
  container.appendChild(inputWrap);

  return container;
};

export default ChatGroupView;
