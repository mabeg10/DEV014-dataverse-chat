// En este archivo definirás tus rutas e importarás los componentes que vas a renderizar.

import { setRootEl, setRoutes, onURLChange } from './router.js';
import { home } from './views/Home.js';
//import { setRootEl, setRoutes, onURLChange } from './router.js';

// ... import other views
const routes = {
  '/': home,
  // ...
};

// Assign the routes
setRoutes(routes);

// Set the root element where views will be rendered
window.addEventListener("DOMContentLoaded", (e) => {
  setRootEl(document.getElementById('root')); 
  onURLChange(e); // Llama a onURLChange con la ruta inicial
});

window.onpopstate = onURLChange;

/*
TODO:
1.- Definir rutas en router.
2.- Pasar "root element" a router.
3.- Invocar el router para renderizar la vista correcta.
*/