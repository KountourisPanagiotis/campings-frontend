export interface ICamping {
  campCode: string;
  campName: string;
  numOfEmp: number;
  toJSON(): any;
}

export class Camping implements ICamping {
  constructor(
    public campCode: string,
    public campName: string,
    public numOfEmp: number
  ) {}

  static fromJSON(data: any): Camping {
    return new Camping(
      data.campCode,
      data.campName,
      data.numOfEmp
    );
  }

  toJSON(): ICampingJSON {
    return {
      campCode: this.campCode,
      campName: this.campName,
      numOfEmp: this.numOfEmp
    };
  }

  toString(): string {
    return `Camping{ 
      campCode=${this.campCode}, 
      campName='${this.campName}', 
      numOfEmp=${this.numOfEmp} }`;
  }
}

interface ICampingJSON {
  campCode: string;
  campName: string;
  numOfEmp: number;
}
