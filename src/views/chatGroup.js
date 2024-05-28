import characters from '../data/dataset.js'; 
import { getOpenAi } from '../lib/openAi.js';

const ChatGroupView = () => {
  const container = document.createElement('div');
  container.className = 'chat-container';

  const header = document.createElement('div');
  header.className = 'chat-header';
  header.textContent = 'Chat Grupal';

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
      return;
    }

    const userMessageElement = document.createElement('p');
    userMessageElement.textContent = `Tú: ${message}`;
    userMessageElement.className = 'user-message';
    chatBox.appendChild(userMessageElement);
    messageInput.value = '';

    const messageOpenAI = characters.map((character) => ({
      role: 'user',
      content: `Actúa simulando ser ${character.name}, ${message}`
    }));

    Promise.all(messageOpenAI.map((msg) => getOpenAi([msg])))
      .then((responses) => {
        responses.forEach((res, index) => {
          const aiMessageEl = document.createElement('p');
          aiMessageEl.className = 'bot-message';
          aiMessageEl.textContent = `${characters[index].name}: ${res}`;
          chatBox.appendChild(aiMessageEl);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  });

  container.appendChild(header);
  container.appendChild(chatBox);
  container.appendChild(messageInput);
  container.appendChild(sendButton);

  return container;
};

export default ChatGroupView;
