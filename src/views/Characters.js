import characters from '../data/dataset.js'; 
import { getOpenAi } from '../lib/openAi.js';

const CharactersView = ({ id }) => {
  const character = characters.find((char) => char.id === id);

  const container = document.createElement('div');
  container.className = 'chat-container';

  const header = document.createElement('div');
  header.className = 'chat-header';

  const imageCharacter = document.createElement('img');
  imageCharacter.src = character.imageUrl;
  imageCharacter.className = "imageCharacter";

  const title = document.createElement('div');
  title.className = "title";
  title.textContent = `${character.name}`;

  const chatBox = document.createElement('div');
  chatBox.id = 'chat-box';

  const messageInput = document.createElement('textarea');
  messageInput.placeholder = 'Escribe tu mensaje...';

  const sendButton = document.createElement('button');
  sendButton.textContent = 'Enviar';
  sendButton.className = "send";

  sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim() === '') {
      alert('Por favor, escribe un mensaje.');
      return; // Detener la función si el mensaje está vacío
    }

    const userMessageEl = document.createElement('p');
    userMessageEl.textContent = `Tú: ${message}`;
    userMessageEl.className = 'user-message';
    chatBox.appendChild(userMessageEl);
    messageInput.value = '';

    // Petición con la función getOpenAi
    const messageOpenAI = [{ role: 'user', content: `Actúa simulando ser ${character.name}, ${message}` }];
    getOpenAi(messageOpenAI)
      .then((res) => {
        const aiMessageEl = document.createElement('p');
        aiMessageEl.className = 'bot-message';
        aiMessageEl.textContent = `${character.name}: ${res}`;
        chatBox.appendChild(aiMessageEl);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  container.appendChild(header);
  container.appendChild(imageCharacter);
  container.appendChild(title);
  container.appendChild(chatBox);
  container.appendChild(messageInput);
  container.appendChild(sendButton);

  return container;
};

export default CharactersView;
