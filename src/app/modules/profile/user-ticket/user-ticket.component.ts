import { Component, OnInit } from '@angular/core';
import {TicketModel} from "@app/core/models/ticket.model";
import {TicketService} from "@app/core/services/ticket.service";
import {UserService} from "@app/core/services/user.service";

@Component({
  selector: 'app-user-ticket',
  templateUrl: './user-ticket.component.html',
  styleUrls: ['./user-ticket.component.scss']
})
export class UserTicketComponent implements OnInit {

  tickets: TicketModel[] = [];
  displayedColumns: string[] = ['no', 'section' ,'subject', 'date', 'advance'];


  constructor(
    private userService: UserService,
    private ticketService: TicketService
  ) { }

  ngOnInit(): void {
    this.getTickets()
  }

  getTickets(): void {
    if (this.userService.user) {
      this.ticketService.getMainTickets(this.userService.user.user_roles[0].ID).subscribe((res: any[]) => {
        this.tickets = res
      })
    } else {
      this.userService.getUserInformation().subscribe(userInfo => {
        this.userService.user = userInfo[0]
        this.ticketService.getMainTickets(this.userService.user.user_roles[0].ID).subscribe((res: any[]) => {
          this.tickets = res
        })
      });
    }
  }

}
