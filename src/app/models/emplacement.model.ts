export interface IEmplacement {
    campCode: string;
    empNo: number;
    catCode: string;
  }
  
  export class Emplacement implements IEmplacement {
    constructor(
      public campCode: string,
      public empNo: number,
      public catCode: string
    ) {}
  
    static fromJSON(data: any): Emplacement {
      return new Emplacement(data.campCode, data.empNo, data.catCode);
    }
  
    toJSON(): IEmplacement {
      return {
        campCode: this.campCode,
        empNo: this.empNo,
        catCode: this.catCode
      };
    }
  
    toString(): string {
      return `Emplacements{ campCode='${this.campCode}', empNo=${this.empNo}, catCode='${this.catCode}' }`;
    }
  }
  