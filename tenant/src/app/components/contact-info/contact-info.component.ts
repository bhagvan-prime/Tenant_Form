import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=> ContactInfoComponent),
      multi:true
    },
    {
      provide:NG_VALIDATORS,
      useExisting:forwardRef(() => ContactInfoComponent),
      multi:true
    }
  ]
})
export class ContactInfoComponent implements ControlValueAccessor, OnInit {

  public contactForm:FormGroup;
  public subscriptions:Subscription[];

  public onTouched: () => void = () => {};
  public onChange: (value:any) => void = () => {};

  get value() {
    return this.contactForm.value;
  }

  set value(value:any ) {

    this.contactForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  constructor( private fb:FormBuilder) {
    this.contactForm = this.fb.group({
      email:['', Validators.required],
      phone:['', Validators.required]
    })

    this.subscriptions = [];

    this.subscriptions.push(
      this.contactForm.valueChanges
      .subscribe(value => {
        this.onChange(this.value);
        this.onTouched();
      })
    );

  }
  
  ngOnInit(): void {}

  writeValue(value: any) {
    if(value){
      this.contactForm.patchValue(value);
    }
  }
  
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    if (this.contactForm.valid) {
      return null;
    } else {
      return { contactForm: { valid: false } };
    }
  }

}
