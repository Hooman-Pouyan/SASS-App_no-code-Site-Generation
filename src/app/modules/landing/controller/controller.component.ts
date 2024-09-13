import {Component, OnInit} from '@angular/core';
import {ModulesService} from "@app/core/services/modules.service";

@Component({
  selector: 'mk-controller',
  templateUrl: './controller.component.html',
})
export class ControllerComponent implements OnInit {

  expire_pop_up: boolean = false;

  constructor(
    public modulesService: ModulesService,
  ) {
  }

  ngOnInit() {
    this.expire_pop_up = this.checkPopUpShow()
  }

  checkPopUpShow(): boolean {
    if (localStorage.getItem('pop-expire')) {
      const now = new Date()
      let expire_time = new Date(localStorage.getItem('pop-expire'))
      return expire_time.getTime() < now.getTime();
    }
    return true
  }

}

