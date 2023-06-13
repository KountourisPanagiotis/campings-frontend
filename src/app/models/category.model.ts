export interface ICategory {
    catCode: string;
    areaM2: number;
    unitCost: number;
  }
  
  export class Category implements ICategory {
    constructor(
      public catCode: string,
      public areaM2: number,
      public unitCost: number
    ) {}
  
    static fromJSON(data: any): Category {
      return new Category(data.catCode, data.areaM2, data.unitCost);
    }
  
    toJSON(): ICategory {
      return {
        catCode: this.catCode,
        areaM2: this.areaM2,
        unitCost: this.unitCost
      };
    }
  
    toString(): string {
      return `Categories{ catCode='${this.catCode}', areaM2=${this.areaM2}, unitCost=${this.unitCost} }`;
    }
  }
  