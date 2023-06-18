import { Component, OnInit } from '@angular/core';
import { ClientTransactionService } from '../../services/client-transaction/client-transaction.service';
import { SpotrentalService } from '../../services/spotrental/spotrental.service';
import { BookingService } from '../../services/booking/booking.service';
import { IBooking } from '../../models/booking.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookCode: number = 0; // Initialize bookCode with a default value

  constructor(
    private clientTransactionService: ClientTransactionService,
    private spotrentalService: SpotrentalService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.generateBookCode();
  }

  generateBookCode(): void {
    this.bookingService.getAllBookings().subscribe((bookings: IBooking[]) => {
      const lastBooking = bookings[bookings.length - 1]; // Get the last entry
      this.bookCode = lastBooking.bookCode + 1; // Increment the bookCode by 1
    });
  }
  

  // Rest of the component code...
}
