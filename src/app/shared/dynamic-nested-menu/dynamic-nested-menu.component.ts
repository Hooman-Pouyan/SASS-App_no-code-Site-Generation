import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModulesService} from "@app/core/services/modules.service";

export interface NestedMenuModel {
  displayName: string;
  iconName?: string;
  route?: string;
  children?: NestedMenuModel[];
}

@Component({
  selector: 'dynamic-nested-menu',
  templateUrl: './dynamic-nested-menu.component.html',
  styleUrls: ['./dynamic-nested-menu.component.scss']
})
export class DynamicNestedMenuComponent implements OnInit {

  @Input() items: NestedMenuModel[];
  @ViewChild('childMenu') public childMenu;

  constructor(
    public modulesService: ModulesService
  ) { }

  ngOnInit(): void {
  }

}
