import { Component, OnInit } from '@angular/core';
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {FactorService} from "@app/core/services/factor.service";

@Component({
  selector: 'factor-special-courier',
  templateUrl: './factor-special-courier.component.html',
  styleUrls: ['./factor-special-courier.component.scss']
})
export class FactorSpecialCourierComponent implements OnInit {

  customTransports: {
    ID: number,
    TRANSPORT: string
  }[] = []
  selectedDelivery = {} as {
    TRANSPORT_ID: number,
    TRANSPORT_DESCRIPTION?: string
  }

  constructor(
    private storeSettingService: StoreSettingService,
    private factorService: FactorService,
  ) { }

  ngOnInit(): void {
    this.getCustomDeliveries();
  }

  getCustomDeliveries(): void {
    this.factorService.getCustomDeliveries().subscribe(transports => {
      this.customTransports = transports
    })
  }

  selectSendTime(selectedTime: Date, customTransport?: {}): void {
    const _data = {
      ID: this.factorService.currentOrder.orderID,
      ORDER_DELIVERY_DATE: selectedTime,
      ...customTransport
    }

    this.factorService.changeOrderSendTime(_data).subscribe(() => {
      this.factorService.orderDeliveryTime = selectedTime
      this.factorService.customTransportID = this.selectedDelivery?.TRANSPORT_ID
      this.factorService.updateOrderAndCourierValue();
    })
  }

  selectTransportType(transportID: number) {
    this.selectedDelivery.TRANSPORT_ID = transportID
    this.selectSendTime(this.factorService.currentOrder.orderDeliveryDate || new Date(), this.selectedDelivery)
    this.factorService.updateOrderAndCourierType();
  }

}
