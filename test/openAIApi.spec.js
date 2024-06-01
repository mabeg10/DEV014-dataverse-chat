import { getOpenAi} from '../src/lib/openAi.js';

jest.mock('axios');

describe('communicateWithOpenAI', () => {
  test('communicateWithOpenAI', () => {
    return getOpenAi().then(data => {
      expect(data.length).toBe(1);
    });
  });
});