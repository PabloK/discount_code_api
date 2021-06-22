import { Context } from '@azure/functions';
import { ApolloError } from 'apollo-server-azure-functions';
import { Inject, Service } from 'typedi';

import { DiscountCodeGenerator } from '../helpers/discountcode.generator';
import { GraphQLErrors } from '../types/errors';
import { DiscountCode, MutationCreateDiscountCodesArgs } from '../types/graphql-types';

@Service()
export class DiscountCodeResolver {

  @Inject()
  private discountCodeGenerator : DiscountCodeGenerator

  public createDiscountCodes = async (args: MutationCreateDiscountCodesArgs, context: Context): Promise<DiscountCode[]> => {
    const discountCodes: DiscountCode[] = [];
    try {
      context.log.info("Recived request to create discount codes with arguments", args);
      for (let i = 0; i < args.codesToCreate; i++) {
        const newCode = this.discountCodeGenerator.generateDiscountcode();
        discountCodes.push({
          code: newCode,
          brand: args.id,
          discount: args.discountPercent,
          createdAt: Date.now(),
          used: false
        } as DiscountCode);
      }
      context.log.info(`Created ${discountCodes.length} discount codes for brand with id ${ args.id }`);

    } catch {
      context.log.error(`An error occoured when generating discount codes for request with arguments: ${args}`);
      throw new ApolloError('Could not create discount codes', GraphQLErrors.DiscountCodeGenerationError.toString(), args );
    }

    return Promise.resolve(
      discountCodes
    );
  }

}
