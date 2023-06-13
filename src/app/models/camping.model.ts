export interface ICamping {
    campCode: string;
    campName: string;
    numOfEmp: number;
  }
  
  export class Camping implements ICamping {
    constructor(
      public campCode: string,
      public campName: string,
      public numOfEmp: number
    ) {}
  
    static fromJSON(data: any): Camping {
      return new Camping(data.campCode, data.campName, data.numOfEmp);
    }
  
    toJSON(): ICamping {
      return {
        campCode: this.campCode,
        campName: this.campName,
        numOfEmp: this.numOfEmp
      };
    }
  
    toString(): string {
      return `Campings{ campCode='${this.campCode}', campName='${this.campName}', numOfEmp=${this.numOfEmp} }`;
    }
  }
  