import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=> AddressInfoComponent),
      multi:true
    },
    {
      provide:NG_VALIDATORS,
      useExisting:forwardRef(() => AddressInfoComponent),
      multi:true
    }
  ]
})
export class AddressInfoComponent implements ControlValueAccessor, OnInit {

  public addressForm:FormGroup;
  public subscriptions:Subscription[];

  public onTouched: () => void = () => {};
  public onChange: (value:any) => void = () => {};

  get value() {
    return this.addressForm.value;
  }

  set value(value:any ) {

    this.addressForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  constructor( private fb:FormBuilder) {
    this.addressForm = this.fb.group({
      addressLine1:['', Validators.required],
      addressLine2:[''],
      landMark:[''],
      city:['', Validators.required],
      state:['', Validators.required],
      country:['', Validators.required],
      pinCode:['', Validators.required]
    })

    this.subscriptions = [];

    this.subscriptions.push(
      this.addressForm.valueChanges
      .subscribe(value => {
        this.onChange(this.value);
        this.onTouched();
      })
    );
   }
  
  ngOnInit() {
  }

  writeValue(value: any) {
    if(value){
      this.addressForm.patchValue(value);
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    if (this.addressForm.valid) {
      return null;
    } else {
      return { addressForm: { valid: false } };
    }
  }


}
