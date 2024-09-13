import { Component, OnInit } from '@angular/core';
import {StoreSettingService} from "@app/core/services/store-setting.service";

@Component({
  selector: 'mk-frequently-asked-questions',
  templateUrl: './frequently-asked-questions.component.html',
  styleUrls: ['./frequently-asked-questions.component.scss']
})
export class FrequentlyAskedQuestionsComponent implements OnInit {

  constructor(
    public storeSettingService: StoreSettingService
  ) { }

  ngOnInit() {
  }

}
