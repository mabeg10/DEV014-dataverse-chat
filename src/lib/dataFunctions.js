export function filterData(data, filterBy, value) {

  if(!data || !filterBy || !value) return 'Faltan definir parametros' // Ejemplo coach Carlos
  
  let resultadoFiltro = []
  
  resultadoFiltro = data.filter((element) => {
  
    return element.facts[filterBy].includes(value);
  
  })
  
  return resultadoFiltro;
  
}
  
export function sortData(data, sortBy, sortOrder) {
    
  const copiarData = data.map(item => ({...item})); //item => (...)
  console.log(copiarData)
  
  if (sortBy === 'name') {
    if (sortOrder === 'asc') {
      return copiarData.sort ((a,b) => a.name.localeCompare (b.name));
    }else {
      return copiarData.sort ((a,b) => b.name.localeCompare (a.name));
    }
  } else {
    if (sortOrder === 'desc') {
      return copiarData.sort ((a,b) => a[sortBy] - b [sortBy]);
    } else {
      return copiarData.sort((a,b) => b[sortBy] - a [sortBy])
    } 
  }
}
  
  
export function computeStats(data){
  
  
  // Reducir los datos para calcular estadísticas
  const stats = data.reduce((acc, current) => {
  
    // Acceder al número de apariciones de cada objeto
    const apariciones = current.facts['número de apariciones'];
  
    // Sumar los valores
    acc.sum += apariciones;
   
    // Contar los valores
    acc.count++;
    return acc;
  },
  
    
  { sum: 0, count: 0 }
  );
  
  // Calcular la media
  stats.mean = stats.sum / stats.count;
  
  return stats;
}
  