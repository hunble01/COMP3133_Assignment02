import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { MaterialModule } from '../../material.module'; 

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {
  employee: any = {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    department: '',
    designation: '',
    salary: '',
    date_of_joining: '',        
    employee_photo: ''          
  };

  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empService: EmployeeService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.empService.getEmployeeById(id).subscribe((emp) => {
        this.employee = emp;
      });
    }
  }

  saveEmployee() {
    if (this.isEdit) {
      this.empService.updateEmployee(this.employee.id, this.employee).subscribe(() => {
        this.router.navigate(['/employee-list']);
      });
    } else {
      this.empService.addEmployee(this.employee).subscribe(() => {
        this.router.navigate(['/employee-list']);
      });
    }
  }
}
