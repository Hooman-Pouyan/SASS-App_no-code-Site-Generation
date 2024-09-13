import {Component, Input, OnInit} from '@angular/core';
import {DragDropService} from "@app/core/services/drag-drop.service";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {ModulesService} from "@app/core/services/modules.service";

@Component({
  selector: 'landing-video',
  templateUrl: './landing-video.component.html',
  styleUrls: ['./landing-video.component.scss']
})
export class LandingVideoComponent implements OnInit {

  showVideo: boolean = true

  constructor(
    public dragDropService: DragDropService,
    public dynamicMediaService: DynamicMediaService,
    public modulesService: ModulesService,
    private credentialsService: CredentialsService,
  ) {
  }

  ngOnInit(): void {
  }

  handleVideoErr(errorEvent: ErrorEvent) {
    if (errorEvent.type == 'error' && !this.credentialsService.isAdmin)
      this.showVideo = false
  }

}
