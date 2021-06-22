import crypto from 'crypto';
import { Service } from 'typedi';

@Service()
export class DiscountCodeGenerator {
  public generateDiscountcode = (): string => {
    return crypto.randomBytes(4).toString("hex");
  }
}