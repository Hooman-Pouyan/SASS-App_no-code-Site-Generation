import {Component, OnInit} from '@angular/core';
import {ModulesService} from "@app/core/services/modules.service";

@Component({
  selector: 'mk-factor-setting',
  templateUrl: './factor-setting.component.html',
  styleUrls: ['./factor-setting.component.scss']
})
export class FactorSettingComponent implements OnInit {


  constructor(
    public modulesService: ModulesService
  ) {
  }

  ngOnInit(): void {
  }

}
