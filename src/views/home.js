import data   from "../data/dataset.js";
import { filterData, sortData, computeStats } from '../lib/dataFunctions.js';
//import { apiKeyView } from './views/viewApiKey.js';
import { navigateTo } from '../router.js';


export const home = () => {
  const infoHtml = document.createElement('div');
  infoHtml.innerHTML = `<header>
  <h1> GILMORE GIRLS SERIE </h1>
</header>
<button id="abrir" class="abrir-menu">abrir</button>
<nav class="nav">
  <button id="cerrar" class="cerrar-menu">cerrar</button>
  <div id="controles">
    <label for="filter"> Filtrar por :</label>
    <select id="filter" data-testid="select-filter" name="intereses">
      <option value=" Arte">Arte</option>
      <option value=" Café">Café</option>
      <option value=" Música">Música</option>
      <option value=" Libros">Libros</option>
    </select>

    <label for="order"> Ordenar por :</label>
    <select id="select-sort" data-testid="select-sort" name="name" itemprop="select-sort">
      <option value="asc">A Z</option>
      <option value="desc">Z A</option>
    </select>
    <button id="resetButton" data-testid="button-clear">LIMPIAR</button>
    <button id="calcular">PROMEDIO DE APARICIONES:</button>
    <button id="group-chat-button">
  </div>
</nav>
<main>
    <div id="estadistica"></div>
    <div id="apikey-view"></div> 
    <div id="home"> </div>
  </main>
  <footer>
    <p>Derechos de autor &copy;María Belén Guzmán</p>
  </footer>`;
  //viewEl.appendChild(infoHtml); // Añadir infoHtml al elemento div con ID 'div'. En el router 
  
  const rootElement = infoHtml.querySelector('#home');
  // Renderizar ApiKeyView
  const apiKeyViewContainer = infoHtml.querySelector('#apikey-view');
  const buttonApiKey = document.createElement('button')
  buttonApiKey.textContent = 'Ir a ApiKey'
  apiKeyViewContainer.appendChild(buttonApiKey);

  const renderItems = (data) => {
    const itemDiv = document.createElement('ul');
    itemDiv.className = 'cards-container';

    data.forEach(item => {
      
      const listItem = document.createElement('li');
      listItem.className = 'cards';
    
      // imagen 
      const imageElement = document.createElement('img');
      imageElement.src = item.imageUrl;
      listItem.appendChild(imageElement); // Agregar la imagen al div
    
      const nameElement = document.createElement('span');
      nameElement.textContent = item.name; // para combinar name y description
      listItem.appendChild(nameElement);

      const interestsTitle = document.createElement('dt');
      interestsTitle.textContent = 'Intereses:';
      listItem.appendChild(interestsTitle);
  
      const interestsDescription = document.createElement('dd');
      interestsDescription.textContent = item.facts.intereses;
      listItem.appendChild(interestsDescription);
      
 
      // botón "Chat"
      const chatButton = document.createElement('button');
      chatButton.textContent = 'Chatea Conmigo';
      chatButton.className = 'chat-button';
      chatButton.dataset.id = item.id; 
      listItem.appendChild(chatButton);
      
      chatButton.addEventListener('click', () => {
        navigateTo('/chat', { id: item.id });
      });
  
      itemDiv.appendChild(listItem)
    

    });
    
    return itemDiv;
  
  };
  
  //manejo DOM FUNCIONES

  const estadistica = infoHtml.querySelector('#estadistica');
  const selectFilter = infoHtml.querySelector('#filter');
  const selectOrder = infoHtml.querySelector('#select-sort');
  const resetButton = infoHtml.querySelector('#resetButton');
  const buttonCalcular = infoHtml.querySelector('#calcular');
  const abrir = infoHtml.querySelector('#abrir');
  const cerrar = infoHtml.querySelector("#cerrar");
  const nav = infoHtml.querySelector(".nav");
  
  // MENU HAMBURGUESA
  abrir.addEventListener('click', function () {
    nav.classList.add('visible');
  });

  cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
  });

  let dataFiltrada = data;

  const resultRenderItems = renderItems(dataFiltrada);
  rootElement.appendChild(resultRenderItems);

  //Filter
  selectFilter.addEventListener('change', function (event) {
    dataFiltrada = filterData(data, 'intereses', event.target.value);

    rootElement.innerHTML = '';

    const cardsFiltrados = renderItems(dataFiltrada);
    rootElement.appendChild(cardsFiltrados);
  });

  // Filtro ordenar
  selectOrder.addEventListener('change', function (event) {
    const resultadoSortData = sortData(dataFiltrada, 'name', event.target.value);

    rootElement.innerHTML = '';

    const cardsOrdenados = renderItems(resultadoSortData);
    rootElement.appendChild(cardsOrdenados);
  });

  resetButton.addEventListener('click', function () {
    selectFilter.value = '';
    selectOrder.value = '';
    rootElement.innerHTML = '';
    dataFiltrada = data;
    const cardsOriginales = renderItems(data);
    rootElement.appendChild(cardsOriginales);
  });

  // ESTADÍSTICA
  let resultadoElement = null; 

  buttonCalcular.addEventListener('click', function () {
    const resultado = computeStats(data);
  

    if (resultadoElement) {
      resultadoElement.remove();
      resultadoElement = null;
    } else {
      resultadoElement = document.createElement('p');
      resultadoElement.textContent = `El promedio de número de apariciones es: ${resultado.mean}`;
      estadistica.appendChild(resultadoElement);
    }
  });

  const groupChatButton = infoHtml.querySelector('#group-chat-button');
  groupChatButton.textContent = "Chat Grupal"
  groupChatButton.addEventListener('click', () => {
    navigateTo('/chatgroup');
  });
  return infoHtml;
}


