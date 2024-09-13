import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {AddressModel, CityModel, ProvinceModel, SearchedAddressModel} from "@app/core/models/address.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProvincesService} from "@app/core/services/provinces.service";
import {ModulesService} from "@app/core/services/modules.service";
import {debounceTime, switchMap} from "rxjs/operators";
import * as L from 'leaflet';
import {AddressService} from "@app/core/services/address.service";
import {NotificationService} from "@app/core/services/notification.service";
import {geologyDistance, getCoords, p2e} from "@app/modules/global/functions";
import {StoreService} from "@app/core/services/store.service";


@Component({
  selector: 'mk-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.scss']
})
export class AddressDialogComponent implements OnInit, AfterViewInit {

  addressForm: FormGroup;
  provinces: ProvinceModel[] = []
  cities: CityModel[] = []
  searchedAddresses: SearchedAddressModel[] = []
  storeLat: number;
  storeLong: number;
  maxDistance: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public address: AddressModel,
    private dialogRef: MatDialogRef<AddressDialogComponent>,
    private formBuilder: FormBuilder,
    private provinceService: ProvincesService,
    public modulesService: ModulesService,
    private addressService: AddressService,
    private notificationService: NotificationService,
    private storeService: StoreService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.getProvinces();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.getStoreCoordinate()
    }, 1000)
  }

  getStoreCoordinate(): void {
    this.storeService.getCurrentStore().subscribe(
      (store) => {
        if (store.store_addresses[0].X && store.store_addresses[0].Y) {
          this.storeLat = store.store_addresses[0].X
          this.storeLong = store.store_addresses[0].Y
          this.maxDistance = +store.MAX_DISTANCE

          this.loadMap(store.store_addresses[0].X, store.store_addresses[0].Y)
          if (this.address?.LOCATION?.length && this.address.LOCATION[0] && this.address.LOCATION[1]) {
            this.loadMap(this.address.LOCATION[0], this.address.LOCATION[1])
          } else {
            getCoords().then(coords => {
                if (coords) {
                  this.loadMap(coords.latitude, coords.longitude)
                }
              }
            )
          }
        }
      }
    );
  }

  createForm(): void {
    this.addressForm = this.formBuilder.group({
      ID: [this.address?.ID],
      NAME: [this.address?.NAME ? this.address.NAME : null, Validators.required],
      ADDRESS: [this.address?.ADDRESS ? this.address.ADDRESS : null, Validators.required],
      PROVINCE_ID: [this.address?.PROVINCE_ID ? this.address.PROVINCE_ID : null, Validators.required],
      COUNTRY_DIVISION_ID: [this.address?.TOWNSHIP_ID ? +this.address.TOWNSHIP_ID : null, Validators.required],
      LOCATION: [this.address?.LOCATION ? this.address.LOCATION : ['', ''], Validators.required],
      POSTAL_CODE: [this.address?.POSTAL_CODE ? this.address.POSTAL_CODE : null],
      searchString: [],

      AREA: [1, Validators.required],
    })

    if (this.address?.PROVINCE_ID) {
      this.getCities(+this.address?.PROVINCE_ID)
    }

    if (this.modulesService.postalCode) {
      this.addressForm.controls['POSTAL_CODE'].setValidators(Validators.required)
    }

    if (this.modulesService.isRenovation) {
      this.addressForm.controls['LOCATION'].setValidators(null)
    } else {
      this.getSearchedAddress()
    }
  }

  getProvinces(): void {
    this.provinceService.getAllProvinces().subscribe(provinces => {
      this.provinces = provinces
    })
  }

  getCities(province: number): void {
    this.provinceService.getAllCityOfProvince(province).subscribe(cities => {
      this.cities = cities
    })
  }

  getSearchedAddress(): void {

    this.addressForm.controls['searchString'].valueChanges.pipe(
      debounceTime(1000),
      switchMap(
        value => {
          const province_name: string = this.provinces?.find(f => f.ID == this.addressForm.controls['PROVINCE_ID'].value)?.PROVINCE_NAME
          const township_name: string = this.cities?.find(f => f.ID == this.addressForm.controls['COUNTRY_DIVISION_ID'].value)?.TOWNSHIP_NAME

          return this.provinceService.getAddressFromMark(
            `${province_name ? province_name : 'تهران'}. ${township_name ? township_name : 'تهران'}. ${value}`,
            this.addressForm.controls['LOCATION'].value[0] ? this.addressForm.controls['LOCATION'].value[0] : 35.699739,
            this.addressForm.controls['LOCATION'].value[1] ? this.addressForm.controls['LOCATION'].value[1] : 51.338097
          )
        }
      )
    ).subscribe(addresses => {
      if (addresses?.items?.length)
        this.searchedAddresses = addresses.items
    })
  }

  selectAddress(address: SearchedAddressModel): void {
    this.loadMap(address.location.y, address.location.x)
  }

  loadMap(lat, lng) {
    document.getElementById('mapSection').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";

    const myMap = L.map('map', {
      center: [lat, lng],
      zoom: 14
    });

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1Ijoic2F6YSIsImEiOiJjazcyeGg3aGYwNmVnM2VtczZwanFlN3prIn0.Nch_vaoQFjEVTMST56Yz2g'
    }).addTo(myMap);

    let locationIcon = L.icon({
      iconUrl: '/assets/icons/location.png',
      iconSize: [25, 25],
    });

    this.addressForm.controls['LOCATION'].setValue([
      lat,
      lng
    ])

    let marker = L.marker([lat, lng], {icon: locationIcon}).addTo(myMap);
    myMap.on('click', (e) => {
      if (marker)
        myMap.removeLayer(marker);

      marker = L.marker(e.latlng, {icon: locationIcon}).addTo(myMap);

      this.addressForm.controls['LOCATION'].setValue([
        e.latlng.lat,
        e.latlng.lng
      ])

    });

  }

  getLocation() {
    getCoords().then(coords => {
      if (coords) {
        this.loadMap(coords.latitude, coords.longitude)
      } else {
        this.notificationService.error('لطفا برای یافتن موقعیت دقیق، دسترسی مکان را فعال کنید')
      }
    })
  }

  submit(): void {
    if (this.modulesService.postalCode) {
      this.addressForm.controls['POSTAL_CODE'].setValue(p2e(this.addressForm.value.POSTAL_CODE))
    }

    if (this.modulesService.courierMaximumSupport) {
      const _distance: number = geologyDistance(
        this.storeLat,
        this.storeLong,
        this.addressForm.controls['LOCATION'].value[0],
        this.addressForm.controls['LOCATION'].value[1],
        "K")
      if (this.maxDistance < _distance) {
        this.notificationService.warning('آدرسی که انتخاب کرده اید در محدوده فروشگاه نیست!')
        return
      }
    }


    if (this.address) {
      this.addressService.editAddress(this.addressForm.value).subscribe(() => {
        this.notificationService.valid('با موفقیت ویرایش شد')
        this.closeDialog()
      })
    } else {
      this.addressService.addAddress(this.addressForm.value).subscribe(() => {
        this.notificationService.valid('با موفقیت ثبت شد')
        this.closeDialog()
      })
    }
  }

  closeDialog(): void {
    this.dialogRef.close()
  }

}
