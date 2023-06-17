export interface IBooking {
    bookCode: number;
    bookDt: string;
    payCode: number;
    custCode: number;
    staffNo: number;
  }
  
  export class Booking implements IBooking {
    constructor(
      public bookCode: number,
      public bookDt: string,
      public payCode: number,
      public custCode: number,
      public staffNo: number
    ) {}
  
    static fromJSON(data: any): Booking {
      return new Booking(data.bookCode, data.bookDt, data.payCode, data.custCode, data.staffNo);
    }
  
    toJSON(): IBooking {
      return {
        bookCode: this.bookCode,
        bookDt: this.bookDt,
        payCode: this.payCode,
        custCode: this.custCode,
        staffNo: this.staffNo
      };
    }
  
    toString(): string {
      return `Booking{ bookCode=${this.bookCode}, bookDt=${this.bookDt}, payCode=${this.payCode}, custCode=${this.custCode}, staffNo=${this.staffNo} }`;
    }
  }
  
  