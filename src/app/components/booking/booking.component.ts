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
import { CategoryService } from 'src/app/services/category/category.service';
import { Category, ICategory } from 'src/app/models/category.model';

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
  ) {}

  ngOnInit(): void {
    this.generateBookCode();
    this.loadPayments();
    this.loadCustomers();
    this.loadStaff();
    this.loadCampings();
    this.loadCategories();
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
  
  updateCampCode(): void {
  console.log('Selected Camping:', this.selectedCamping); // Debug line
  if (this.selectedCamping !== null) {
    const camping = this.campings.find((camping: ICamping) => camping.campName === this.selectedCamping);
    if (camping) {
      this.selectedCampCode = camping.campCode;
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
      this.emplacementService.getEmplacementByCode(this.selectedCampCode, this.selectedEmpNo).subscribe((emplacement: IEmplacement) => {
        this.selectedCatCode = emplacement.catCode;
        this.categoryService.getCategoryByCode(this.selectedCatCode).subscribe((category: ICategory) => {
          this.selectedArea = category.areaM2;
          this.selectedUnitCost = category.unitCost;
        });
      });
    } else {
      this.selectedCatCode = null;
      this.selectedArea = null;
      this.selectedUnitCost = null;
    }
  }
  
  

  displayBubbleMessage: boolean = false;

showBubbleMessage(): void {
  this.displayBubbleMessage = true;
}

hideBubbleMessage(): void {
  this.displayBubbleMessage = false;
}

}
