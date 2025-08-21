// src/views/Characters.js
import characters from '../data/dataset.js';
import { getOpenAi } from '../lib/openAi.js';
import { navigateTo } from '../router.js';

const CharactersView = ({ id }) => {
  // Buscar personaje
  const character = characters.find((char) => char.id === id);
  if (!character) {
    const fallback = document.createElement('div');
    fallback.textContent = 'Personaje no encontrado.';
    return fallback;
  }

  // Contenedor principal (card)
  const container = document.createElement('div');
  container.className = 'chat-container';

  // ===== Header estilo DM
  const header = document.createElement('div');
  header.className = 'chat-header';

  const backButton = document.createElement('button');
  backButton.className = 'back-button';
  backButton.innerHTML = '←';
  backButton.addEventListener('click', () => navigateTo('/'));

  const avatar = document.createElement('img');
  avatar.src = character.imageUrl;
  avatar.alt = character.name;
  avatar.className = 'avatar'; // coincide con CSS (40x40 redondo)

  const title = document.createElement('div');
  title.className = 'chat-title';
  title.textContent = character.name;

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
  messageInput.rows = 1;
  messageInput.placeholder = 'Escribe tu mensaje…';

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
    // Espera a que la burbuja entre al DOM
    requestAnimationFrame(() => {
      chatBox.scrollTop = chatBox.scrollHeight;
    });
  };

  const sendMessage = async () => {
    const message = messageInput.value.trim();
    if (!message) return;

    // Burbuja del usuario
    const userMessageEl = document.createElement('p');
    userMessageEl.textContent = `Tú: ${message}`;
    userMessageEl.className = 'user-message';
    chatBox.appendChild(userMessageEl);
    scrollToBottom();
    messageInput.value = '';

    // Llamada a OpenAI
    try {
      const payload = [{ role: 'user', content: `Actúa simulando ser ${character.name}, ${message}` }];
      const res = await getOpenAi(payload);

      const aiMessageEl = document.createElement('p');
      aiMessageEl.className = 'bot-message';
      aiMessageEl.textContent = `${character.name}: ${res}`;
      chatBox.appendChild(aiMessageEl);
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

  // Eventos
  sendButton.addEventListener('click', sendMessage);

  // Enviar con Enter (Shift+Enter = salto de línea)
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

export default CharactersView;
