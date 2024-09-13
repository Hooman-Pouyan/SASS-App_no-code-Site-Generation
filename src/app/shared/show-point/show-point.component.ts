import { Component, OnInit } from '@angular/core';
import {ModulesService} from "@app/core/services/modules.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {UserService} from "@app/core/services/user.service";

@Component({
  selector: 'show-point',
  templateUrl: './show-point.component.html',
  styleUrls: ['./show-point.component.scss']
})
export class ShowPointComponent implements OnInit {

  constructor(
    public modulesService: ModulesService,
    public credentialsService: CredentialsService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }

}
