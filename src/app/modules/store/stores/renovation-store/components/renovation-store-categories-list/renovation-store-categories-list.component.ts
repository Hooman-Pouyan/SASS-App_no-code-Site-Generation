import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'renovation-store-categories-list',
  templateUrl: './renovation-store-categories-list.component.html',
  styleUrls: ['./renovation-store-categories-list.component.scss']
})
export class RenovationStoreCategoriesListComponent implements OnInit {

  @Input() mainCategory: string;
  @Input() categories: any[] = [];
  @Output() scrollTo: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  scroll(category_name: string) {
    this.scrollTo.emit(category_name)
  }

}
