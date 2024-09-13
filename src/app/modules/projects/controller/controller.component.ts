import { Component, OnInit } from '@angular/core';
import { ModulesService } from 'src/app/core/services/modules.service';

@Component({
  selector: 'mk-controller',
  templateUrl: './controller.component.html'
})
export class ControllerComponent implements OnInit {

  constructor(
    public modulesService: ModulesService
  ) { }

  ngOnInit(): void {

  }

}
