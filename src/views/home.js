//const Example = () => {

//};
//export default Example;
//import data  from "../data/dataset.js";

export const home = () => {
  //const viewEl = document.getElementById('div'); 
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
      <option value="Arte">Arte</option>
      <option value="Café">Café</option>
      <option value="Música">Música</option>
      <option value="Libros">Libros</option>
    </select>

    <label for="order"> Ordenar por :</label>
    <select id="select-sort" data-testid="select-sort" name="name" itemprop="select-sort">
      <option value="asc">A Z</option>
      <option value="desc">Z A</option>
    </select>
    <button id="resetButton" data-testid="button-clear">LIMPIAR</button>
    <button id="calcular">PROMEDIO DE APARICIONES:</button>
  </div>
</nav>`;
  //viewEl.appendChild(infoHtml); // Añadir infoHtml al elemento div con ID 'div'. En el router 
  return infoHtml;

}