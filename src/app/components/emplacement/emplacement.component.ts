import { Component, OnInit } from '@angular/core';
import { EmplacementService } from '../../services/emplacement/emplacement.service';
import { IEmplacement, Emplacement } from '../../models/emplacement.model';
import { CampingsService } from '../../services/campings/campings.service';

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

  constructor(private emplacementService: EmplacementService, private campingsService: CampingsService) {}

  ngOnInit(): void {
    this.loadEmplacements();
    this.loadCampCodes();
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

  submitForm(): void {
    const newEmplacement: IEmplacement = new Emplacement(
      this.selectedCampCode,
      this.empNo,
      this.selectedCatCode
    );

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
    this.emplacementService.deleteEmplacement(emplacement.campCode, emplacement.empNo).subscribe(
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
