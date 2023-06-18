export interface IStaff {
  staffNo: number;
  staffName: string;
  staffSurname: string;
  
}

export class Staff implements IStaff {
  constructor(
    public staffNo: number,
    public staffName: string,
    public staffSurname: string
  ) {}

  static fromJSON(data: any): Staff {
    return new Staff(data.staffNo, data.staffName, data.staffSurname);
  }

  toJSON(): IStaff {
    return {
      staffNo: this.staffNo,
      staffName: this.staffName,
      staffSurname: this.staffSurname
    };
  }

  toString(): string {
    return `Staff{ staffNo=${this.staffNo}, staffName='${this.staffName}', staffSurname='${this.staffSurname}' }`;
  }
}
