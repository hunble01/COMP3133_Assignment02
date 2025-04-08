import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EmployeeService } from '../../services/employee.service';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatSnackBarModule, MatToolbarModule],
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];

  constructor(
    private empService: EmployeeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.empService.getEmployees().subscribe({
      next: (data) => {
        console.log('✅ Employees fetched:', data);
        this.employees = data;
      },
      error: (err) => {
        console.error('❌ Failed to fetch employees:', err);
        this.snackBar.open('Failed to load employees', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  logout() {
    localStorage.removeItem('token'); // or sessionStorage.removeItem if you're using that
    this.router.navigate(['/']);
  }
  

  viewEmployee(id: string) {
    this.router.navigate(['/employee-detail', id]);
  }

  editEmployee(id: string) {
    this.router.navigate(['/employee-form', id]);
  }

  addEmployee() {
    this.router.navigate(['/employee-form']);
  }
  

  deleteEmployee(id: string) {
    this.empService.deleteEmployee(id).subscribe({
      next: () => {
        this.snackBar.open('Employee deleted', 'Close', { duration: 2000 });
  
        // Delay just a little bit to allow the backend to finish
        setTimeout(() => this.loadEmployees(), 200); 
      },
      error: () => {
        this.snackBar.open('Failed to delete employee', 'Close', {
          duration: 3000,
        });
      }
    });
  }
  
}
