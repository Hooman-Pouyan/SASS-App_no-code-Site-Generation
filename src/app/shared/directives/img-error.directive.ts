import {AfterViewInit, Directive, ElementRef, Input, OnInit} from '@angular/core';
import {ModulesService} from "@app/core/services/modules.service";
import {videoExtensions} from "@app/modules/global/global-variable";

@Directive({
  selector: '[imgError]',
})
export class ImgErrorDirective implements OnInit, AfterViewInit {

  @Input() src: string;

  constructor(
    private imageRef: ElementRef,
    private modulesService: ModulesService
  ) {
  }

  ngOnInit() {
    // this.imageRef.nativeElement.setAttribute('alt', '');
  }

  ngAfterViewInit(): void {
    const img = new Image();
    img.src = this.src;

    img.onload = () => {
      this.setImage(this.src)
    }

    img.onerror = () => {
      const fileExtension: string = this.src?.split(".").pop()
      if (videoExtensions.includes(fileExtension)) {
        this.setImage('assets/img/default/video-preview.png');
      }
      else if (this.src?.includes('product') && this.modulesService.isShahrema) {
        this.setImage('assets/img/default/product.png');
      }
    };

  }

  private setImage(src: string) {
    this.imageRef.nativeElement.setAttribute('src', src);
  }

}
