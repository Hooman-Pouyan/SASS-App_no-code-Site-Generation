import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "@app/core/services/category.service";
import {CategoryModel} from "@app/core/models/category.model";
import {ProductSliderModel} from "@app/core/models/product.model";
import {environment} from "@env/environment";

@Component({
  selector: 'choose-product',
  templateUrl: './choose-product.component.html',
  styleUrls: ['./choose-product.component.scss']
})
export class ChooseProductComponent implements OnInit {
  @Output() closeDialog: EventEmitter<number> = new EventEmitter<number>()


  imageUrl: string = environment.ADMIN_API_URL;
  products: ProductSliderModel[] = []


  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<ChooseProductComponent>,

  ) { }

  ngOnInit(): void {
    let test =this.dialogData
    this.getProductsByCategory()
    const number :number = 25
  }

  getProductsByCategory() {
    this.categoryService.getProductsByCategoryId(this.dialogData, 8).subscribe(products => {
      this.products = products?.DATA
    })
  }

  addCompare(ID){
    this.dialogRef.close(ID)
  }

}
