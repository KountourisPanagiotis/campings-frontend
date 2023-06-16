import { StaffService } from '../../services/staff/staff.service';
import { Component, OnInit } from '@angular/core';
import { Staff, IStaff } from '../../models/staff.model';
import { MatSnackBar } from '@angular/material/snack-bar'; // Popup message

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  staffMembers: IStaff[] = [];
  staffNo: number = 0;
  staffName: string = '';
  staffSurname: string = '';
  isUpdating = false;

  constructor(private staffService: StaffService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadStaffMembers();
  }

  loadStaffMembers(): void {
    this.staffService.getAllStaff().subscribe(
      (data: IStaff[]) => {
        this.staffMembers = data.reverse();
        this.setStaffNo();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  setStaffNo(): void {
    const maxStaffNo = Math.max(...this.staffMembers.map(staff => staff.staffNo));
    this.staffNo = maxStaffNo + 1;
  }

  submitForm(): void {
    const newStaffMember: Staff = new Staff(
      this.staffNo,
      this.staffName,
      this.staffSurname
    );

    // Check if the staff member already exists
    const existingStaffMember = this.staffMembers.find(
      staff => staff.staffName === newStaffMember.staffName
        && staff.staffSurname === newStaffMember.staffSurname
    );

    if (existingStaffMember && !this.isUpdating) {
      this.snackBar.open('Staff Member Already Exists', 'Close', { duration: 2000 });
      return; // Exit the function if staff member already exists and not in update mode
    }

    // Check if staffName contains only letters
    if (!/^[A-Za-z]+$/.test(newStaffMember.staffName)) {
      this.snackBar.open('Invalid Name Format', 'Close', { duration: 2000 });
      return; // Exit the function if name format is invalid
    }

    // Check if staffSurname contains only letters
    if (!/^[A-Za-z]+$/.test(newStaffMember.staffSurname)) {
      this.snackBar.open('Invalid Surname Format', 'Close', { duration: 2000 });
      return; // Exit the function if surname format is invalid
    }

    if (this.isUpdating) {
      this.updateStaffMember(newStaffMember);
    } else {
      this.insertStaffMember(newStaffMember);
    }
  }

  insertStaffMember(newStaffMember: Staff): void {
    this.staffService.insertStaff(newStaffMember).subscribe(
      (data: IStaff) => {
        console.log('Staff member inserted successfully:', data);
        this.snackBar.open('Staff member inserted successfully', 'Close', { duration: 2000 });
        this.isUpdating = false;
        this.loadStaffMembers();
      },
      (error: any) => {
        console.log('Error inserting staff member:', error);
        this.snackBar.open('Error inserting staff member', 'Close', { duration: 2000 });
      }
    );
  }

  updateStaffMember(updatedStaffMember: Staff): void {
    this.staffService.updateStaff(updatedStaffMember).subscribe(
      (data: IStaff) => {
        console.log('Staff member updated successfully:', data);
        this.snackBar.open('Staff member updated successfully', 'Close', { duration: 2000 });
        this.isUpdating = false;
        this.loadStaffMembers();
      },
      (error: any) => {
        console.log('Error updating staff member:', error);
        this.snackBar.open('Error updating staff member', 'Close', { duration: 2000 });
      }
    );
  }

  updateStaff(staff: IStaff): void {
    // Set the form fields with the selected staff data for updating
    this.staffNo = staff.staffNo;
    this.staffName = staff.staffName;
    this.staffSurname = staff.staffSurname;
    this.isUpdating = true;
  }
  
  deleteStaff(staff: IStaff): void {
    // Perform the delete operation using the staff ID or any other identifier
    // Call the delete method from the staffService
    this.staffService.deleteStaff(staff.staffNo).subscribe(
      () => {
        console.log('Staff member deleted successfully');
        this.snackBar.open('Staff member deleted successfully', 'Close', { duration: 2000 });
        this.loadStaffMembers(); // Reload the staff list after deletion
      },
      (error: any) => {
        console.log('Error deleting staff member:', error);
        this.snackBar.open('Error deleting staff member', 'Close', { duration: 2000 });
      }
    );
  }
}
