import { Component, OnInit } from '@angular/core';
import { EmplacementService } from '../../services/emplacement/emplacement.service';
import { IEmplacement, Emplacement } from '../../models/emplacement.model';
import { CampingsService } from '../../services/campings/campings.service';
import { CategoryService } from '../../services/category/category.service';
import { ICategory } from '../../models/category.model';
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

  campCodes: string[] = [];
  catCodes: string[] = [];

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
        this.emplacements = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  loadCampCodes(): void {
    this.campingsService.getAllCampings().subscribe(
      (data: any[]) => {
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
  
    if (this.empNo < 1) {
      this.snackBar.open('The emplacement number must be greater than 0', 'Close', { duration: 2000 });
      return;
    }
  
    const existingEmplacement = this.emplacements.find(
      emplacement =>
        emplacement.campCode === newEmplacement.campCode &&
        emplacement.empNo === newEmplacement.empNo &&
        emplacement.catCode === newEmplacement.catCode
    );
  
    if (existingEmplacement) {
      this.snackBar.open('The emplacement already exists', 'Close', { duration: 2000 });
      return;
    }
  
    this.emplacementService.insertEmplacement(newEmplacement).subscribe(
      (data: IEmplacement) => {
        console.log('Emplacement inserted successfully:', data);
        this.loadEmplacements();
      },
      (error: any) => {
        console.log('Error inserting emplacement:', error);
      }
    );
  }
  
  deleteEmplacement(emplacement: IEmplacement): void {
    this.emplacementService
      .deleteEmplacement(emplacement.campCode, emplacement.empNo)
      .subscribe(
        () => {
          console.log('Emplacement deleted successfully');
          this.loadEmplacements();
        },
        (error: any) => {
          console.log('Error deleting emplacement:', error);
        }
      );
  }
}
