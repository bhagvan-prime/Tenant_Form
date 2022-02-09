import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-address-array',
  templateUrl: './address-array.component.html',
  styleUrls: ['./address-array.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=> AddressArrayComponent),
      multi:true
    },
    {
      provide:NG_VALIDATORS,
      useExisting:forwardRef(() => AddressArrayComponent),
      multi:true
    }
  ]
})
export class AddressArrayComponent implements OnInit,ControlValueAccessor {

  public addressFormArray:FormGroup;

  public subscriptions:Subscription[];

  public onTouched: () => void = () => {};
  public onChange: (value:any) => void = () => {};

  get value() {
    return this.addressFormArray.value;
  }

  set value(value:any ) {

    this.addressFormArray.setValue(value);
    this.onChange(value);
    this.onTouched();
  }
  constructor(private fb:FormBuilder) { 
    this.addressFormArray = this.fb.group({
      aFA: this.fb.array([])
    })

    this.subscriptions = [];

    this.subscriptions.push(
      this.addressFormArray.valueChanges
      .subscribe(value => {
        this.onChange(this.value);
        this.onTouched();
      })
    );
  }

  ngOnInit() {}

  writeValue(value: any) {
    if(value){
      this.addressFormArray.patchValue(value);
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    if (this.addressFormArray.valid) {
      return null;
    } else {
      return { addressFormArray: { valid: false } };
    }
  }

  get aFA(){
    return this.addressFormArray.controls["aFA"] as FormArray;
  }

  addaFA(){
    const aFAForm = this.fb.group({
      addressLine11:['', Validators.required],
      addressLine21:[''],
      landMark1:[''],
      city1:['', Validators.required],
      state1:['', Validators.required],
      country1:['', Validators.required],
      pinCode1:['', Validators.required]
    });

    this.aFA.push(aFAForm);
  }

  deleteaFA(i : number){
    this.aFA.removeAt(i);
  }

}
