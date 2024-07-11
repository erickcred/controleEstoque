import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { IAuthUserRequest } from 'src/app/Models/Interfaces/Auth/IAuthUserRequest';
import { ISiginUserRequest } from 'src/app/Models/Interfaces/User/ISiginUserRequest';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject();

  loginPassIsVisible = false;
  siginPassIsVisible = false;

  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['erick@teste.com', Validators.required],
    password: ['mudar12@', Validators.required]
  });

  siginForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
  }

  onSubimitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as IAuthUserRequest)
      .pipe( takeUntil(this.destroy$) )
      .subscribe({
        next: (response) => {
          if (response) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `Seja bem vindo, ${response?.name}`,
              life: 5000,
            });
            this.cookieService.set("token", response?.token);
            this.loginForm.reset();
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error?.error.error,
            life: 5000,
          });
        }
      });
      console.log(this.loginForm.value)
    }
  }

  onSubimitSiginFormForm(): void {
    if (this.siginForm.value && this.siginForm.valid) {
      this.userService.singinUser(this.siginForm.value as ISiginUserRequest)
      .pipe( takeUntil(this.destroy$) )
      .subscribe({
        next: (response) => {
          if (response) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `Cadastro realizado!`,
              life: 5000,
            });
            this.siginForm.reset();
            this.loginCard = true;
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error?.error.error,
            life: 5000,
          });
        }
      })
      console.log(this.siginForm.value)
    }
  }

  showLoginPassword(): void {
    this.loginPassIsVisible = !this.loginPassIsVisible;
  }

  showSiginPassword(): void {
    this.siginPassIsVisible = !this.siginPassIsVisible;
  }

  navigationLoginSigin(): void {
    this.loginCard = !this.loginCard;
    if (this.loginCard)
      this.loginForm.reset();
    else
      this.siginForm.reset();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
