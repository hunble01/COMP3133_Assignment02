import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'employee-list', component: EmployeeListComponent },
  { path: 'employee-form', component: EmployeeFormComponent }, // For adding new
  { path: 'employee-form/:id', component: EmployeeFormComponent }, // For editing
  { path: 'employee-detail/:id', component: EmployeeDetailComponent }, // For viewing
];
