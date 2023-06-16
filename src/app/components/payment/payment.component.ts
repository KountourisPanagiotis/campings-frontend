import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment/payment.service';
import { IPayment, Payment } from '../../models/payment.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  payments: IPayment[] = [];
  payCode: number = 0;
  payMethod: string = '';
  idToUpdate = -1;

  constructor(private paymentService: PaymentService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.paymentService.getAllPayments().subscribe(
      (data: IPayment[]) => {
        this.payments = data.reverse();
        this.setPayCode();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  setPayCode(): void {
    const maxPayCode = Math.max(...this.payments.map(payment => payment.payCode));
    this.payCode = maxPayCode + 1;
  }

  submitForm(): void {
    const newPayment: IPayment = new Payment(
      this.payCode,
      this.payMethod
    );

    // Check if the payment already exists
    const existingPayment = this.payments.find(
      payment => payment.payMethod === newPayment.payMethod
    );

    if (existingPayment) {
      this.snackBar.open('Payment Already Exists', 'Close', { duration: 2000 });
      return; // Exit the function if payment already exists
    }

    this.paymentService.insertPayment(newPayment).subscribe(
      (data: IPayment) => {
        console.log('Payment inserted successfully:', data);
        this.snackBar.open('Payment inserted successfully', 'Close', { duration: 2000 });
        this.loadPayments();
      },
      (error: any) => {
        console.log('Error inserting payment:', error);
        this.snackBar.open('Error inserting payment', 'Close', { duration: 2000 });
      }
    );
  }

  updatePayment(payment: IPayment): void {
    // Set the form fields with the selected payment data for updating
    this.payCode = payment.payCode;
    this.payMethod = payment.payMethod;
  }

  deletePayment(payment: IPayment): void {
    // Perform the delete operation using the payment code or any other identifier
    // Call the delete method from the paymentService
    this.paymentService.deletePayment(payment.payCode).subscribe(
      () => {
        console.log('Payment deleted successfully');
        this.snackBar.open('Payment deleted successfully', 'Close', { duration: 2000 });
        this.loadPayments(); // Reload the payment list after deletion
      },
      (error: any) => {
        console.log('Error deleting payment:', error);
        this.snackBar.open('Error deleting payment', 'Close', { duration: 2000 });
      }
    );
  }
}
