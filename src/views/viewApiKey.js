import { setApiKey } from "../lib/apiKey.js";

export const apiKeyView = () => {
  // Crear el contenedor principal
  const container = document.createElement('div');
  container.id = 'apikey-container';
  
  // Crear el input para la API key
  const apiKeyInput = document.createElement('input');
  apiKeyInput.type = 'text';
  apiKeyInput.placeholder = 'Ingresa tu API Key';
  apiKeyInput.id = 'apikey-input';
  
  // Crear el botón para guardar la API key
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Guarda tu API Key';
  saveButton.onclick = () => {
    const apiKey = apiKeyInput.value;
    setApiKey(apiKey);
    alert('API Key guardada!');
  };
  
  // Añadir el input y el botón al contenedor
  container.appendChild(apiKeyInput);
  container.appendChild(saveButton);
  
  // Cargar la API key existente si hay alguna

  
  return container;
};