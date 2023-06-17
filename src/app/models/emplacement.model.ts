  export interface IEmplacement {
    campCode: string;
    empNo: number;
    catCode: string;
    toJSON(): any;
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
  
    toJSON(): IEmplacementJSON {
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
  
  interface IEmplacementJSON {
    campCode: string;
    empNo: number;
    catCode: string;
  }
  
  