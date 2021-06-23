import crypto from 'crypto';
import { Service } from 'typedi';

@Service()
export class DiscountCodeGenerator {
  public generateDiscountCode = (): string => crypto.randomBytes(4).toString('hex');
}
