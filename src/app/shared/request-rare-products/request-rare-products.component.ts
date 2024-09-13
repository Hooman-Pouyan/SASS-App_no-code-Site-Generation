import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { LandingService } from '@app/core/services/landing.service';
import {NotificationService} from "@app/core/services/notification.service";

@Component({
  selector: 'mk-request-rare-products',
  templateUrl: './request-rare-products.component.html',
  styleUrls: ['./request-rare-products.component.scss']
})
export class RequestRareProductsComponent implements OnInit {

  form: FormGroup;
  image: File;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RequestRareProductsComponent>,
    private landingService : LandingService,
  ) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      CUSTOMER_NAME: ['', [Validators.required]],
      PHONE: ['', [Validators.required, Validators.pattern('^(09)([0-9]{9})$')]],
      ADDRESS: ['', [Validators.required]],
      NAME: ['', [Validators.required]],
      DESCRIPTIPN: ['', [Validators.required]],
    });
  }

  submit(): void {
    this.landingService.AddRareProduct(this.form.value, this.image).subscribe(() => {
      this.closeDialog(true)
    })
  }

  closeDialog(event?): void {
    this.dialogRef.close(event)
  }

}
