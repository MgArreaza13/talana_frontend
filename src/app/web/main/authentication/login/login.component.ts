import { Component, OnInit } from '@angular/core';
import { Authentication } from 'src/app/shared/models/authentication';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public loginForm: FormGroup;
  public auth: Authentication = {};
  public submitted = false;
  public loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService,
    private lsService: LocalStorageService,
    private router: Router) { }

  ngOnInit() {
    // Validate token
    const token = this.lsService.getValue('token');
    if (token) {
      this.router.navigate(['/']);
    }

    // Build form
    this.loginForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
      ]],
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.ngxService.start();
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.ngxService.stop();
      return;
    }

    // Set object
    this.auth.username = this.loginForm.get('username').value;
    this.auth.password = this.loginForm.get('password').value;

    // Send request
    this.authService.login(this.auth).subscribe(
      (data: any) => {
        this.lsService.setValue('token',data.token);
        this.lsService.setValue('id', data.id);
        this.lsService.setValue('last_name',data.last_name);
        this.lsService.setValue('first_name', data.first_name);
        this.lsService.setValue('username', data.username);
        this.lsService.setValue('email', data.email);
        this.ngxService.stop();
        this.toastr.success('Bienvenido', 'login correcto');
        this.router.navigateByUrl('/')
      },
      err => {console.log(err); this.toastr.error('Error', err);this.ngxService.stop(); }
    );
  }

}
