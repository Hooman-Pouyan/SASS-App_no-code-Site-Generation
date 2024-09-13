import {AfterViewInit, Component, OnInit} from '@angular/core';
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {LandingService} from "@app/core/services/landing.service";
import {ModulesService} from "@app/core/services/modules.service";
import {DragDropService} from "@app/core/services/drag-drop.service";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";
import {jarallax} from "jarallax";

@Component({
  selector: 'app-section',
  templateUrl: './app-section.component.html',
  styleUrls: ['./app-section.component.scss']
})
export class AppSectionComponent implements OnInit, AfterViewInit {

  constructor(
    public storeSettingService: StoreSettingService,
    public modulesService: ModulesService,
    public dragDropService: DragDropService,
    public dynamicMediaService: DynamicMediaService,
  ) {
  }
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.jarallaxInit();
  }

  jarallaxInit(): void {
    //@ts-ignore
    jarallax(document.querySelectorAll('.jarallax'), {
      speed: 0.2
    });
    // return $.fn.jarallax to previously assigned value & give $().newJarallax the Jarallax functionality
    // @ts-ignore
    $?.fn?.newJarallax = $?.fn?.jarallax?.noConflict()
  }
}
