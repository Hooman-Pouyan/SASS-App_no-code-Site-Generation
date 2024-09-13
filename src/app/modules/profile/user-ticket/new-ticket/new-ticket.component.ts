import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "@app/core/services/user.service";
import {TicketService} from "@app/core/services/ticket.service";
import {NotificationService} from "@app/core/services/notification.service";

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.scss']
})
export class NewTicketComponent implements OnInit {

  @Input() ticketParentID: number = 0;
  @Input() ticketCatalogID: number = 0;
  @Output() fromSubmitted: EventEmitter<boolean> = new EventEmitter<boolean>();
  ticketForm: FormGroup;
  catalogs: {
    ID: number
    NAME: string
  }[] = [];
  ticketFile: File;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private ticketService: TicketService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.getCatalog();
    if (this.userService.user) {
      this.ticketForm.controls['UR_ID'].setValue(this.userService.user.user_roles[0].ID)
    } else {
      this.userService.getUserInformation().subscribe(userInfo => {
        this.userService.user = userInfo[0]
        this.ticketForm.controls['UR_ID'].setValue(this.userService.user.user_roles[0].ID)
      });
    }
  }

  createForm(): void {
    this.ticketForm = this.formBuilder.group({
      CATALOG_ID: ['', [Validators.required]],
      SUBJECT: ['', [Validators.required]],
      CONTENT: ['', [Validators.required]],
      UR_ID: ['', [Validators.required]],
      RESPONSE: [0, [Validators.required]],
      ADMIN_FLAG: [0]
    })

    if (this.ticketCatalogID) {
      this.ticketForm.controls['CATALOG_ID'].setValue(this.ticketCatalogID);
      this.ticketForm.controls['SUBJECT'].setValidators(null);
      this.ticketForm.updateValueAndValidity()
    }
  }

  uploadFile(event: File) {
    if (this.checkFileValidator(event)) {
      this.notificationService.valid('فایل ثبت شد')
      this.ticketFile = event
    } else {
      this.notificationService.error('فرمت فایل ورودی درست نیست!')
    }
  }

  checkFileValidator(file: File) {
    return !(
      !file.name.includes('.png') &&
      !file.name.includes('.jpg') &&
      !file.name.includes('.jpeg') &&
      !file.name.includes('.rar') &&
      !file.name.includes('.pdf')
    );
  }

  getCatalog() {
    this.ticketService.getCatalog().subscribe(
      (res: any[]) => {
        this.catalogs = res;
      }
    )
  }

  submitForm() {
    if (this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched()
      return
    }
    this.ticketService.addNewTicket(this.ticketForm.value, this.ticketParentID, this.ticketFile).subscribe(() => {
      this.notificationService.valid('تیکت با موفقیت ثبت شد')
      if (this.ticketParentID == 0) {
        this.router.navigate(['../../'])
      } else {
      this.fromSubmitted.emit(true)
      }
    })
  }

}
