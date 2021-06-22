import 'reflect-metadata';

import { Context } from '@azure/functions';
import Container from 'typedi';

import { MutationCreateDiscountCodesArgs } from '../types/graphql-types';
import { DiscountCodeService } from './discountcode.service';


describe('DiscountCodeResolver', () => {

  describe('createDiscountCodes', () => {

    let discountCodeService: DiscountCodeService;
    const mockLog = { info: () => {}, error: () => {}}

    beforeEach(() => {
      discountCodeService = Container.get(DiscountCodeService);
    });

    it('should create specified number of new discount codes', async () => {
      const startTime = Date.now()
      const args = { codesToCreate: 10, discountPercent: 10, id: "1" } as MutationCreateDiscountCodesArgs;
      const emptyContext = { log: mockLog} as Context;
      const actualResponse = await discountCodeService.createDiscountCodes(args.id, args.codesToCreate, args.discountPercent, emptyContext);
      expect(actualResponse.length).toBe(10);
      for (const discountCode of actualResponse) {
        expect(discountCode.brand).toBe("1");
        expect(discountCode.createdAt).toBeGreaterThanOrEqual(startTime);
        expect(discountCode.discount).toBe(10);
      }
    });

    it('creating a large number of discounts should be fast', async () => {
      const startTime = Date.now()
      const args = { codesToCreate: 100000, discountPercent: 10, id: "1" } as MutationCreateDiscountCodesArgs;
      const emptyContext = { log: mockLog} as Context;
      const actualResponse = await discountCodeService.createDiscountCodes(args.id, args.codesToCreate, args.discountPercent, emptyContext);
      expect(actualResponse.length).toBe(100000);
      const endTime = Date.now()
      const consumedTime = endTime - startTime;
      expect(consumedTime).toBeLessThan(1000);
    });

    it('it should throw an Error when something goes wrong', async () => {
      // Mock date time
      Date.now = () => { throw new Error("Could not generate date"); }
      const args = { id: "1", codesToCreate: 1, discountPercent: 10 } as MutationCreateDiscountCodesArgs;
      const emptyContext = { log: mockLog } as Context;
      expect(discountCodeService.createDiscountCodes(args.id, args.codesToCreate, args.discountPercent, emptyContext)).rejects.toThrowError(Error);
    });

  });
});