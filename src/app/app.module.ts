import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertComponent } from './_directives';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListUserComponent } from './list-user/list-user.component';
// import {routing} from './app.routing';
import {AuthService} from './service/auth.service';
import {ReactiveFormsModule} from '@angular/forms';
import {UserService} from './service/user.service';
import {AlertService} from './service/alert.service';
import { fakeBackendProvider } from './_helpers';
import { from } from 'rxjs';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [AuthService, UserService, AlertService,
     fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
