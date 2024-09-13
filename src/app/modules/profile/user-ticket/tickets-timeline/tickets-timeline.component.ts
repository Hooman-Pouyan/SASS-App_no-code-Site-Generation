import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TicketModel} from "@app/core/models/ticket.model";
import {environment} from "@env/environment";
import {UserService} from "@app/core/services/user.service";
import {TicketService} from "@app/core/services/ticket.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";

@Component({
  selector: 'app-tickets-timeline',
  templateUrl: './tickets-timeline.component.html',
  styleUrls: ['./tickets-timeline.component.scss']
})
export class TicketsTimelineComponent implements OnInit {

  tickets: TicketModel[] = [];
  ticketFileUrl: string = environment.ADMIN_API_URL + '/assets/img/content/'
  parentTicket = {} as {
    name: string,
    id: number,
    catalogID: number
  }

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private ticketService: TicketService,
    public storeSettingService: StoreSettingService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.parentTicket.id = params.id
      this.getTickets()
      this.activatedRoute.queryParams.subscribe(qp => {
        this.parentTicket.name = qp.name
        this.parentTicket.catalogID = qp.catalogID
      })
    })
  }

  getTickets(): void {
    if (this.userService.user) {
      this.ticketService.getChildTickets(this.userService.user.user_roles[0].ID, this.parentTicket.id).subscribe((res: any[]) => {
        this.tickets = res
      })
    } else {
      this.userService.getUserInformation().subscribe(userInfo => {
        this.userService.user = userInfo[0]
        this.ticketService.getChildTickets(this.userService.user.user_roles[0].ID, this.parentTicket.id).subscribe((res: any[]) => {
          this.tickets = res
        })
      });
    }
  }

}
