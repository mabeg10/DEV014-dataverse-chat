import characters from '../data/dataset.js';
import { getOpenAi } from '../lib/openAi.js';
import { navigateTo } from '../router.js';

const CharactersView = ({ id }) => {
  const character = characters.find((char) => char.id === id);

  const container = document.createElement('div');
  container.className = 'chat-container';

  // Header
  const header = document.createElement('div');
  header.className = 'chat-headergroup';

  const backButton = document.createElement('button');
  backButton.className = 'back-button';
  backButton.innerHTML = '←';
  backButton.addEventListener('click', () => navigateTo('/'));

  const imageCharacter = document.createElement('img');
  imageCharacter.src = character.imageUrl;
  imageCharacter.className = "imageCharacter";
  imageCharacter.alt = character.name;

  const titleContainer = document.createElement('div');
  titleContainer.className = 'title-container';

  const title = document.createElement('div');
  title.className = "title";
  title.textContent = character.name;

  const subtitle = document.createElement('div');
  subtitle.className = "subtitle";
  subtitle.textContent = 'En línea';

  titleContainer.appendChild(title);
  titleContainer.appendChild(subtitle);

  header.appendChild(backButton);
  header.appendChild(imageCharacter);
  header.appendChild(titleContainer);

  // Chat
  const chatBox = document.createElement('div');
  chatBox.id = 'chat-box';

  // Entrada de mensaje (arreglo: .cuadroinput es contenedor)
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

    const userMessageEl = document.createElement('p');
    userMessageEl.textContent = `Tú: ${message}`;
    userMessageEl.className = 'user-message';
    chatBox.appendChild(userMessageEl);
    messageInput.value = '';

    const messageOpenAI = [{ role: 'user', content: `Actúa simulando ser ${character.name}, ${message}` }];
    getOpenAi(messageOpenAI)
      .then((res) => {
        const aiMessageEl = document.createElement('p');
        aiMessageEl.className = 'bot-message';
        aiMessageEl.textContent = `${character.name}: ${res}`;
        chatBox.appendChild(aiMessageEl);
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

export default CharactersView;
