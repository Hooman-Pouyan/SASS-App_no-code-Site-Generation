import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {StoreSettingService} from "@app/core/services/store-setting.service";

@Component({
  selector: 'mk-laws',
  templateUrl: './laws.component.html',
  styleUrls: ['./laws.component.scss']
})
export class LawsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LawsComponent>,
    public storeSettingService: StoreSettingService,
  ) {
  }

  ngOnInit() {
  }

}
