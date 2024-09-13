import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserTicketRoutingModule} from './user-ticket-routing.module';
import {UserTicketComponent} from './user-ticket.component';
import {SharedModule} from "@app/shared/shared.module";
import {NewTicketComponent} from './new-ticket/new-ticket.component';
import {TicketsTimelineComponent} from './tickets-timeline/tickets-timeline.component';


@NgModule({
  declarations: [
    UserTicketComponent,
    NewTicketComponent,
    TicketsTimelineComponent
  ],
  imports: [
    CommonModule,
    UserTicketRoutingModule,
    SharedModule
  ]
})
export class UserTicketModule {
}
