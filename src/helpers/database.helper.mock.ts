/* eslint-disable no-underscore-dangle */
import { DiscountCode } from '../types/graphql-types';

export class DatabaseHelperMock {
  private _assignFirstUnusedDiscountCodeResponse: DiscountCode | undefined;

  lastCalledWith: Record<string, any>;

  private _userHasCodeResponse: boolean | undefined;

  public set userHasCodeResponse(value: boolean | undefined) {
    this._userHasCodeResponse = value;
  }

  public set assignFirstUnusedDiscountCodeResponse(value: DiscountCode) {
    this._assignFirstUnusedDiscountCodeResponse = value;
  }

  public assignFirstUnusedDiscountCode = async (
    userId: string,
    brandId: string,
  ): Promise<DiscountCode> => {
    this.lastCalledWith = { userId, brandId };
    if (this._assignFirstUnusedDiscountCodeResponse === undefined) {
      return Promise.reject(new Error('Could not assign discount code'));
    }
    return Promise.resolve(this._assignFirstUnusedDiscountCodeResponse as DiscountCode);
  };

  public userHasCode = async (userId: string, brandId: string): Promise<boolean> => {
    this.lastCalledWith = { userId, brandId };
    if (this._userHasCodeResponse === undefined) {
      return Promise.reject(new Error('Could not assign discount code'));
    }
    return Promise.resolve(this._userHasCodeResponse);
  };

  public reset(): void {
    this.lastCalledWith = undefined;
    this._assignFirstUnusedDiscountCodeResponse = undefined;
  }
}
