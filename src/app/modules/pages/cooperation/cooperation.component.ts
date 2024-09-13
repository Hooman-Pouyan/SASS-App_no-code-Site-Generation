import {Component, OnInit} from '@angular/core';
import {DragDropService} from "@app/core/services/drag-drop.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {p2e} from "@app/modules/global/functions";
import {TicketService} from "@app/core/services/ticket.service";
import {NotificationService} from "@app/core/services/notification.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";

@Component({
  selector: 'cooperation',
  templateUrl: './cooperation.component.html',
  styleUrls: ['./cooperation.component.scss']
})
export class CooperationComponent implements OnInit {

  cooperationForm: FormGroup

  constructor(
    public dragDropService: DragDropService,
    private formBuilder: FormBuilder,
    private ticketService: TicketService,
    private notificationService: NotificationService,
    public storeSettingService: StoreSettingService
  ) {
  }

  ngOnInit(): void {
    this.cooperationForm = this.formBuilder.group({
      'NAME': ['', Validators.required],
      'PHONE': ['', Validators.required],
      'COMPANY_NAME': [''],
      'JOB': [''],
      'EMAIL': ['', Validators.email],
      'COOPERATION': [false],
      'TEXT': ['', Validators.required],
    })
  }

  saveChange() {
    this.cooperationForm.controls['PHONE'].setValue(p2e(this.cooperationForm.value.PHONE))
    this.notificationService.valid('درخواست شما، با موفقیت ثبت شد')
    this.ngOnInit();
    // this.ticketService.createTicket(this.cooperationForm.value).subscribe(
    //   () => {
    //     this.notificationService.valid('درخواست شما، با موفقیت ثبت شد')
    //     this.ngOnInit();
    //   }
    // )
  }

}
