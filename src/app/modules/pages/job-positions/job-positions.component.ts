import { Component, OnInit } from '@angular/core';
import {NgwWowService} from "ngx-wow";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";
import {jarallax} from "jarallax";

@Component({
  selector: 'job-positions',
  templateUrl: './job-positions.component.html',
  styleUrls: ['./job-positions.component.scss']
})
export class JobPositionsComponent implements OnInit {

  constructor(
    private wowService: NgwWowService,
    public dynamicMediaService: DynamicMediaService
  ) { }

  ngOnInit(): void {
  }


  navigateTo(value){
    console.log(value);
    // this.router.navigate(['../',value]);
  }



}
