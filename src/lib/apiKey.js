// src/lib/apiKey.js

export const getApiKey = () => {
  // Implementa el código para obtener la API KEY desde Local Storage
  const myKey = localStorage.getItem("myKey");
  return myKey;
 
};
 
export const setApiKey = (key) => {
  localStorage.setItem ("myKey",key)
  // Implementa el código para guardar la API KEY en Local Storage
};