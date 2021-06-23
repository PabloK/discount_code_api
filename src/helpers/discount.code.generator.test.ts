import 'reflect-metadata';

import Container from 'typedi';

import { DiscountCodeGenerator } from './discount.code.generator';

const expectedLength = 8;

describe('DiscountCodeGenerator', () => {
  describe('generateDiscountCode', () => {
    it(`should return a ${expectedLength} character string`, () => {
      const discountCodeGenerator = Container.get(DiscountCodeGenerator);
      for (let index = 0; index < 100; index += 1) {
        const actual = discountCodeGenerator.generateDiscountCode();
        expect(actual.length).toBe(expectedLength);
      }
    });

    it('should return a string containing only numbers and letters', () => {
      const discountCodeGenerator = Container.get(DiscountCodeGenerator);
      for (let index = 0; index < 10; index += 1) {
        const actual = discountCodeGenerator.generateDiscountCode();
        expect(actual).toMatch(/[0-9a-f]{8}/);
      }
    });

    it('should be fast', () => {
      const discountCodeGenerator = Container.get(DiscountCodeGenerator);
      const startTime = Date.now();
      for (let index = 0; index < 100000; index += 1) {
        discountCodeGenerator.generateDiscountCode();
      }
      const endTime = Date.now();
      const consumedTime = endTime - startTime;
      expect(consumedTime).toBeLessThan(1000);
    });
  });
});
