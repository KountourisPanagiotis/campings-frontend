// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-customers',
//   templateUrl: './customers.component.html',
//   styleUrls: ['./customers.component.css']
// })
// export class CustomersComponent {

// }



import { CustomersService } from '../../services/customers/customers.service';
import { Component, OnInit } from '@angular/core';
import { ICustomer } from '../../models/customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: ICustomer[] = [];

  constructor(private customersService: CustomersService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customersService.getAllCustomers().subscribe(
      (data: ICustomer[]) => {
        this.customers = data.reverse();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  setCustCode():void {
    
  }
}
