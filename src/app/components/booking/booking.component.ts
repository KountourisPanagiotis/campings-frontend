import { Component, OnInit } from '@angular/core';
import { ClientTransactionService } from '../../services/client-transaction/client-transaction.service';
import { SpotrentalService } from '../../services/spotrental/spotrental.service';
import { BookingService } from '../../services/booking/booking.service';
import { PaymentService } from '../../services/payment/payment.service';
import { CustomersService } from '../../services/customers/customers.service';
import { ICustomer } from 'src/app/models/customer.model';
import { StaffService } from 'src/app/services/staff/staff.service';
import { IStaff } from 'src/app/models/staff.model';
import { CampingsService } from 'src/app/services/campings/campings.service';
import { ICamping } from 'src/app/models/camping.model';
import { EmplacementService } from 'src/app/services/emplacement/emplacement.service';
import { IEmplacement } from 'src/app/models/emplacement.model';
import { IBooking } from '../../models/booking.model';
import { IPayment } from '../../models/payment.model';
import { CategoryService } from 'src/app/services/category/category.service';
import { ICategory } from 'src/app/models/category.model';
import { DatePipe } from '@angular/common'; // date conversion
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISpotrental, Spotrental } from '../../models/spotrental.model'
import { ClientTransaction } from 'src/app/models/client.transaction.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: [DatePipe],
})
export class BookingComponent implements OnInit {
  bookCode: number = 0;
  date: Date = new Date();
  payments: IPayment[] = [];
  selectedCustCode: number | null = null;
  selectedCustomer: ICustomer | undefined;
  selectedStaffNo: number | null = null;
  selectedStaff: IStaff | undefined;
  selectedCamping: string | null = null;
  selectedEmplacement: IEmplacement | undefined;
  customers: ICustomer[] = [];
  staff: IStaff[] = [];
  searchTimeout: any;
  selectedPayMethod: string | null = null;
  selectedPayCode: number | null = null;
  campings: ICamping[] = [];
  category: ICategory[] = [];
  selectedCategory: ICategory[] = [];
  selectedCampCode: string | null = null;
  selectedEmpNo: number | null = null;
  selectedCatCode: string | null = null;
  selectedArea: number | null = null;
  selectedUnitCost: number | null = null;
  displayBubbleMessage: boolean = false;
  startDt: string | null = null;
  endDt: string | null = null;
  noPers: number | null = null;
  totalCost: number | null = null;


  constructor(
    private clientTransactionService: ClientTransactionService,
    private spotrentalService: SpotrentalService,
    private bookingService: BookingService,
    private paymentService: PaymentService,
    private customersService: CustomersService,
    private staffService: StaffService,
    private emplacementService: EmplacementService,
    private campingsService: CampingsService,
    private categoryService: CategoryService,
    private datePipe: DatePipe, // Date conversion
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.generateBookCode();
    this.loadPayments();
    this.loadCustomers();
    this.loadStaff();
    this.loadCampings();
    this.loadCategories();
    const currentDate = new Date();
    this.startDt = this.datePipe.transform(currentDate, 'dd/MM/yyyy');
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
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.selectedCustomer = this.customers.find((customer: ICustomer) => customer.custCode === this.selectedCustCode);
    }, 500);
    console.log(
      this.selectedCustomer?.custCode +
        ' ' +
        this.selectedCustomer?.custName +
        ' ' +
        this.selectedCustomer?.custSurname
    );
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
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.selectedStaff = this.staff.find((staff: IStaff) => staff.staffNo === this.selectedStaffNo);
    }, 500);
  }

  updatePayCode(): void {
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

  updateCampCode(): void {
    if (this.selectedCamping !== null) {
      const camping = this.campings.find((camping: ICamping) => camping.campName === this.selectedCamping);
      if (camping) {
        this.selectedCampCode = camping.campCode;
        this.calculateTotalCost();
      } else {
        this.selectedCampCode = null;
      }
    } else {
      this.selectedCampCode = null;
    }
  }

  loadCampings(): void {
    this.campingsService.getAllCampings().subscribe((campings: ICamping[]) => {
      this.campings = campings;
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe((category: ICategory[]) => {
      this.category = category;
    });
  }

  // using the selectedCampCode and the selectedEmpNo we will find through emplacementsService the selectedCatCode.
  // then with the catcode known, through categoriesService we can find the selectedArea and the selectedUnitCost.
  // Then we set the value of selectedCatCode at the input with id catCode.
  // Then we set the value of selectedArea at the input with id area.
  // Then we set the value of selectedUnitCost at the input with id unitCost.
  updateCatCodeAreaUnitCost(): void {
    if (this.selectedCampCode !== null && this.selectedEmpNo !== null) {
      this.emplacementService
        .getEmplacementByCode(this.selectedCampCode, this.selectedEmpNo)
        .subscribe((emplacement: IEmplacement) => {
          this.selectedCatCode = emplacement.catCode;
          this.categoryService.getCategoryByCode(this.selectedCatCode).subscribe((category: ICategory) => {
            this.selectedArea = category.areaM2;
            this.selectedUnitCost = category.unitCost;
            this.calculateTotalCost();
          });
        });
    } else {
      this.selectedCatCode = null;
      this.selectedArea = null;
      this.selectedUnitCost = null;
    }
  }

  showBubbleMessage(): void {
    this.displayBubbleMessage = true;
  }

  hideBubbleMessage(): void {
    this.displayBubbleMessage = false;
  }

  // Method that checks constantly if selectedCamping and selectedCampCode and selectedEmpNo
  // and selectedCatCode and selectedArea and selectedUnitCost and startDt
  // and endDt and noPers are null, else calculates the totalCost.
  // The total cost is calculated by the selectedUnitCost multiplied by the endDt-startDt difference multiplied by the noPers
  calculateTotalCost(): void {
    if (
      this.selectedCamping !== null &&
      this.selectedCampCode !== null &&
      this.selectedEmpNo !== null &&
      this.selectedCatCode !== null &&
      this.selectedArea !== null &&
      this.selectedUnitCost !== null &&
      this.startDt !== null &&
      this.endDt !== null &&
      this.noPers !== null
    ) {
      const start = this.parseDate(this.startDt); // Convert startDt to a Date object
      const end = new Date(this.endDt);
      const diff = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);

      // Check if the date diff is less than zero, set the endDt to startDt and show MatSnackBar message
      if (diff < 0) {
        this.totalCost = null;
        this.endDt = this.startDt;
        this.showSnackbarMessage('End date cannot be older than the start date');
      }

      this.totalCost = this.selectedUnitCost * diff * this.noPers;
    } else {
      this.totalCost = null;
    }
  }

  showSnackbarMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 6000,
    });
  }

  private parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }

  submitForm(): void {
    if (
      // Booking
      this.bookCode !== null &&
      this.date !== null &&
      // Paycode
      this.selectedPayCode !== null &&
      // Customer
      this.selectedCustCode !== null &&
      this.selectedCustomer?.custSurname !== null &&
      this.selectedCustomer?.custName !== null &&
      this.selectedCustomer?.custPhone != null &&
      // Staff
      this.selectedStaff?.staffNo !== null &&
      this.selectedStaff?.staffName !== null &&
      this.selectedStaff?.staffSurname !== null &&
      // Emplacement
      this.selectedCamping !== null &&
      this.selectedCampCode !== null &&
      this.selectedEmpNo !== null &&
      this.selectedCatCode !== null &&
      this.selectedArea !== null &&
      this.selectedUnitCost !== null &&
      this.startDt !== null &&
      this.endDt !== null &&
      this.noPers !== null &&
      this.totalCost !== null
    ) {

      const spotRental: ISpotrental = {
        bookCode: this.bookCode,
        campCode: this.selectedCampCode,
        empNo: this.selectedEmpNo,
        startDt: this.datePipe.transform(this.parseDate(this.startDt), 'yyyy-MM-dd'),
        endDt: this.endDt,
        noPers: this.noPers,
        
        toJSON(): any {
          return {
            bookCode: this.bookCode,
            campCode: this.campCode,
            empNo: this.empNo,
            startDt: this.startDt,
            endDt: this.endDt,
            noPers: this.noPers
          };
        }

      };
        
      const booking: IBooking = {
        bookCode: this.bookCode,
        bookDt: this.datePipe.transform(this.date, 'yyyy-MM-dd'),
        payCode: this.selectedPayCode!,
        custCode: this.selectedCustCode!,
        staffNo: this.selectedStaff?.staffNo!,

        toJSON(): any {
          return {
            bookCode: this.bookCode,
            bookDt: this.bookDt,
            payCode: this.payCode,
            custCode: this.custCode,
            staffNo: this.staffNo
          };
        }
      };

      // Creating a client transaction from this general booking
      // having a array of spotrentals
      const clientTransaction: ClientTransaction = new ClientTransaction(booking , [spotRental]);

      this.clientTransactionService.insertClientTransaction(clientTransaction).subscribe(
        (data: ClientTransaction) => {
          this.snackBar.open('ClientTransaction inserted successfully', 'Close', { duration: 4000 });
        },
        (error: any) => {
          this.snackBar.open('Error inserting ClientTransaction', 'Close', { duration: 4000 }); 
        }
      );
      this.showSnackbarMessage('Booking has been submitted Successfully');
    }
  }
}
