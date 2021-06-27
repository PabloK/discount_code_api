import 'reflect-metadata';

import { Context } from '@azure/functions/Interfaces.d';
import { ApolloError } from 'apollo-server-azure-functions';
import Container from 'typedi';

import { DatabaseHelperMock } from '../helpers/database.helper.mock';
import { DatabaseHelper } from '../helpers/databse.helper';
import { DiscountCodeGenerator } from '../helpers/discount.code.generator';
import { DiscountCodeGeneratorMock } from '../helpers/discount.code.generator.mock';
import { DiscountCode, MutationCreateDiscountCodesArgs } from '../types/graphql-types';
import { DiscountCodeService } from './discount.code.service';

describe('DiscountCodeResolver', () => {
  let discountCodeService: DiscountCodeService;
  let mockGenerator: DiscountCodeGeneratorMock;
  let mockDatabaseHelper: DatabaseHelperMock;
  const mockLog = { info: () => {}, error: () => {} };

  beforeAll(() => {
    mockGenerator = new DiscountCodeGeneratorMock();
    mockDatabaseHelper = new DatabaseHelperMock();
    Container.set(DiscountCodeGenerator, mockGenerator);
    Container.set(DatabaseHelper, mockDatabaseHelper);
    discountCodeService = Container.get(DiscountCodeService);
  });

  describe('createDiscountCodes', () => {
    it('should create the specified number of new discount codes', async () => {
      mockGenerator.setDiscountCodeResponse('code', undefined);
      const startTime = Date.now();
      const args = {
        codesToCreate: 10,
        discountPercent: 7,
        id: '1',
      } as MutationCreateDiscountCodesArgs;
      const emptyContext = { log: mockLog } as Context;
      const actualResponse = await discountCodeService.createDiscountCodes(
        args.id,
        args.codesToCreate,
        args.discountPercent,
        emptyContext,
      );
      expect(actualResponse.length).toBe(10);
      actualResponse.forEach((discountCode) => {
        expect(discountCode.brand).toBe('1');
        expect(discountCode.createdAt).toBeGreaterThanOrEqual(startTime);
        expect(discountCode.discount).toBe(7);
      });
    });

    it('should throw an Error when something goes wrong', async () => {
      mockGenerator.setDiscountCodeResponse('boda', 'Could not generate discount code.');
      const args = {
        id: '1',
        codesToCreate: 1,
        discountPercent: 9,
      } as MutationCreateDiscountCodesArgs;
      const emptyContext = { log: mockLog } as Context;
      expect(
        discountCodeService.createDiscountCodes(
          args.id,
          args.codesToCreate,
          args.discountPercent,
          emptyContext,
        ),
      ).rejects.toThrowError(Error);
    });
  });

  describe('assignDiscountCode', () => {
    it('should assign a discount code from the specified brand to the specified user', async () => {
      const userId = '1';
      const brandId = '1';
      mockDatabaseHelper.userHasCodeResponse = false;
      mockDatabaseHelper.assignFirstUnusedDiscountCodeResponse = {
        userId,
        brand: brandId,
        code: '123abcde',
      } as DiscountCode;
      const actual = await discountCodeService.assignDiscountCode(userId, brandId);
      expect(actual).toEqual({ userId, brand: brandId, code: '123abcde' });
    });

    it('should fail when trying to assign an already assigned id', async () => {
      const userId = '1';
      const brandId = '1';
      mockDatabaseHelper.userHasCodeResponse = true;
      expect(discountCodeService.assignDiscountCode(userId, brandId)).rejects.toThrowError(
        ApolloError,
      );
    });
  });
});
