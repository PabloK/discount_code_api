import 'reflect-metadata';

import { AzureFunction, Context } from '@azure/functions';
import Container from 'typedi';

import { DiscountCodeService as DiscountCodeService } from './services/discountcode.service';

const discountCodeService = Container.get(DiscountCodeService)
const serviceBusQueueTrigger: AzureFunction = async function (context: Context, discountJob: any): Promise<void> {
    const discountCodes = await discountCodeService.createDiscountCodes(discountJob.id, discountJob.codesToCreate, discountJob.discountPercent, context);
    context.log("Persisting codes to database");
    context.bindings.outputDocuments = discountCodes;
};

export default serviceBusQueueTrigger;
