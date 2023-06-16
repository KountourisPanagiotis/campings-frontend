export interface IPayment {
  payCode: number;
  payMethod: string;
}

export class Payment implements IPayment {
  constructor(
    public payCode: number,
    public payMethod: string
  ) {}

  static fromJSON(data: any): Payment {
    return new Payment(data.payCode, data.payMethod);
  }

  toJSON(): IPaymentJSON {
    return {
      payCode: this.payCode,
      payMethod: this.payMethod
    };
  }

  toString(): string {
    return `Payment{ payCode=${this.payCode}, payMethod='${this.payMethod}' }`;
  }
}

interface IPaymentJSON {
  payCode: number;
  payMethod: string;
}
