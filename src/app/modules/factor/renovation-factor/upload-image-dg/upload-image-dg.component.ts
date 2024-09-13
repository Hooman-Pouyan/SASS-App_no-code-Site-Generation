import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { RenovationService } from '@app/core/services/renovation.service';
import { NotificationService } from '@app/core/services/notification.service';

@Component({
  selector: 'mk-upload-image-dg',
  templateUrl: './upload-image-dg.component.html',
  styleUrls: ['./upload-image-dg.component.scss']
})

export class UploadImageDgComponent implements OnInit {
  loading: boolean = false; // Flag variable
  url: string = environment.API_URL;
  adminUrl: string = environment.ADMIN_API_URL;
  filePath: any = null;
  error: string = "";
  @ViewChild("file") file;
  beforeFile: File;
  categoryId: number = null;
  imageData: any = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData,
    private renovationService : RenovationService,
    private translate: TranslateService,
    private notificationService : NotificationService
    )
    { }
  ngOnInit() {
    this.categoryId = this.dialogData?.product?.PRODUCT_CATEGORY;
    this.getImage();
  }

  getImage() {
    this.renovationService.getOrderCustomerImage(this.categoryId).subscribe(res => {
      if (res && res.length > 0) {
        this.imageData = res[res.length - 1];
        this.filePath = null;
      }
    })
  }

  uploadImageClicked(event) {
    this.beforeFile = event.target.files[0];
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => this.filePath = reader.result;
    reader.readAsDataURL(file);
    this.imageData = null;
  }

  // OnClick of button Upload
  submit() {
    if (this.beforeFile === null) return;
    if (this.imageData !== null) return;

    if (this.checkValidatorImage(this.beforeFile)) {
      this.loading = true;

      this.renovationService.orderImageUpload(this.beforeFile, this.dialogData).subscribe(
        () => {
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    }
  }

  checkValidatorImage(file: any) {
    this.error = '';
    if (file.type !== 'image/png') {
      this.error = 'پسوند عکس باید png باشد';

      this.notificationService.error(this.error);
      return false;
    }
    else if (Math.round(file.size / 1024) > 512) {
      this.error = 'حجم عکس باید کمتر از 1024 در 512 پیکسل باشد';
      this.notificationService.error(this.error);
      return false;
    }
    else {
      return true;
    }
  }

  openBrowse() {
    this.file.nativeElement.click();
  }

}
