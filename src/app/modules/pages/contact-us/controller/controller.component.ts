import { Component, OnInit } from '@angular/core';
import {ModulesService} from "@app/core/services/modules.service";

@Component({
  selector: 'contact-us-controller',
  templateUrl: './controller.component.html'
})
export class ControllerComponent implements OnInit {

  constructor(
    public modulesService: ModulesService
    ) { }

  ngOnInit(): void {
  }

}
