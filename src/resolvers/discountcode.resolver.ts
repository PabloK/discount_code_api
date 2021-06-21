import { Context } from '@azure/functions';
import { Service } from 'typedi';

import { DiscountCode, DiscountCodesResponse, MutationCreateDiscountCodesArgs } from '../types/graphql-types';

@Service()
export class DiscountCodesResolver {

  public createDiscountCodes = async(args: MutationCreateDiscountCodesArgs, context: Context): Promise<DiscountCodesResponse> => {
    context.log.info("Recived request to create discount codes with arguments", args);
    const discountCodes: DiscountCode[] = [];
    for (let i = 0; i < args.codesToCreate; i++) {
      discountCodes.push({
        id: i.toString(),
        code: "test",
        createdAt: Date.now().toLocaleString()
      } as DiscountCode)
    }

    return Promise.resolve(
      {discountCodes} as DiscountCodesResponse
    );
}

}
