import { Component, OnInit } from '@angular/core';
import { ModulesService } from '@app/core/services/modules.service';
import { UserService } from '@app/core/services/user.service';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CityModel, ProvinceModel} from "@app/core/models/address.model";
import {ProvincesService} from "@app/core/services/provinces.service";
import {educations} from "@app/modules/global/global-variable";
import {BannerType} from "@app/core/models/store.model";
import {environment} from "@env/environment";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {ProfileComponent} from "@app/modules/profile/profile.component";
import {NotificationService} from "@app/core/services/notification.service";

@Component({
  selector: 'mk-user-club',
  templateUrl: './user-club.component.html',
  styleUrls: ['./user-club.component.scss'],
  providers: [ProfileComponent],
})
export class UserClubComponent implements OnInit {

  clubForm: FormGroup;
  provinces: ProvinceModel[] = [];
  cities: CityModel[] = [];
  educations: string[] = educations;
  clubBanner: string;
  genders = ['مرد', 'زن']

  constructor(
    private userService: UserService,
    public modulesService: ModulesService,
    private provinceService: ProvincesService,
    private formBuilder: FormBuilder,
    private storeSettingService: StoreSettingService,
    private profileComponent: ProfileComponent,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.createForm();
    this.getProvinces();
    this.getCLubBanner();
  }

  createForm(): void {
    this.clubForm = this.formBuilder.group({
      phoneNumber: [this.userService.user.USER_NAME],
      NAME: [this.userService.user.NAME],
      PROVINCE: [this.userService.user.user_additional.PROVINCE],
      CITY: [this.userService.user.user_additional.CITY],
      GENDER: [this.userService.user.user_additional.GENDER],
      EDUCATION: [this.userService.user.user_additional.EDUCATION],
      PASTIME: [this.userService.user.user_additional.PASTIME],
      BIRTH_DATE: [this.userService.user.user_additional.BIRTH_DATE],
    })
  }

  getProvinces(): void {
    this.provinceService.getAllProvinces().subscribe(provinces => {
      this.provinces = provinces
    })
  }

  getCities(provinceName: string): void {
    const province: number = +this.provinces.find(f => f.PROVINCE_NAME == provinceName).ID
    this.provinceService.getAllCityOfProvince(province).subscribe(cities => {
      this.cities = cities
    })
  }

  getCLubBanner(): void {
    this.storeSettingService.getBanners(BannerType.clubBanner).subscribe(res => {
      if (res && res.length) {
        this.clubBanner = environment.ADMIN_API_URL + '/assets/img/settings/' + res[0].IMAGE
      }
    })
  }

  submitForm(): void {
    this.clubForm.value.phoneNumber = undefined
    this.userService.getUserClubDetail(this.clubForm.value).subscribe(() => {
      this.profileComponent.setInfoUser()
      this.notificationService.valid('با موفقیت ثبت شد!')
    })
  }


}
