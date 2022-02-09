import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  tenantForm!: FormGroup
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.tenantForm = this.formBuilder.group({
      personal: [null, Validators.required],
      contact: [null, Validators.required],
      address: [null, Validators.required],
      addressArray:[null, Validators.required]
    })
  }

  onSubmit(){
    console.log(this.tenantForm.value)
  }
  onReset(){
    this.tenantForm.reset();
  }

}
