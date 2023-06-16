import { CampingsService } from '../../services/campings/campings.service';
import { Component, OnInit } from '@angular/core';
import { ICamping, Camping } from '../../models/camping.model';
import { MatSnackBar } from '@angular/material/snack-bar'; // Popup message

@Component({
  selector: 'app-camping',
  templateUrl: './camping.component.html',
  styleUrls: ['./camping.component.css']
})
export class CampingComponent implements OnInit {
  campings: ICamping[] = [];
  campCode: string = '';
  campName: string = '';
  numOfEmp: number = 0;
  idToUpdate: string | null = null;

  constructor(private campingsService: CampingsService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadCampings();
  }

  loadCampings(): void {
    this.campingsService.getAllCampings().subscribe(
      (data: ICamping[]) => {
        this.campings = data.reverse();
        this.setCampCode();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  setCampCode(): void {
    const maxCampCode = Math.max(...this.campings.map(camping => +camping.campCode));
    this.campCode = (maxCampCode + 1).toString();
  }

  disableCampCodeField(): void {
    const campCodeField = document.getElementById('campCode') as HTMLInputElement;
    if (campCodeField) {
      campCodeField.disabled = true;
    }
  }

  enableCampCodeField(): void {
    const campCodeField = document.getElementById('campCode') as HTMLInputElement;
    if (campCodeField) {
      campCodeField.disabled = false;
    }
  }

  submitForm(): void {
    const newCamping: ICamping = new Camping(
      this.campCode,
      this.campName,
      this.numOfEmp
    );

    // Check if the camping already exists
    const existingCamping = this.campings.find(
      camping => camping.campCode === newCamping.campCode
    );

    if (existingCamping) {
      this.updateCampingRecord(newCamping);
    } else {
      this.insertCampingRecord(newCamping);
    }
  }

  insertCampingRecord(newCamping: ICamping): void {
    this.campingsService.insertCamping(newCamping).subscribe(
      (data: ICamping) => {
        console.log('Camping inserted successfully:', data);
        this.snackBar.open('Camping inserted successfully', 'Close', { duration: 2000 });
        this.loadCampings();
        this.enableCampCodeField();
      },
      (error: any) => {
        console.log('Error inserting camping:', error);
        this.snackBar.open('Error inserting camping', 'Close', { duration: 2000 });
      }
    );
  }

  updateCampingRecord(updatedCamping: ICamping): void {
    this.campingsService.updateCamping(updatedCamping).subscribe(
      (data: ICamping) => {
        console.log('Camping updated successfully:', data);
        this.snackBar.open('Camping updated successfully', 'Close', { duration: 2000 });
        this.loadCampings();
        this.enableCampCodeField();
      },
      (error: any) => {
        console.log('Error updating camping:', error);
        this.snackBar.open('Error updating camping', 'Close', { duration: 2000 });
      }
    );
  }

  updateCamping(camping: ICamping): void {
    // Set the form fields with the selected camping data for updating
    this.campCode = camping.campCode;
    this.campName = camping.campName;
    this.numOfEmp = camping.numOfEmp;
  
    // Disable the campCode input field
    this.disableCampCodeField();
    
    // Set the idToUpdate for comparison
    this.idToUpdate = camping.campCode.toString();
  }
  
  deleteCamping(camping: ICamping): void {
    // Perform the delete operation using the camping code or any other identifier
    // Call the delete method from the campingsService
    this.campingsService.deleteCamping(camping.campCode).subscribe(
      () => {
        console.log('Camping deleted successfully');
        this.snackBar.open('Camping deleted successfully', 'Close', { duration: 2000 });
        this.loadCampings(); // Reload the camping list after deletion
      },
      (error: any) => {
        console.log('Error deleting camping:', error);
        this.snackBar.open('Error deleting camping', 'Close', { duration: 2000 });
      }
    );
  }
}
