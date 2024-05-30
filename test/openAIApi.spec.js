import { getOpenAi} from '../src/utils/openAIApi.js';

describe('communicateWithOpenAI', () => {
  test('communicateWithOpenAI', () => {
    return getOpenAi().then(data => {
      expect(data).toBe('example');
    });
  });
});