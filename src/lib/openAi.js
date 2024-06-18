import { getApiKey } from './apiKey.js';
import { postRequest } from './httpClient.js';

// Función para obtener la API key

export const getOpenAi =  (messages) => {

  const apiKey = getApiKey();

  const url = 'https://api.openai.com/v1/chat/completions';

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };

  const body = {
    model: 'gpt-4o',  // Especifica el modelo que quieres usar
    messages: messages
  };  

  
  return postRequest(url, body, headers)
    
    .then((result)=>{
      return result.data.choices[0].message.content;
    })
    .catch((err)=> {
      return err;

    })
  
  
  //console.error('Error al obtener la respuesta de OpenAI:', error);
  
};

