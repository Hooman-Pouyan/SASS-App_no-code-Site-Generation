import { Component, OnInit } from '@angular/core';
import { inviteFriendsService } from '@app/core/services/invite-friends.service';
import { copyText } from '../../../../global/functions'

@Component({
  selector: 'app-invite-friends',
  templateUrl: './invite-friends.component.html',
  styleUrls: ['./invite-friends.component.scss']
})
export class InviteFriendsComponent implements OnInit {

  phoneNumber: number
  referralCode: string

  constructor(
    private inviteFriendsService: inviteFriendsService
  ) { }

  ngOnInit(): void {
    this.getRefCode();
  }

  getRefCode() {
    this.inviteFriendsService.getCode().subscribe(res => {
      this.referralCode = res.REFERRAL_CODE;
    })
  }

  sendRefCode(): void {
    this.inviteFriendsService.sendCode(this.phoneNumber,this.referralCode).subscribe(() => {
    })
  }

  copy(): void {
    copyText(this.referralCode)
  }
}
