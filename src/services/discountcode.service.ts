import { Context } from '@azure/functions';
import { Inject, Service } from 'typedi';

import { DiscountCodeGenerator } from '../helpers/discountcode.generator';
import { DiscountCode } from '../types/graphql-types';

@Service()
export class DiscountCodeService {

  @Inject()
  private discountCodeGenerator : DiscountCodeGenerator

  public createDiscountCodes = async (id: string, codesToCreate, discountPercent: number, context: Context): Promise<DiscountCode[]> => {
    const discountCodes: DiscountCode[] = [];
    const args = { id, codesToCreate, discountPercent };
    try {
      context.log.info("Recived job to create discount codes:", args);
      for (let i = 0; i < codesToCreate; i++) {
        const newCode = this.discountCodeGenerator.generateDiscountcode();
        discountCodes.push({
          code: newCode,
          brand: id,
          discount: discountPercent,
          createdAt: Date.now(),
          used: false
        } as DiscountCode);
      }
      context.log.info(`Created ${discountCodes.length} discount codes for brand with id ${ id }`);

    } catch {
      context.log.error(`An error occoured when generating discount codes for jbo with arguments: ${args}`);
      throw new Error(`Could not create discount codes ${args}`);
    }

    return Promise.resolve(
      discountCodes
    );
  }

}
