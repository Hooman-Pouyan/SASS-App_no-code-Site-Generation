import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as L from 'leaflet';
import {TicketService} from "@app/core/services/ticket.service";
import {NotificationService} from "@app/core/services/notification.service";
import {StoreService} from "@app/core/services/store.service";
import {p2e} from "@app/modules/global/functions";

@Component({
  selector: 'default-contact-us',
  templateUrl: './default-contact-us.component.html',
  styleUrls: ['./default-contact-us.component.scss']
})
export class DefaultContactUsComponent implements OnInit, AfterViewInit {

  ticketForm: FormGroup;
  catalogs: any[] = [];
  @Input() asComponent: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private ticketService: TicketService,
    private notificationService: NotificationService,
    public storeService: StoreService
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.getCatalog();
  }

  ngAfterViewInit() {
    this.storeService.getCurrentStore().subscribe(
      (store) => {
        if (store.store_addresses[0].X && store.store_addresses[0].Y) {
          this.loadMap(store.store_addresses[0].X, store.store_addresses[0].Y)
        } else {
          this.loadMap(35.7904709, 51.4130323)
        }
      }
    );
  }

  loadMap(lat, lng) {
    document.getElementById('mapSection').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";

    const myMap = L.map('map', {
      center: [lat, lng],
      zoom: 17
    });

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; ' +
        '<a href="https://www.openstreetmap.org/">OpenStreetMap</a> ' +
        'contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
        ' Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
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

    L.marker([lat, lng], {icon: locationIcon}).addTo(myMap);
  }

  createForm() {
    this.ticketForm = this.formBuilder.group({
      CATALOG_ID: ['', [Validators.required]],
      SUBJECT: ['', [Validators.required]],
      CONTENT: ['', [Validators.required]],
      PHONE_NUMBER: ['', [Validators.required]]
    });
  }

  getCatalog() {
    this.ticketService.getCatalog().subscribe(
      res => {
        this.catalogs = res;
      }
    )
  }

  saveChange() {
    this.ticketForm.controls['PHONE_NUMBER'].setValue(p2e(this.ticketForm.value.PHONE_NUMBER))
    this.ticketService.createTicket(this.ticketForm.value).subscribe(
      () => {
        this.notificationService.valid('درخواست شما، با موفقیت ثبت شد')
        this.createForm();
      }
    )
  }
}



