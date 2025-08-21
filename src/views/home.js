import data from "../data/dataset.js";
import { filterData, sortData, computeStats } from '../lib/dataFunctions.js';
import { navigateTo } from '../router.js';

export const home = () => {
  const infoHtml = document.createElement('div');

  infoHtml.innerHTML = `
  <header id="home" role="banner" aria-label="Encabezado">
  <div class="hero-inner">
    <h1>Gilmore Girls — Serie</h1>
    <p class="hero-sub">Directorio de personajes & chat</p>
  </div>
  </header>

    <section id="controles" role="region" aria-label="Controles de filtrado">
      <div id="apikeybutton"></div>

      <label for="filter"> Filtrar por :</label>
      <select id="filter" data-testid="select-filter" name="intereses" aria-label="Filtro por interés">
        <option value="Todos">Todos</option>
        <!-- OJO: mantengo espacios iniciales para que coincidan con tu dataset -->
        <option value=" Arte">Arte</option>
        <option value=" Café">Café</option>
        <option value=" Música">Música</option>
        <option value=" Libros">Libros</option>
      </select>

      <label for="order"> Ordenar por :</label>
      <select id="order" data-testid="select-sort" name="name" aria-label="Ordenar">
        <option value="asc">A Z</option>
        <option value="desc">Z A</option>
      </select>

      <button id="resetButton" data-testid="button-clear" type="button">LIMPIAR</button>
      <button id="calcular" type="button">PROMEDIO DE APARICIONES:</button>

      <button id="group-chat-button" type="button">Chat Grupal</button>
    </section>

    <main role="main">
      <div id="estadistica" aria-live="polite"></div>
      <ul class="cards-container" id="cards-list" aria-live="polite"></ul>
    </main>

    <footer role="contentinfo">
      <p>Derechos de autor &copy;María Belén Guzmán</p>
    </footer>
  `;

  // Botón ApiKey
  const containerfunctions = infoHtml.querySelector('#apikeybutton');
  const buttonApiKey = document.createElement('button');
  buttonApiKey.className = 'button-ApiKey';
  buttonApiKey.textContent = 'Ir a ApiKey';
  buttonApiKey.addEventListener('click', () => navigateTo('/apikey'));
  containerfunctions.appendChild(buttonApiKey);

  // Render de cards
  const rootElement = infoHtml.querySelector('#cards-list');

  const renderItems = (lista) => {
    rootElement.innerHTML = '';
    const frag = document.createDocumentFragment();

    lista.forEach(item => {
      const li = document.createElement('li');
      li.className = 'cards';

      const img = document.createElement('img');
      img.src = item.imageUrl;
      img.alt = item.name;
      li.appendChild(img);

      const name = document.createElement('span');
      name.textContent = item.name;
      li.appendChild(name);

      // Intereses → chips bonitos (a partir del array)
      if (item.facts?.intereses?.length) {
        const chipsWrap = document.createElement('div');
        item.facts.intereses.forEach(raw => {
          const txt = String(raw).trim();
          if (!txt) return;
          const chip = document.createElement('span');
          chip.className = 'chip';
          chip.textContent = txt;
          chipsWrap.appendChild(chip);
        });
        li.appendChild(chipsWrap);
      }

      const chatButton = document.createElement('button');
      chatButton.textContent = 'Chatea Conmigo';
      chatButton.className = 'chat-button';
      chatButton.addEventListener('click', () => navigateTo('/chat', { id: item.id }));
      li.appendChild(chatButton);

      frag.appendChild(li);
    });

    rootElement.appendChild(frag);
  };

  // Estado inicial
  let dataFiltrada = data.slice();
  renderItems(dataFiltrada);

  // Controles
  const estadistica = infoHtml.querySelector('#estadistica');
  const selectFilter = infoHtml.querySelector('#filter');
  const selectOrder  = infoHtml.querySelector('#order');
  const resetButton  = infoHtml.querySelector('#resetButton');
  const buttonCalcular = infoHtml.querySelector('#calcular');

  selectFilter.addEventListener('change', (e) => {
    const valor = e.target.value;
    dataFiltrada = (valor === 'Todos')
      ? data.slice()
      : filterData(data, 'intereses', valor);
    renderItems(dataFiltrada);
  });

  selectOrder.addEventListener('change', (e) => {
    const ordenada = sortData(dataFiltrada, 'name', e.target.value);
    renderItems(ordenada);
  });

  resetButton.addEventListener('click', () => {
    selectFilter.value = 'Todos';
    selectOrder.value = 'asc';
    dataFiltrada = data.slice();
    renderItems(dataFiltrada);
    estadistica.innerHTML = '';
  });

  // Estadística (toggle)
  let resultadoElement = null;
  buttonCalcular.addEventListener('click', () => {
    if (resultadoElement) {
      resultadoElement.remove();
      resultadoElement = null;
      return;
    }
    const resultado = computeStats(data);
    resultadoElement = document.createElement('p');
    resultadoElement.textContent = `El promedio de número de apariciones es: ${resultado.mean}`;
    estadistica.appendChild(resultadoElement);
  });

  // Chat grupal
  const groupChatButton = infoHtml.querySelector('#group-chat-button');
  groupChatButton.addEventListener('click', () => navigateTo('/chatgroup'));

  return infoHtml;
};

