import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';

interface SignUpForm {
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
    FontAwesomeModule,
    RouterModule
  ],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignUpComponent {
  signupForm!: FormGroup<SignUpForm>;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  showPasswordConfirm = false;

  constructor(
    private loginService: LoginService,
    private toastService: ToastrService,
    private router: Router
  ){
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, { validators: this.passwordValidator });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordConfirmVisibility() {
    this.showPasswordConfirm = !this.showPasswordConfirm;
  }

  passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const group = control as FormGroup;
    const password = group.get('password')?.value;
    const confirmPassword = group.get('passwordConfirm')?.value;

    return password === confirmPassword ? null : { passwordsMismatch: true };
  };

  submit(){
    if (this.signupForm.invalid) {
      this.toastService.error("As senhas não coincidem ou há erros no formulário.");
      return;
    }

    this.loginService.register(this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.password).subscribe(() => {
      this.toastService.success("Usuário registrado com sucesso!");
      this.router.navigate(['/login']);
    }, (error) => {
      this.toastService.error("Erro no registro: " + error.message)
    })
  }
}
