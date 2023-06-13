import { IBooking, Booking } from './booking.model';
import { ISpotrental, Spotrental } from './spotrental.model';

export interface IClientTransaction {
  booking: IBooking;
  spotRentals: ISpotrental[];
}

export class ClientTransaction implements IClientTransaction {
  constructor(
    public booking: IBooking,
    public spotRentals: ISpotrental[]
  ) {}

  static fromJSON(data: any): ClientTransaction {
    const booking = Booking.fromJSON(data.booking);
    const spotRentals = data.spotRentals.map((item: any) => Spotrental.fromJSON(item));
    return new ClientTransaction(booking, spotRentals);
  }

  toString(): string {
    return `ClientTransaction{ booking=${this.booking.toString()}, spotRentals=[${this.spotRentals.map(sr => sr.toString()).join(', ')}] }`;
  }
}
