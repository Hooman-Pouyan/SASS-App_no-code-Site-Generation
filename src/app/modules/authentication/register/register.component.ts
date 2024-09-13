import { Component, OnInit } from '@angular/core';
import { ModulesService } from "../../../core/services/modules.service";
@Component({
  selector: 'mk-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

  constructor(
    public modulesService: ModulesService,
  ) {
  }

  ngOnInit(): void {
  }

}
