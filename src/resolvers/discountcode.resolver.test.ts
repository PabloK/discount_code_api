import 'reflect-metadata';

import { Context } from '@azure/functions';
import { ApolloError } from 'apollo-server-azure-functions';
import Container from 'typedi';

import { MutationCreateDiscountCodesArgs } from '../types/graphql-types';
import { DiscountCodeResolver } from './discountcode.resolver';


describe('DiscountCodeResolver', () => {

  describe('createDiscountCodes', () => {

    let discountCodeResolver: DiscountCodeResolver;
    const mockLog = { info: () => {}, error: () => {}}

    beforeEach(() => {
      discountCodeResolver = Container.get(DiscountCodeResolver);
    });

    it('should create specified number of new discount codes', async () => {
      const startTime = Date.now()
      const args = { codesToCreate: 10, discountPercent: 10, id: "1" } as MutationCreateDiscountCodesArgs;
      const emptyContext = { log: mockLog} as Context;
      const actualResponse = await discountCodeResolver.createDiscountCodes(args, emptyContext);
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
      const actualResponse = await discountCodeResolver.createDiscountCodes(args, emptyContext);
      expect(actualResponse.length).toBe(100000);
      const endTime = Date.now()
      const consumedTime = endTime - startTime;
      expect(consumedTime).toBeLessThan(1000);
    });

    it('it should throw an ApolloError when something goes wrong', async () => {
      // Mock date time
      Date.now = () => { throw new Error("Could not generate date"); }
      const args = { codesToCreate: 1, discountPercent: 10, id: "1" } as MutationCreateDiscountCodesArgs;
      const emptyContext = { log: mockLog } as Context;
      expect(discountCodeResolver.createDiscountCodes(args, emptyContext)).rejects.toThrowError(ApolloError);
    });

  });
});