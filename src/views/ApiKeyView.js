import { setApiKey, getApiKey } from '../lib/apiKey.js';

const ApiKeyView = () => {
  // Crear el contenedor principal
  const container = document.createElement('div');
  container.id = 'apikey-container';
  
  // Crear el input para la API key
  const apiKeyInput = document.createElement('input');
  apiKeyInput.type = 'text';
  apiKeyInput.placeholder = 'Enter your API Key';
  apiKeyInput.id = 'apikey-input';
  
  // Crear el botón para guardar la API key
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save API Key';
  saveButton.onclick = () => {
    const apiKey = apiKeyInput.value;
    setApiKey(apiKey);
    alert('API Key saved!');
  };
  
  // Añadir el input y el botón al contenedor
  container.appendChild(apiKeyInput);
  container.appendChild(saveButton);
  
  // Cargar la API key existente si hay alguna
  const existingApiKey = getApiKey();
  if (existingApiKey) {
    apiKeyInput.value = existingApiKey;
  }
  
  return container;
};
  
export default ApiKeyView;