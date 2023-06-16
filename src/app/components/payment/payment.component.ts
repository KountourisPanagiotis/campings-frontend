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

    const existingPayment = this.payments.find(
      payment => payment.payCode === newPayment.payCode
    );

    if (existingPayment && this.idToUpdate === existingPayment.payCode) {
      this.paymentService.updatePayment(newPayment).subscribe(
        (data: IPayment) => {
          console.log('Payment updated successfully:', data);
          this.snackBar.open('Payment updated successfully', 'Close', { duration: 2000 });
          this.loadPayments();
          this.idToUpdate = -1;
          this.setPayCode();
          this.payMethod = '';
        },
        (error: any) => {
          console.log('Error updating payment:', error);
          this.snackBar.open('Error updating payment', 'Close', { duration: 2000 });
        }
      );
    } else if (!existingPayment) {
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
    } else {
      this.snackBar.open('Payment Already Exists', 'Close', { duration: 2000 });
    }
  }

  updatePayment(payment: IPayment): void {
    this.payCode = payment.payCode;
    this.payMethod = payment.payMethod;
    this.idToUpdate = payment.payCode;
  }

  deletePayment(payment: IPayment): void {
    this.paymentService.deletePayment(payment.payCode).subscribe(
      () => {
        console.log('Payment deleted successfully');
        this.snackBar.open('Payment deleted successfully', 'Close', { duration: 2000 });
        this.loadPayments();
      },
      (error: any) => {
        console.log('Error deleting payment:', error);
        this.snackBar.open('Error deleting payment', 'Close', { duration: 2000 });
      }
    );
  }
}
