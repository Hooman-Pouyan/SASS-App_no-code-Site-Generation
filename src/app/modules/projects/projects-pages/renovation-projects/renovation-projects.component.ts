import { Component, HostListener, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/core/services/projects.service';
import { environment } from 'src/environments/environment';
import { MatSelectionListChange } from "@angular/material/list/selection-list";
import {CategoryService} from "@app/core/services/category.service";
import {_window} from "@app/modules/global/global-variable";
import {AppService} from "@app/core/services/app.service";


@Component({
  selector: 'renovation-projects',
  templateUrl: './renovation-projects.component.html',
  styleUrls: ['./renovation-projects.component.scss']
})
export class RenovationProjectsComponent implements OnInit {

  adminImageUrlDevelop: string = environment.ADMIN_API_URL;
  paginationConfig: any = {
    currentPage: 1,
    itemsPerPage: 10
  }

  projects: any[] = []
  categories: any[] = []
  selectedCategories: any[] = []

  headerPosition: 'relative' | 'fixed'


  constructor(
    private projectService: ProjectsService,
    private categoryService: CategoryService,
    private appService: AppService
  ) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.getProjects();
  }

  @HostListener('window:scroll')
  onScroll() {
    if (this.appService.muchScrolled > 1) {
      this.headerPosition = "fixed"
    } else {
      this.headerPosition = "relative"
    }
  }


  getProjects(_page = 1) {
    this.projectService.getRecentProject(
      _page,
      this.paginationConfig.itemsPerPage,
      this.selectedCategories
    ).subscribe(
      (res: any) => {
        if (res && res.DATA) {
          this.projects = res.DATA;
          this.projects.forEach(each => {
            each.BEFORE = this.adminImageUrlDevelop + '/assets/img/renovation/projects/' + each.BEFORE;
            each.AFTER = this.adminImageUrlDevelop + '/assets/img/renovation/projects/' + each.AFTER;
          })
          this.paginationConfig.totalItems = res.PAGINATION.TOTAL_COUNT
          this.scrollToTop();
        }
      })
  }

  getCategories() {
    this.categoryService.getParentCategories().subscribe(res => {
      if (res) {
        this.categories = res;
      }
    });
  }

  filterByCategory(event: MatSelectionListChange) {
    this.selectedCategories = event.source._value.filter(Boolean)
      this.getProjects()
  }

  checkAll(list: any) {
    if (this.selectedCategories.length) {
      list.deselectAll()
      this.selectedCategories.length = 0
    } else {
      list.selectAll()
      this.selectedCategories = list._value
    }
    this.getProjects()
  }

  scrollToTop() {
    _window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

}
