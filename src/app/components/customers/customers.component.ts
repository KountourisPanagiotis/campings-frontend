import { CustomersService } from '../../services/customers/customers.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICustomer , Customer} from '../../models/customer.model';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar'; // Popup message

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
  idToUpdate = -1;
  isUpdating = false;

  constructor(private customersService: CustomersService, private snackBar: MatSnackBar) { }

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
    if (!this.isUpdating){
      this.custCode = maxCustCode + 1;
    }
    this.isUpdating = false;
  }

  submitForm(): void {

    if (!this.isUpdating){
      const newCustomer: ICustomer = new Customer(
        this.custCode,
        this.custName,
        this.custSurname,
        this.custPhone
      );
  
      // Check if the customer already exists
      const existingCustomer = this.customers.find(
        customer => customer.custName === newCustomer.custName
          && customer.custSurname === newCustomer.custSurname
          && customer.custPhone === newCustomer.custPhone
      );
  
      if (existingCustomer) {
        this.snackBar.open('Customer Already Exists', 'Close', { duration: 2000 });
        return; // Exit the function if customer already exists
      }
  
        // Check if custName contains only letters
      if (!/^[A-Za-z]+$/.test(newCustomer.custName)) {
        this.snackBar.open('Invalid Name Format', 'Close', { duration: 2000 });
        return; // Exit the function if name format is invalid
      }
  
      // Check if custSurname contains only letters
      if (!/^[A-Za-z]+$/.test(newCustomer.custSurname)) {
        this.snackBar.open('Invalid Surname Format', 'Close', { duration: 2000 });
        return; // Exit the function if surname format is invalid
      }
  
      // Check if custPhone contains only numbers, parentheses, plus sign, and minus sign
      if (!/^[\d()+\- ]+$/.test(newCustomer.custPhone)) {
        this.snackBar.open('Invalid Phone Format', 'Close', { duration: 2000 });
        return; // Exit the function if phone format is invalid
      }
  
  
      this.customersService.insertCustomer(newCustomer).subscribe(
        (data: ICustomer) => {
          console.log('Customer inserted successfully:', data);
          this.snackBar.open('Customer inserted successfully', 'Close', { duration: 2000 });
          this.loadCustomers();
        },
        (error: any) => {
          console.log('Error inserting customer:', error);
          this.snackBar.open('Error inserting customer', 'Close', { duration: 2000 });
        }
      );
    } else {
      const updatedCustomer: ICustomer = new Customer(
        this.custCode,
        this.custName,
        this.custSurname,
        this.custPhone
      );
    
      this.customersService.updateCustomer(updatedCustomer).subscribe(
        (data: ICustomer) => {
          console.log('Customer updated successfully:', data);
          this.snackBar.open('Customer updated successfully', 'Close', { duration: 2000 });
          this.loadCustomers(); // Reload the customer list after updating
        },
        (error: any) => {
          console.log('Error updating customer:', error);
          this.snackBar.open('Error updating customer', 'Close', { duration: 2000 });
        }
      );
    }
    
    
  }

  updateCustomer(customer: ICustomer): void {
    // Set the form fields with the selected customer data for updating
    this.isUpdating = true;
    this.custCode = customer.custCode;
    this.custName = customer.custName;
    this.custSurname = customer.custSurname;
    this.custPhone = customer.custPhone;
  
    
  }
  

  
  deleteCustomer(customer: ICustomer): void {
    // Perform the delete operation using the customer ID or any other identifier
    // Call the delete method from the customersService
    this.customersService.deleteCustomer(customer.custCode).subscribe(
      () => {
        console.log('Customer deleted successfully');
        this.snackBar.open('Customer deleted successfully', 'Close', { duration: 2000 });
        this.loadCustomers(); // Reload the customer list after deletion
      },
      (error: any) => {
        console.log('Error deleting customer:', error);
        this.snackBar.open('Error deleting customer', 'Close', { duration: 2000 });
      }
    );
  }
  
}
