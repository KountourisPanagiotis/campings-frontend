import { CustomersService } from '../../services/customers/customers.service';
import { Component, OnInit } from '@angular/core';
import { ICustomer , Customer} from '../../models/customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: ICustomer[] = [];
  custCode: number = 0;
  custSurname: string = '';
  custName: string = '';
  custPhone: string = '';

  constructor(private customersService: CustomersService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customersService.getAllCustomers().subscribe(
      (data: ICustomer[]) => {
        this.customers = data.reverse();
        this.setCustCode();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  setCustCode(): void {
    const maxCustCode = Math.max(...this.customers.map(customer => customer.custCode));
    this.custCode = maxCustCode + 1;
  }

  submitForm(): void {
    const newCustomer: ICustomer = new Customer(
      this.custCode,
      this.custName,
      this.custSurname,
      this.custPhone
    );

    this.customersService.insertCustomer(newCustomer).subscribe(
      (data: ICustomer) => {
        console.log('Customer inserted successfully:', data);
        // Perform any additional actions or show success message
        this.loadCustomers();
      },
      (error: any) => {
        console.log('Error inserting customer:', error);
        // Handle error or show error message
      }
    );
  }
}
