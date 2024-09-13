import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {environment} from "@env/environment";

@Component({
  selector: 'image-lazy',
  templateUrl: './image-lazy.component.html',
  styleUrls: ['./image-lazy.component.scss']
})
export class ImageLazyComponent implements OnInit {

  @ViewChild('img') img: ElementRef;
  @Input() src: string;
  @Input() alt: string = 'alternative';
  @Input() class: string;
  @Input() addClass: string;
  @Input() title: string = 'title';
  @Output() load: EventEmitter<boolean> = new EventEmitter<boolean>()
  defaultImage = 'assets/img/image-loader.svg';
  isShahrema: boolean = false

  width: number;
  height: number;

  constructor() {
  }

  ngOnInit(): void {
    this.checkIsShahrema();
  }

  onLoad(): void {
    this.width = (this.img.nativeElement as HTMLImageElement).naturalWidth
    this.height = (this.img.nativeElement as HTMLImageElement).naturalHeight
    this.load.emit(true)
  }

  checkIsShahrema() {
    if (environment.API_URL.includes('fr2fr') && this.src.includes('product')) {
      this.isShahrema = true
      this.defaultImage = 'assets/img/default/product.png';
    }
  }

}
