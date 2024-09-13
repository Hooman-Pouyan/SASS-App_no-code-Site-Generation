import { Component, HostListener, OnInit } from '@angular/core';
import { environment } from "@env/environment";
import { ModulesService } from "@app/core/services/modules.service";
import { LandingService } from "@app/core/services/landing.service";
import { SwiperOptions } from 'swiper';
import { Pagination } from "swiper";
import { shuffle } from "../../../global/functions";
import { MatDialog } from '@angular/material/dialog';
import Swiper, {
  Autoplay,
} from "swiper/core";
import { ProjectsService } from 'src/app/core/services/projects.service';
import { CategoryService } from "@app/core/services/category.service";
import { CategoryModel } from "@app/core/models/category.model";
import { BannerType } from "@app/core/models/store.model";
import { StoreSettingService } from "@app/core/services/store-setting.service";
import { CredentialsService } from "@app/core/services/credentials.service";
import { UserService } from '@app/core/services/user.service';
import {_window} from "@app/modules/global/global-variable";
import {AppService} from "@app/core/services/app.service";


Swiper.use([
  Autoplay,
  Pagination
]);

interface beerSlider {
  BEFORE: string,
  AFTER: string,
  ID: number,
  DESCRIPTION: string,
  NAME: string
}

@Component({
  selector: 'landing-renovation',
  templateUrl: './landing-renovation.component.html',
  styleUrls: ['./landing-renovation.component.scss']
})
export class LandingRenovationComponent implements OnInit {

  adminImageUrlDevelop: string = environment.ADMIN_API_URL;
  pointsChanged: boolean = false;
  classFlag: boolean = true;

  categories: CategoryModel[] = []
  brands: any[] = [];
  comments: any[] = [];

  beerImage: beerSlider;
  beerSlider: beerSlider[] = [];
  beerImagesServices: beerSlider[] = [];

  name: string = "";
  username: string = ""
  avatar: string = ""
  email: string = ""
  userId: number;
  loading: boolean = true;

  config_customer_say: SwiperOptions = {
    direction: 'horizontal',
    allowTouchMove: true,
    slidesPerView: 4,
    pagination: {
      clickable: true
    },
    autoplay: {
      delay: 2000,
    },
    breakpoints: {
      1024: {
        slidesPerView: 4
      },
      500: {
        slidesPerView: 2
      },
      450: {
        slidesPerView: 2
      },
      425: {
        slidesPerView: 1
      },
      225: {
        slidesPerView: 1
      },
    },
  }
  config_beer: SwiperOptions = {
    direction: 'horizontal',
    allowTouchMove: true,
    pagination: {
      clickable: true
    },
    autoplay: {
      delay: 2000,
    },
    breakpoints: {
      1366: {
        slidesPerView: 6
      },
      1024: {
        slidesPerView: 5
      },
      500: {
        slidesPerView: 3
      },
      400: {
        slidesPerView: 2
      },
      300: {
        slidesPerView: 2
      }
    },
  }

  constructor(
    private projectsService: ProjectsService,
    private landingService: LandingService,
    private dialog: MatDialog,
    private categoryService: CategoryService,
    public userService: UserService,
    public modulesService: ModulesService,
    public storeSettingService: StoreSettingService,
    public credentialsService: CredentialsService,
    private appService: AppService
  ) {
  }

  ngOnInit(): void {
    this.getCategories()
    this.getBrandByStoreId();
    this.setBeerImages();
    this.getComments();
    this.setDataPage()
  }

  setDataPage() {
    this.loading = true;
    this.userService.getUserInformation().subscribe(
      userInfo => {
        if (userInfo.user_additional !== null) {
          this.userId = userInfo.user_additional.USER_ID;
          this.name = userInfo.NAME
          this.username = userInfo.USER_NAME
          this.avatar = userInfo.AVATAR
          this.email = userInfo.user_additional.EMAIL
        }
        this.loading = false;
      }
    );
  }


  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.classFlag = this.appService.muchScrolled < 220;
  }

  getCategories() {
    this.categoryService.getParentCategories().subscribe(res => {
      if (res) {
        this.categories = res;
      }
    });
  }

  getBrandByStoreId() {
    this.storeSettingService.getBanners(BannerType.brands).subscribe((brands: any[]) => {
      if (brands && brands.length) {
        this.brands = brands.map(el => {
          return `${environment.ADMIN_API_URL}/assets/img/settings/${el.IMAGE}`;
        })
        setInterval(() => this.pointsChanged = false, 2000)
        setInterval(() => this.update_Brands(), 4000)
      }
    });
  }

  update_Brands() {
    this.brands = shuffle(this.brands);
    this.pointsChanged = true;
  }

  getComments() {
    this.landingService.getApprovedComments().subscribe((res: any[]) => {
      if (res && res.length) {
        this.comments = res;
      }
    });
  }

  setBeerImages() {
    this.getRecentProjects();
    this.getCategoriesProjects()
  }

  getRecentProjects() {
    this.projectsService.getRecentProject().subscribe((res: any) => {
      if (res && res.DATA?.length) {
        this.beerSlider = res.DATA
        this.beerSlider.forEach(each => {
          const temp = each
          each.BEFORE = this.adminImageUrlDevelop + '/assets/img/renovation/projects/' + temp.BEFORE;
          each.AFTER = this.adminImageUrlDevelop + '/assets/img/renovation/projects/' + temp.AFTER;
        })
        this.beerImage = this.beerSlider[0];
      }
    });
  }

  getCategoriesProjects(): void {
    this.projectsService.getCategoriesProjects().subscribe((res: beerSlider[]) => {
      if (res?.length) {
        this.beerImagesServices = res
        this.beerImagesServices.forEach(each => {
          const temp = each
          each.BEFORE = this.adminImageUrlDevelop + '/assets/img/renovation/projects/' + temp.BEFORE;
          each.AFTER = this.adminImageUrlDevelop + '/assets/img/renovation/projects/' + temp.AFTER;
        })
      }
    });
  }


}
