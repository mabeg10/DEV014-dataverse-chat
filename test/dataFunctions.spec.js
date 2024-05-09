
import dataDefault from '../src/data/dataset.js';
import { filterData, sortData, computeStats } from '../src/lib/dataFunctions.js';
import { sortAsc, sortDesc, prom } from './Suite.js';

//const fakeData = data
const fakeDataNew = sortAsc
const fakeDataSort = sortDesc
//const fakeDataThree = prom


describe( 'filterData', () => {
  it('returns `filtrar data por intereses " Arte"`', () => {
    const actual= filterData(dataDefault, 'intereses', ' Arte');
    expect(actual.length).toBe(2); 
    expect(actual.map(item => item.name)).toContain('Emily Gilmore'); // también se puede usar .toEqual Ej: expect(filteredData.map(item => item.name)).toEqual(expect.arrayContaining(['Emily Gilmore', 'Liz Danes']));
    expect(actual.map(item => item.name)).toContain('Liz Danes');
  });

  it('Should return a message of Error in definition',()=>{
    const actual = filterData();
    expect(actual).toBe('Faltan definir parametros'); 
    expect(actual).not.toContain('Emily Gilmore');

  });
});

describe('sortData', () => {
  it('returns data sorted in ascending order', () => {
    const actual = sortData(fakeDataNew, 'name', 'asc');
    expect(actual).toEqual(sortAsc);
  });

  it('returns data sorted in descending order', () => { 
    const actual = sortData(fakeDataSort, 'name', 'desc'); 
    expect(actual).toEqual(sortDesc);
  });
});

describe('computeStats', () => {
  it('debe calcular las estadísticas correctamente', () => {
    const expectedStats = {
      sum: 219,
      count: 3,
      mean: 73,
    };

    const actual = computeStats(prom);
    expect(actual).toEqual(expectedStats);
  });
});
