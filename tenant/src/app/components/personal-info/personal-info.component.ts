import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=> PersonalInfoComponent),
      multi:true
    },
    {
      provide:NG_VALIDATORS,
      useExisting:forwardRef(() => PersonalInfoComponent),
      multi:true
    }
  ]
})
export class PersonalInfoComponent implements OnInit, ControlValueAccessor {

  public personalForm:FormGroup;
  public subscriptions:Subscription[];

  public onTouched: () => void = () => {};
  public onChange: (value:any) => void = () => {};

  get value() {
    return this.personalForm.value;
  }

  set value(value:any ) {
    this.personalForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  constructor( private fb:FormBuilder) { 
    this.personalForm = this.fb.group({
      firstName : new FormControl(''),
      lastName : new FormControl(''),
      skills : this.fb.array([])
    });

    this.subscriptions = [];

    this.subscriptions.push(
      this.personalForm.valueChanges
      .subscribe(value => {
        this.onChange(this.value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void { }

  writeValue(value:any) {
    if (value) {
      this.personalForm.patchValue(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(_: FormControl) {

    if (this.personalForm.valid) {
      return null;
    } else {
      return { personalForm: { valid: false } };
    }
  }

  get skills(){
    return this.personalForm.controls['skills'] as FormArray;
  }

   addSkill() {
     this.skills.push(new FormControl());
     this.skills.updateValueAndValidity();
   }

  deleteSkill(i: number) {
    this.skills.removeAt(i);
    this.skills.updateValueAndValidity();
  }

}
