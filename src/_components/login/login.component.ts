import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';



@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
    loginFormGroup: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.loginFormGroup = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        //this.authenticationService.logout();

        // default to '/users/table'
        this.returnUrl = 'users/table';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginFormGroup.controls; }

    loginSubmitted() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginFormGroup.invalid) {
            return;
        }

        this.loading = true;
       /* this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    // this.router.navigate([this.returnUrl]);
                    console.log(this.returnUrl);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });*/
    }
}
