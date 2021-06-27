export class DiscountCodeGeneratorMock {
  private errText: string;

  private code: string;

  public setDiscountCodeResponse(code: string, errText: string) {
    this.errText = errText;
    this.code = code;
  }

  public generateDiscountCode(): string {
    if (this.errText !== undefined) {
      throw new Error(this.errText);
    }
    return this.code || '';
  }
}
