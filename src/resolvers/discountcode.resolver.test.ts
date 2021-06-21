import 'reflect-metadata';

import { Context } from '@azure/functions';
import Container from 'typedi';

import { MutationCreateDiscountCodesArgs } from '../types/graphql-types';
import { DiscountCodesResolver } from './discountcode.resolver';


describe('DiscountCodeResolver', () => {

  describe('CreateDiscountCodes', () => {

    let discountCodesResolver: DiscountCodesResolver;
    const mockLog = { info: () => {}, error: () => {}}

    beforeEach(() => {
      discountCodesResolver = Container.get(DiscountCodesResolver);
    });

    it('should create specified number of new discount codes', async () => {
      const args = { codesToCreate: 10, discountPercent: 10, id: "1" } as MutationCreateDiscountCodesArgs;
      const emptyContext = { log: mockLog} as Context;
      const actualResponse = await discountCodesResolver.createDiscountCodes(args, emptyContext);
      expect(actualResponse.discountCodes.length).toBe(10);
      for (const discountCode of actualResponse.discountCodes) {
        expect(discountCode.id).toBeDefined();
        expect(discountCode.createdAt).toBeDefined();
      }

    });
  });
});