// src/views/chatGroup.js
import characters from '../data/dataset.js';
import { getOpenAi } from '../lib/openAi.js';
import { navigateTo } from '../router.js';

const ChatGroupView = () => {
  // Contenedor principal
  const container = document.createElement('div');
  container.className = 'chat-container';

  // ===== Header (flecha + avatar + título)
  const header = document.createElement('div');
  header.className = 'chat-header';

  const backButton = document.createElement('button');
  backButton.className = 'back-button-group';
  backButton.innerHTML = '←';
  backButton.addEventListener('click', () => navigateTo('/'));

  const avatar = document.createElement('img');
  avatar.src =
    'https://okdiario.com/img/series/2016/02/1445601206_241811_1445601596_sumario_normal.jpg';
  avatar.alt = 'Stars Hollow';
  avatar.className = 'avatar';

  const title = document.createElement('div');
  title.className = 'chat-title';
  title.textContent = 'Stars Hollow';

  header.appendChild(backButton);
  header.appendChild(avatar);
  header.appendChild(title);

  // ===== Área de mensajes
  const chatBox = document.createElement('div');
  chatBox.id = 'chat-box';

  // ===== Composer (input + botón)
  const composer = document.createElement('div');
  composer.className = 'composer';

  const messageInput = document.createElement('textarea');
  messageInput.className = 'composer-input';
  messageInput.placeholder = 'Escribe tu mensaje…';
  messageInput.rows = 1;

  const sendButton = document.createElement('button');
  sendButton.textContent = 'Enviar';
  sendButton.className = 'send';

  composer.appendChild(messageInput);
  composer.appendChild(sendButton);

  // Montaje
  container.appendChild(header);
  container.appendChild(chatBox);
  container.appendChild(composer);

  // ===== Helpers
  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      chatBox.scrollTop = chatBox.scrollHeight;
    });
  };

  const sendMessage = async () => {
    const message = messageInput.value.trim();
    if (!message) return;

    // Mensaje del usuario
    const you = document.createElement('p');
    you.className = 'user-message';
    you.textContent = `Tú: ${message}`;
    chatBox.appendChild(you);
    scrollToBottom();
    messageInput.value = '';

    try {
      // Un prompt por personaje
      const prompts = characters.map((ch) => [
        { role: 'user', content: `Actúa simulando ser ${ch.name}, ${message}` },
      ]);

      const responses = await Promise.all(prompts.map((p) => getOpenAi(p)));

      responses.forEach((res, idx) => {
        const ch = characters[idx];
        const ai = document.createElement('p');
        ai.className = 'bot-message';
        ai.textContent = `${ch.name}: ${res}`;
        chatBox.appendChild(ai);
      });

      scrollToBottom();
    } catch (err) {
      console.error(err);
      const errorEl = document.createElement('p');
      errorEl.className = 'bot-message';
      errorEl.textContent = 'Ups, hubo un problema. Intenta de nuevo.';
      chatBox.appendChild(errorEl);
      scrollToBottom();
    }
  };

  // Eventos (click y Enter para enviar)
  sendButton.addEventListener('click', sendMessage);
  messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Autofocus
  requestAnimationFrame(() => messageInput.focus());

  return container;
};

export default ChatGroupView;
