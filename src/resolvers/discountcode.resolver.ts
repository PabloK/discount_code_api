import { Context } from '@azure/functions';
import { Service } from 'typedi';

import { DiscountCode, DiscountCodesResponse, MutationCreateDiscountCodesArgs } from '../types/graphql-types';


@Service()
export class DiscountCodesResolver {

  public createDiscountCodes = async(args: MutationCreateDiscountCodesArgs, context: Context): Promise<DiscountCodesResponse> => {
    context.log.info("Recived request to create discount codes with arguments", args);
    return Promise.resolve({
      discountCodes: {
        discountCodes: [
          {
            id: "1",
            code: "ASDF",
            createdAt: Date.now().toLocaleString()
          } as DiscountCode
        ]
      }
    } as DiscountCodesResponse
    );
}

}
