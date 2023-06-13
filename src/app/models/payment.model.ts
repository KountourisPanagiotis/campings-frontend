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
  
    toJSON(): IPayment {
      return {
        payCode: this.payCode,
        payMethod: this.payMethod
      };
    }
  
    toString(): string {
      return `Payments{ payCode=${this.payCode}, payMethod='${this.payMethod}' }`;
    }
  }
  