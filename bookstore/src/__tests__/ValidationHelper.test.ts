import { isValidTitle } from '../helpers/validationHelper.js';

describe('Validação de Título do Livro', () => {
  test('Deve retornar true para títulos com 3 ou mais caracteres', () => {
    expect(isValidTitle('ABC')).toBe(true);
    expect(isValidTitle('A long title')).toBe(true);
  });

  test('Deve retornar false para títulos com menos de 3 caracteres', () => {
    expect(isValidTitle('A')).toBe(false);
    expect(isValidTitle('AB')).toBe(false);
  });
});
