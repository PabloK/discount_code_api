import 'reflect-metadata';

import { AzureFunction, Context } from '@azure/functions/Interfaces.d';
import Container from 'typedi';

import { DiscountCodeService } from './services/discount.code.service';

const discountCodeService = Container.get(DiscountCodeService);
const serviceBusQueueTrigger: AzureFunction = async (
  context: Context,
  discountJob: any,
): Promise<void> => {
  const discountCodes = await discountCodeService.createDiscountCodes(
    discountJob.id,
    discountJob.codesToCreate,
    discountJob.discountPercent,
    context,
  );
  context.log('Persisting codes to database');
  context.bindings.outputDocuments = discountCodes;
};

export default serviceBusQueueTrigger;
