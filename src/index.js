// En este archivo definirás tus rutas e importarás los componentes que vas a renderizar.

import { setRootEl, setRoutes, onURLChange } from './router.js';
import { home } from './views/home.js';
import { apiKeyView } from './views/viewApiKey.js';
import CharactersView from './views/Characters.js';
import ChatGroupView from './views/chatGroup.js';
//import { setRootEl, setRoutes, onURLChange } from './router.js';

// ... import other views
const routes = {
  '/': home,
  '/apikey': apiKeyView,
  '/chat': CharactersView,
  '/chatgroup': ChatGroupView,
};

// Assign the routes
setRoutes(routes);

// Set the root element where views will be rendered
window.addEventListener("DOMContentLoaded", (e) => {
  setRootEl(document.getElementById('root')); 
  onURLChange(e); // Llama a onURLChange con la ruta inicial
});

window.onpopstate = onURLChange;

console.log('se levanta el index.js');

/*
TODO:
1.- Definir rutas en router.
2.- Pasar "root element" a router.
3.- Invocar el router para renderizar la vista correcta.
*/