import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { ICategory, Category } from '../../models/category.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: ICategory[] = [];
  catCode: string = '';
  areaM2: number = 0;
  unitCost: number = 0;
  idToUpdate = -1;

  constructor(private categoryService: CategoryService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (data: ICategory[]) => {
        this.categories = data.reverse();
        this.setCatCode();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  setCatCode(): void {
    const maxCatCodeChar = this.categories.reduce((maxChar: string, category: ICategory) => {
      if (category.catCode > maxChar) {
        return category.catCode;
      }
      return maxChar;
    }, 'A'); // Start with 'A' as the initial value

    const nextCharCode = maxCatCodeChar.charCodeAt(0) + 1; // Get the ASCII code of the character and increment by 1
    this.catCode = String.fromCharCode(nextCharCode); // Convert the ASCII code back to character
  }

  submitForm(): void {
    const newCategory: ICategory = new Category(
      this.catCode,
      this.areaM2,
      this.unitCost
    );

    const existingCategory = this.categories.find(
      category => category.catCode === newCategory.catCode
    );

    if (existingCategory) {
      this.snackBar.open('Category Already Exists', 'Close', { duration: 2000 });
      return;
    }

    this.categoryService.insertCategory(newCategory).subscribe(
      (data: ICategory) => {
        console.log('Category inserted successfully:', data);
        this.snackBar.open('Category inserted successfully', 'Close', { duration: 2000 });
        this.loadCategories();
      },
      (error: any) => {
        console.log('Error inserting category:', error);
        this.snackBar.open('Error inserting category', 'Close', { duration: 2000 });
      }
    );
  }

  updateCategory(category: ICategory): void {
    this.catCode = category.catCode;
    this.areaM2 = category.areaM2;
    this.unitCost = category.unitCost;
  }

  deleteCategory(category: ICategory): void {
    this.categoryService.deleteCategory(category.catCode).subscribe(
      () => {
        console.log('Category deleted successfully');
        this.snackBar.open('Category deleted successfully', 'Close', { duration: 2000 });
        this.loadCategories();
      },
      (error: any) => {
        console.log('Error deleting category:', error);
        this.snackBar.open('Error deleting category', 'Close', { duration: 2000 });
      }
    );
  }
}
