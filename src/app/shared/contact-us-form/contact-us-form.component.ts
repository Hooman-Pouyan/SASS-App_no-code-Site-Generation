import {Component, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "@app/core/services/user.service";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";
import {DragDropService} from "@app/core/services/drag-drop.service";

@Component({
  selector: 'contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.scss']
})
export class ContactUsFormComponent implements OnInit {

  @Input() white: boolean = false;
  contactUs = new FormGroup({
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
    ]),
  });

  constructor(
    private userService: UserService,
    public dragDropService: DragDropService
  ) {
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.contactUs.invalid) {
      this.contactUs.markAllAsTouched();
      return
    }
    this.userService.consult(this.contactUs.controls['phoneNumber'].value.toString()).subscribe(() => {
    })
  }

}
