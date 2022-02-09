import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { AddressInfoComponent } from './components/address-info/address-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressArrayComponent } from './components/address-array/address-array.component';

@NgModule({
  declarations: [
    AppComponent,
    WrapperComponent,
    PersonalInfoComponent,
    ContactInfoComponent,
    AddressInfoComponent,
    AddressArrayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
