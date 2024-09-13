import { Component, OnInit } from '@angular/core';
import { ModulesService } from "@app/core/services/modules.service";


@Component({
  selector: 'mk-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  constructor(
    public modulesService: ModulesService,
  ) {
  }

  ngOnInit() {
  }
}
