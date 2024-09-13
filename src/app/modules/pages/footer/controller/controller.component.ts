import {Component, Input, OnInit} from '@angular/core';
import {ModulesService} from "@app/core/services/modules.service";

@Component({
  selector: 'app-footer',
  templateUrl: './controller.component.html',
})
export class ControllerComponent implements OnInit {

  @Input() backgroundColor: string = '#333333';

  constructor(
    public modulesService: ModulesService
  ) { }

  ngOnInit(): void {
  }

}
