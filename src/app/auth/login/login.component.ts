import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextErrorComponent } from "../text-error/text-error.components";
import { emailValidator } from '../email.validator';

interface LoginForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, TextErrorComponent],
})
export class LoginComponent {
  public errorMessage: string = '';
  public loginForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password }: LoginForm = this.loginForm.value
      this.authService.login(email, password);
    }
  }
}
