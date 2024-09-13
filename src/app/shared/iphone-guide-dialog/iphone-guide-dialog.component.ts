import {Component, OnInit, Inject} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {environment} from "src/environments/environment";
import {StoreSettingService} from "@app/core/services/store-setting.service";


@Component({
  selector: 'mk-iphone-guide-dialog',
  templateUrl: './iphone-guide-dialog.component.html',
  styleUrls: ['./iphone-guide-dialog.component.scss']
})

export class IphoneGuideDialogComponent implements OnInit {

  imageUrl: string  = environment.ADMIN_API_URL;

  constructor(
    public dialogRef: MatDialogRef<IphoneGuideDialogComponent>,
    public storeSettingService: StoreSettingService,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close(true);
  }
}
