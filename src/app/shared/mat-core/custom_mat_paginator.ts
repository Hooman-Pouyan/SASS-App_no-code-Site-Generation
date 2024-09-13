import {Injectable} from '@angular/core';
import {MatPaginatorIntl} from "@angular/material/paginator";
import {ModulesService} from "@app/core/services/modules.service";

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {

  constructor(
    private modulesService: ModulesService
  ) {
    super();
    this.getAndInitTranslations();
  }

  getAndInitTranslations() {
    if ( this.modulesService.lang == 'fa') {
      this.itemsPerPageLabel = "در هر صفحه";
      this.nextPageLabel = "صفحه بعد";
      this.previousPageLabel = "صفحه قبل";
      this.firstPageLabel = 'صفحه اول';
      this.lastPageLabel = 'صفحه آخر';
    }
    this.changes.next();
  }

  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} / ${length}`;
  }
}
