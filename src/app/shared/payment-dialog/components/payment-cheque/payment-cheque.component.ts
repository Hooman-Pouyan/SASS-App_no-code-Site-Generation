import {Component, Inject, OnInit} from '@angular/core';
import {BANKS} from "@app/modules/global/global-variable";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'mk-payment-cheque',
  templateUrl: './payment-cheque.component.html',
  styleUrls: ['./payment-cheque.component.scss']
})
export class PaymentChequeComponent implements OnInit {

  form: FormGroup;
  now: Date = new Date();
  banks: string[] = BANKS;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PaymentChequeComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      NUMBER: ['', Validators.required],
      BANK: ['', [Validators.required, Validators.pattern(/^[-0-9آ-ی ءچ]+$/)] ],
      OWNER: ['', [Validators.required, Validators.pattern(/^[-0-9آ-ی ءچ]+$/)] ],
      DATE: ['', Validators.required],
      SAYAD_ID: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]]
    })
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close(this.form.value);
  }

}
