import { EmplacementService } from '../../services/emplacement/emplacement.service';
import { Component, OnInit } from '@angular/core';
import { IEmplacement, Emplacement } from '../../models/emplacement.model';
import { MatSnackBar } from '@angular/material/snack-bar'; // Popup message

@Component({
  selector: 'app-emplacement',
  templateUrl: './emplacement.component.html',
  styleUrls: ['./emplacement.component.css']
})
export class EmplacementComponent implements OnInit {
  emplacements: IEmplacement[] = [];
  campCode: string = '';
  empNo: number = 0;
  catCode: string = '';
  idToUpdate: string | null = null;

  constructor(private emplacementService: EmplacementService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadEmplacements();
  }

  loadEmplacements(): void {
    this.emplacementService.getAllEmplacements().subscribe(
      (data: IEmplacement[]) => {
        this.emplacements = data.reverse();
        this.setCampCode();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  setCampCode(): void {
    const maxCampCode = Math.max(...this.emplacements.map(empl => +empl.campCode));
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
    const newEmplacement: IEmplacement = new Emplacement(
      this.campCode,
      this.empNo,
      this.catCode
    );

    // Check if the emplacement already exists
    const existingEmplacement = this.emplacements.find(
      emplacement => emplacement.campCode === newEmplacement.campCode && emplacement.empNo === newEmplacement.empNo
    );

    if (existingEmplacement) {
      this.updateEmplacementRecord(newEmplacement);
    } else {
      this.insertEmplacementRecord(newEmplacement);
    }
  }

  insertEmplacementRecord(newEmplacement: IEmplacement): void {
    this.emplacementService.insertEmplacement(newEmplacement).subscribe(
      (data: IEmplacement) => {
        console.log('Emplacement inserted successfully:', data);
        this.snackBar.open('Emplacement inserted successfully', 'Close', { duration: 2000 });
        this.loadEmplacements();
        this.enableCampCodeField();
      },
      (error: any) => {
        console.log('Error inserting emplacement:', error);
        this.snackBar.open('Error inserting emplacement', 'Close', { duration: 2000 });
      }
    );
  }

  updateEmplacementRecord(updatedEmplacement: IEmplacement): void {
    this.emplacementService.updateEmplacement(updatedEmplacement).subscribe(
      (data: IEmplacement) => {
        console.log('Emplacement updated successfully:', data);
        this.snackBar.open('Emplacement updated successfully', 'Close', { duration: 2000 });
        this.loadEmplacements();
        this.enableCampCodeField();
      },
      (error: any) => {
        console.log('Error updating emplacement:', error);
        this.snackBar.open('Error updating emplacement', 'Close', { duration: 2000 });
      }
    );
  }

  updateEmplacement(emplacement: IEmplacement): void {
    // Set the form fields with the selected emplacement data for updating
    this.campCode = emplacement.campCode;
    this.empNo = emplacement.empNo;
    this.catCode = emplacement.catCode;
  
    // Disable the campCode input field
    this.disableCampCodeField();
    
    // Set the idToUpdate for comparison
    this.idToUpdate = `${emplacement.campCode}-${emplacement.empNo}`;
  }
  
  deleteEmplacement(emplacement: IEmplacement): void {
    // Perform the delete operation using the emplacement code and number or any other identifier
    // Call the delete method from the emplacementService
    this.emplacementService.deleteEmplacement(emplacement.campCode, emplacement.empNo).subscribe(
      () => {
        console.log('Emplacement deleted successfully');
        this.snackBar.open('Emplacement deleted successfully', 'Close', { duration: 2000 });
        this.loadEmplacements(); // Reload the emplacement list after deletion
      },
      (error: any) => {
        console.log('Error deleting emplacement:', error);
        this.snackBar.open('Error deleting emplacement', 'Close', { duration: 2000 });
      }
    );
  }
}
