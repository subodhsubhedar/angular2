import { ContactResolve } from './services/contact.resolve';
import { ContactComponent } from './components/contact.component';
import { LoginService } from './services/login.service';
import { AlwaysAuthGuardService } from './services/alwaysauthguard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MyAppRouting } from './app.routing';
import { ProfileComponent } from './components/profile.component';
import { LoginComponent } from './components/login.component';
import { HttpModule } from '@angular/http';
import { ContactsService } from './services/contacts.service';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, ProfileComponent, ContactComponent
  ],
  imports: [
    BrowserModule, MyAppRouting, HttpModule
  ],
  providers: [AlwaysAuthGuardService, LoginService, ContactsService, ContactResolve],
  bootstrap: [AppComponent]
})
export class AppModule { }
 