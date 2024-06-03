/* eslint-disable no-undef */
import { getOpenAi } from '../src/lib/openAi.js';
import { postRequest } from '../src/lib/httpClient.js';

jest.mock('../src/lib/httpClient.js');

describe('communicateWithOpenAI', () => {
  test('communicateWithOpenAI', () => {
    postRequest.mockResolvedValue({
      data: {
        choices: [
          { message: { content: 'Soy el texto' } }
        ]
      }
    });

    return getOpenAi([{ role: 'user', content: 'Hola' }]).then(res => {
      console.log(res);
      expect(res).toBe('Soy el texto');
    });
  });
});
