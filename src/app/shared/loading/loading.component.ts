import {Component, OnInit, Input, ChangeDetectorRef, AfterContentChecked} from '@angular/core';
import {AppService} from "@app/core/services/app.service";

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, AfterContentChecked {
  serviceLoading: boolean = true;
  loading: boolean = true;
  @Input() manualLoading: boolean = false

  constructor(
    private appService: AppService,
    private changeDetector: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.appService.loading.subscribe(
      res => {
        this.loading = res;
      }
    );

    this.appService.manualLoading.subscribe(
      res => {
        this.serviceLoading = res;
      }
    );
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }


}
