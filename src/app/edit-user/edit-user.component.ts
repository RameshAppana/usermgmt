import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {User} from '../model/user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AlertService} from '../service/alert.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService,
              private alertService: AlertService) { }
  gender = [{id: 'Male', value: 'Male'},
  {id: 'Female', value: 'Female'},
  {id: 'Other', value: 'Other'}];
    URL_REGEXP = /^(http?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  ngOnInit() {
    let userId = localStorage.getItem('editUserId');
    if (!userId) {
      this.alertService.error('Invalid action.');
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
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
    this.userService.getUserById(+userId)
      .subscribe( data => {
        this.editForm.setValue(data);
      });
  }
  public isInvalid(field): boolean {
    if (field) {
      return (
        this.editForm.get(field).errors && (this.editForm.get(field).dirty || this.editForm.get(field).touched)
      );
    }
  }
  public isFieldEmpty(field): boolean {
    if (field) {
      return (
        this.editForm.get(field).errors && this.editForm.get(field).errors.required
      );
    }
  }
  public isIncorrectPattern(field): boolean {
    if (field) {
      return (
        this.editForm.get(field).errors && this.editForm.get(field).errors.pattern
      );
    }
  }
  public isForminvalid(): boolean {
    return this.editForm.invalid;
  }
  onSubmit() {
    this.userService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Details Updated successful', true);
          this.router.navigate(['list-user']);
        },
        error => {
          this.alertService.error(error.error.message);
        });
  }

}
