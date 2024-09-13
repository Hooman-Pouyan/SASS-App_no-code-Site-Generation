import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserTicketComponent} from "./user-ticket.component";
import {TicketsTimelineComponent} from "./tickets-timeline/tickets-timeline.component";
import {NewTicketComponent} from "./new-ticket/new-ticket.component";

const routes: Routes = [
  {
    path: '',
    component: UserTicketComponent
  },
  {
    path: 'timeline/:id',
    component: TicketsTimelineComponent
  },
  {
    path: 'new/:id',
    component: NewTicketComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTicketRoutingModule { }
