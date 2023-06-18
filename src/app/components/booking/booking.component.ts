import { Component, OnInit } from '@angular/core';
import { ClientTransactionService } from '../../services/client-transaction/client-transaction.service';
import { SpotrentalService } from '../../services/spotrental/spotrental.service';
import { BookingService } from '../../services/booking/booking.service';
import { PaymentService } from '../../services/payment/payment.service';
import { CustomersService } from '../../services/customers/customers.service';
import { Customer, ICustomer } from 'src/app/models/customer.model';
import { StaffService } from 'src/app/services/staff/staff.service';
import { Staff, IStaff } from 'src/app/models/staff.model';
import { CampingsService } from 'src/app/services/campings/campings.service';
import { Camping, ICamping } from 'src/app/models/camping.model';
import { EmplacementService } from 'src/app/services/emplacement/emplacement.service';
import { Emplacement, IEmplacement } from 'src/app/models/emplacement.model';
import { IBooking } from '../../models/booking.model';
import { IPayment } from '../../models/payment.model';
import { Observable  } from 'rxjs';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookCode: number = 0;
  date: Date = new Date();
  payments: IPayment[] = [];
  selectedCustCode: number | null = null;
  selectedCustomer: ICustomer | undefined;
  selectedStaffNo: number | null = null;
  selectedStaff: IStaff | undefined;
  selectedCamping: ICamping | undefined;
  selectedEmplacement: IEmplacement | undefined;
  customers: ICustomer[] = [];
  staff: IStaff[] = [];
  searchTimeout: any;
  selectedPayMethod: string | null = null;
  selectedPayCode: number | null = null;

  constructor(
    private clientTransactionService: ClientTransactionService,
    private spotrentalService: SpotrentalService,
    private bookingService: BookingService,
    private paymentService: PaymentService,
    private customersService: CustomersService,
    private staffService: StaffService,
    private emplacementService: EmplacementService,
    private campingsService: CampingsService,
  ) {}

  ngOnInit(): void {
    this.generateBookCode();
    this.loadPayments();
    this.loadCustomers();
    this.loadStaff();
    this.loadCampings();
  }

  generateBookCode(): void {
    this.bookingService.getAllBookings().subscribe((bookings: IBooking[]) => {
      const lastBooking = bookings[bookings.length - 1];
      this.bookCode = lastBooking.bookCode + 1;
    });
  }

  loadPayments(): void {
    this.paymentService.getAllPayments().subscribe((payments: IPayment[]) => {
      this.payments = payments;
    });
  }

  loadCustomers(): void {
    this.customersService.getAllCustomers().subscribe((customers: ICustomer[]) => {
      this.customers = customers;
    });
  }

  searchCustomerByCode(): void {
    console.log('Customer custCode:', this.selectedCustCode);  // Debug line
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.selectedCustomer = this.customers.find((customer: ICustomer) => customer.custCode === this.selectedCustCode);
      console.log('Selected Customer:', this.selectedCustomer);  // Debug line
    }, 500);
    console.log(this.selectedCustomer?.custCode + ' ' + this.selectedCustomer?.custName + ' ' + this.selectedCustomer?.custSurname);
  }

  startSearchTimeout(): void {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.selectedCustomer = this.customers.find((customer: ICustomer) => customer.custCode === this.selectedCustCode);
    }, 500);
  }

  loadStaff(): void {
    this.staffService.getAllStaff().subscribe((staff: IStaff[]) => {
      this.staff = staff;
      console.log(this.staff[5000]);
    });
  }

  searchStaffByNo(): void {
    console.log('Staff No:', this.selectedStaffNo);  // Debug line
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.selectedStaff = this.staff.find((staff: IStaff) => staff.staffNo === this.selectedStaffNo);
      console.log('Selected Staff:', this.selectedStaff);  // Debug line
    }, 500);
    console.log(this.selectedStaff?.staffName + ' ' + this.selectedStaff?.staffSurname + ' ' + this.selectedStaff?.staffNo);
  }

  // updatePayCode(): void {
  //   if (this.selectedPayMethod !== null) {
  //     const payment = this.payments.find((payment: IPayment) => payment.payMethod === this.selectedPayMethod);
  //     if (payment) {
  //       this.selectedPayCode = payment.payCode;
  //     } else {
  //       this.selectedPayCode = null;
  //     }
  //   } else {
  //     this.selectedPayCode = null;
  //   }
  // }

  updatePayCode(): void {
    console.log('Printing on console the selected Paymethod:', this.selectedPayMethod)
    if (this.selectedPayMethod !== null) {
      const payment = this.payments.find((payment: IPayment) => payment.payMethod === this.selectedPayMethod);
      if (payment) {
        this.selectedPayCode = payment.payCode;
      } else {
        this.selectedPayCode = null;
      }
    } else {
      this.selectedPayCode = null;
    }
  }
  
  

  loadCampings(): void {
  }
}
