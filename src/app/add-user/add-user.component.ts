import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {UserService} from '../service/user.service';
import {AlertService} from '../service/alert.service';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService,
              private alertService: AlertService) { }

  addForm: FormGroup;
  submitted = false;
  gender = [{id: 'Male', value: 'Male'},
  {id: 'Female', value: 'Female'},
  {id: 'Other', value: 'Other'}];
    URL_REGEXP = /^(http?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  ngOnInit() {

    this.addForm = this.formBuilder.group({
      id: [],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,15}$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,15}$')]],
      address: ['', [Validators.required, Validators.maxLength(45)]],
      dob: ['', [Validators.required]],
      socialmedia: ['', [Validators.required,
         Validators.pattern(this.URL_REGEXP)]],
      gender: ['', [Validators.required]],
      luckyno: ['', [Validators.required, Validators.max(9), Validators.min(0), Validators.maxLength(1)]]
    });

  }
  public isInvalid(field): boolean {
    if (field) {
      return (
        this.addForm.get(field).errors && (this.addForm.get(field).dirty || this.addForm.get(field).touched)
      );
    }
  }
  public isFieldEmpty(field): boolean {
    if (field) {
      return (
        this.addForm.get(field).errors && this.addForm.get(field).errors.required
      );
    }
  }
  public isIncorrectPattern(field): boolean {
    if (field) {
      return (
        this.addForm.get(field).errors && this.addForm.get(field).errors.pattern
      );
    }
  }
  public isForminvalid(): boolean {
    return this.addForm.invalid;
  }
  // convenience getter for easy access to form fields
  // get f() { return this.addForm.controls; }

  onSubmit() {
    this.submitted = true;
        // stop here if form is invalid
    if (!this.addForm.invalid) {
    this.userService.createUser(this.addForm.value)
      .subscribe( data => {
        this.alertService.success('Registration successful', true);
        this.router.navigate(['list-user']);
      },
      error => {
        this.alertService.error(error.error.message);
    });
  } else {
    return;
  }
}

}
