import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // ✅ Import this
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material.module'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, MaterialModule], // ✅ Add RouterModule here
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onLogin() {
    this.auth.login({ email: this.email, password: this.password }).subscribe(token => {
      localStorage.setItem('token', token);
      this.router.navigate(['/employee-list']);
    });
  }
}
