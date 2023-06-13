export interface ISpotrental {
    bookCode: number;
    campCode: string;
    empNo: number;
    startDt: string;
    endDt: string;
    noPers: number;
  }
  
  export class Spotrental implements ISpotrental {
    constructor(
      public bookCode: number,
      public campCode: string,
      public empNo: number,
      public startDt: string,
      public endDt: string,
      public noPers: number
    ) {}
  
    static fromJSON(data: any): Spotrental {
      return new Spotrental(data.bookCode, data.campCode, data.empNo, data.startDt, data.endDt, data.noPers);
    }
  
    toJSON(): ISpotrental {
      return {
        bookCode: this.bookCode,
        campCode: this.campCode,
        empNo: this.empNo,
        startDt: this.startDt,
        endDt: this.endDt,
        noPers: this.noPers
      };
    }
  
    toString(): string {
      return `Spotrental{ bookCode=${this.bookCode}, campCode=${this.campCode}, empNo=${this.empNo}, startDt=${this.startDt}, endDt=${this.endDt}, noPers=${this.noPers} }`;
    }
  }
  