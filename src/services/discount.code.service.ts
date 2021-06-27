import { Context } from '@azure/functions/Interfaces.d';
import { ApolloError } from 'apollo-server-azure-functions';
import { Inject, Service } from 'typedi';

import { DatabaseHelper } from '../helpers/databse.helper';
import { DiscountCodeGenerator } from '../helpers/discount.code.generator';
import { DiscountCode } from '../types/graphql-types';

@Service()
export class DiscountCodeService {
  @Inject()
  private discountCodeGenerator: DiscountCodeGenerator;

  @Inject()
  private databaseHelper: DatabaseHelper;

  public createDiscountCodes = async (
    id: string,
    codesToCreate,
    discountPercent: number,
    context: Context,
  ): Promise<DiscountCode[]> => {
    const discountCodes: DiscountCode[] = [];
    const args = { id, codesToCreate, discountPercent };
    const created = new Date();
    const expires = new Date().setDate(created.getDate() + 31); // 31 days after creation
    try {
      context.log.info('Recived job to create discount codes:', args);
      for (let i = 0; i < codesToCreate; i += 1) {
        const newCode = this.discountCodeGenerator.generateDiscountCode();
        discountCodes.push({
          code: newCode,
          brand: id,
          discount: discountPercent,
          createdAt: created.getTime(),
          expiresAt: expires,
          userId: undefined,
        } as DiscountCode);
      }
      context.log.info(`Created ${discountCodes.length} discount codes for brand with id ${id}`);
    } catch (e) {
      context.log.error(
        `An error occoured when generating discount codes for job with arguments: ${args}`,
      );
      return Promise.reject(new Error(`Could not create discount codes ${args}`));
    }

    return Promise.resolve(discountCodes);
  };

  public assignDiscountCode = async (userId: string, brandId: string): Promise<DiscountCode> => {
    const codeAlreadyGiven = await this.databaseHelper.userHasCode(userId, brandId);
    if (codeAlreadyGiven) {
      return Promise.reject(
        new ApolloError(`User with id ${userId} already has a code with brand ${brandId}`),
      );
    }
    const discountCode = await this.databaseHelper
      .assignFirstUnusedDiscountCode(userId, brandId)
      .catch(() => {
        throw new ApolloError('No more codes to assign for given brand');
      });
    return Promise.resolve(discountCode);
  };
}
