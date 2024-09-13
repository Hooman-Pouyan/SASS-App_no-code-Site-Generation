import {Component, Input, OnInit} from '@angular/core';
import {ProductSliderModel, ProductSliderType} from "@app/core/models/product.model";
import {ProductService} from "@app/core/services/product.service";
import {DragDropService} from "@app/core/services/drag-drop.service";

@Component({
  selector: 'products-packs-slider',
  templateUrl: './products-packs-slider.component.html',
  styleUrls: ['./products-packs-slider.component.scss']
})
export class ProductsPacksSliderComponent implements OnInit {

  productsSlider: {
    index: number,
    name: string,
    type: ProductSliderType,
    products?: ProductSliderModel[],
  }[] = [
    {
      index: 0,
      name: 'جدیدترین محصولات',
      type: ProductSliderType.latest,
    },
    {
      index: 1,
      name: 'پرفروش ترین ها',
      type: ProductSliderType.bestSellers,
    },
    {
      index: 2,
      name: 'پر بازديد ترين ها',
      type: ProductSliderType.mostVisited,
    },
    {
      index: 3,
      name: 'بیشترین تخفیفات',
      type: ProductSliderType.mostOffers,
    },
  ];
  activeSlider: {
    index: number,
    name: string,
    type: ProductSliderType,
    products?: ProductSliderModel[],
  } = this.productsSlider[0];
  @Input() theme: 'light' | 'dark' = "light";
  @Input() market: 'felor';

  constructor(
    private productService: ProductService,
    public dragDropService: DragDropService
  ) {
  }

  ngOnInit(): void {
    this.getProductSlider(this.activeSlider)
    // this.setProductSliders()
  }

  setProductSliders(): void {
    this.productsSlider.forEach(sliderSection => {
      this.productService.getProductLimitedSummary(sliderSection.type, 10).subscribe(products => {
        if (typeof products == 'object') {
          sliderSection.products = products;
        }
      })
    })
  }

  getProductSlider(sliderSection): void {
    if (!sliderSection.products) {
      this.productService.getProductLimitedSummary(sliderSection.type, 10).subscribe(products => {
        if (typeof products == 'object') {
          sliderSection.products = products;
        }
      })
    }
  }

}
