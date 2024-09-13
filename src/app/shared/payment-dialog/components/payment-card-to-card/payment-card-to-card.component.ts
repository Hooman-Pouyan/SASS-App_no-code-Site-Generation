import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'mk-payment-card-to-card',
  templateUrl: './payment-card-to-card.component.html',
  styleUrls: ['./payment-card-to-card.component.scss']
})
export class PaymentCardToCardComponent implements OnInit {

  form: FormGroup;
  now: Date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PaymentCardToCardComponent>,
    @Inject(MAT_DIALOG_DATA) public isPOS: boolean,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      CardMaskPan: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      TraceNo: ['', Validators.required],
      DATE: ['', Validators.required],
    })

    if (this.isPOS) {
      this.form.controls['CardMaskPan'].setValue(1111111111111111)
    }

  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.form.value);
  }

}
