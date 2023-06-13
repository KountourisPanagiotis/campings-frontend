export interface ICustomer {
    custCode: number;
    custName: string;
    custSurname: string;
    custPhone: string;
  }
  
  export class Customer implements ICustomer {
    constructor(
      public custCode: number,
      public custName: string,
      public custSurname: string,
      public custPhone: string
    ) {}
  
    static fromJSON(data: any): Customer {
      return new Customer(data.custCode, data.custName, data.custSurname, data.custPhone);
    }
  
    toJSON(): ICustomer {
      return {
        custCode: this.custCode,
        custName: this.custName,
        custSurname: this.custSurname,
        custPhone: this.custPhone
      };
    }
  
    toString(): string {
      return `Customers{ custCode=${this.custCode}, custName='${this.custName}', custSurname='${this.custSurname}', custPhone='${this.custPhone}' }`;
    }
  }
  