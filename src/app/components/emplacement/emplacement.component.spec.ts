import { EmplacementService } from '../../services/emplacement/emplacement.service';
import { CampingsService } from '../../services/campings/campings.service';
import { CategoryService } from '../../services/category/category.service';
import { Component, OnInit } from '@angular/core';
import { IEmplacement, Emplacement } from '../../models/emplacement.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-emplacement',
  templateUrl: './emplacement.component.html',
  styleUrls: ['./emplacement.component.css']
})
export class EmplacementComponent implements OnInit {
  emplacements: IEmplacement[] = [];
  selectedCampCode: string = '';
  empNo: number = 0;
  selectedCatCode: string = '';

  campCodes: string[] = []; // Array to store available campCodes
  catCodes: string[] = []; // Array to store available catCodes

  constructor(
    private emplacementService: EmplacementService,
    private campingsService: CampingsService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadEmplacements();
    this.loadCampCodes();
    this.loadCatCodes();
  }

  loadEmplacements(): void {
    this.emplacementService.getAllEmplacements().subscribe(
      (data: IEmplacement[]) => {
        this.emplacements = data.reverse();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  loadCampCodes(): void {
    this.campingsService.getAllCampings().subscribe(
      (data: ICamping[]) => {
        this.campCodes = data.map(camping => camping.campCode);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  loadCatCodes(): void {
    this.categoryService.getAllCategories().subscribe(
      (data: ICategory[]) => {
        this.catCodes = data.map(category => category.catCode);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  submitForm(): void {
    const newEmplacement: IEmplacement = new Emplacement(
      this.selectedCampCode,
      this.empNo,
      this.selectedCatCode
    );

    // Check if the emplacement already exists
    const existingEmplacement = this.emplacements.find(
      emplacement =>
        emplacement.campCode === newEmplacement.campCode &&
        emplacement.empNo === newEmplacement.empNo &&
        emplacement.catCode === newEmplacement.catCode
    );

    if (existingEmplacement) {
      this.snackBar.open('Emplacement Already Exists', 'Close', { duration: 2000 });
      return; // Exit the function if the emplacement already exists
    }

    this.emplacementService.insertEmplacement(newEmplacement).subscribe(
      (data: IEmplacement) => {
        console.log('Emplacement inserted successfully:', data);
        this.snackBar.open('Emplacement inserted successfully', 'Close', { duration: 2000 });
        this.loadEmplacements();
        this.selectedCampCode = '';
        this.empNo = 0;
        this.selectedCatCode = '';
      },
      (error: any) => {
        console.log('Error inserting emplacement:', error);
        this.snackBar.open('Error inserting emplacement', 'Close', { duration: 2000 });
      }
    );
  }

  deleteEmplacement(emplacement: IEmplacement): void {
    this.emplacementService.deleteEmplacement(emplacement.campCode, emplacement.empNo, emplacement.catCode).subscribe(
      () => {
        console.log('Emplacement deleted successfully');
        this.snackBar.open('Emplacement deleted successfully', 'Close', { duration: 2000 });
        this.loadEmplacements();
      },
      (error: any) => {
        console.log('Error deleting emplacement:', error);
        this.snackBar.open('Error deleting emplacement', 'Close', { duration: 2000 });
      }
    );
  }
}
