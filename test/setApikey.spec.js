import { setApiKey } from '../src/lib/apiKey.js';

describe('setApiKey', () => {
  test('should save the API key in Local Storage', () => {
    // Llamar a la función setApiKey con una clave de ejemplo
    const apiKey = 'myApiKey';
    setApiKey(apiKey);

    // Verificar que la clave se haya guardado correctamente en el Local Storage
    expect(localStorage.getItem('myKey')).toBe(apiKey);
  });
});
