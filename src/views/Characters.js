// views/CharactersView.js
import characters from '../data/dataset.js'; 

const CharactersView = ({ id }) => {
  const character = characters.find((char) => char.id === id);

  const container = document.createElement('div');
  container.className = 'chat-container';

  const header = document.createElement('div');
  header.className = 'chat-header';

  const imageCharacter = document.createElement('img');
  imageCharacter.src = character.imageUrl;
  imageCharacter.className = "imageCharacter"

  const title = document.createElement('div');
  title.className = "title";
  title.textContent = `${character.name}`;


  const chatBox = document.createElement('div');
  chatBox.id = 'chat-box';

  const messageInput = document.createElement('input');
  messageInput.type = 'text';
  messageInput.placeholder = 'Type your message...';

  const sendButton = document.createElement('button');
  sendButton.textContent = 'Send';
  sendButton.className = "send"

  sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    const messageEl = document.createElement('p');
    messageEl.textContent = `You: ${message}`;
    chatBox.appendChild(messageEl);
    messageInput.value = '';
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

  