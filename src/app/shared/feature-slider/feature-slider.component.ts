import {Component, Input, OnInit} from '@angular/core';
import { ModulesService } from '@app/core/services/modules.service';
import { SwiperOptions } from 'swiper';
import { MatDialog } from '@angular/material/dialog';
import { FeatureDialogComponent } from './components/feature-dialog/feature-dialog.component';
import { GeneralAttributeModel, GeneralAttributeType } from '@app/core/models/general-attribute.model';
import { LandingService } from '@app/core/services/landing.service';
import { environment } from '@env/environment';
import {DragDropService} from "@app/core/services/drag-drop.service";
@Component({
  selector: 'feature-slider',
  templateUrl: './feature-slider.component.html',
  styleUrls: ['./feature-slider.component.scss']
})
export class FeatureSliderComponent implements OnInit {

  @Input() showAsSlider = true;

  features: GeneralAttributeModel[]  =[]
  featuresSliderConfig: SwiperOptions = {
    autoplay: {
      delay: 2000,
      pauseOnMouseEnter: false,
      disableOnInteraction: false
    },
    loop: true,
    centeredSlides: true,
    breakpoints: {
      '300': {
        slidesPerView: 3.5,
        spaceBetween: 5,
        centeredSlides: true
      },
      '640': {
        slidesPerView: 4.5,
        spaceBetween: 5,
        centeredSlides: true
      },
      '768': {
        slidesPerView: 7,
        spaceBetween: 25
      },
      '1024': {
        slidesPerView: 7,
        spaceBetween: 30
      },
      '1280': {
        slidesPerView: 7,
        spaceBetween: 40
      }
    }
  };

  constructor(
    public modulesService: ModulesService,
    private dialog: MatDialog,
    private landingService: LandingService,
    public dragDropService: DragDropService
  ) {
  }

  ngOnInit(): void {
    this.getFeatures();
  }


  getFeatures(): void {
    this.landingService.getGeneralAttributes(GeneralAttributeType.attribute).subscribe(res => {
      this.features = res.map(el => {
        el.FILES = environment.ADMIN_API_URL + '/assets/img/content/' + el.FILES
        return el
      })
    })
  }

  openFeatureDialog(feature: GeneralAttributeModel): void {
    this.dialog.open(FeatureDialogComponent, {
      width: '600px',
      maxWidth: '95%',
      data: feature ? feature : undefined
    })
  }


}
