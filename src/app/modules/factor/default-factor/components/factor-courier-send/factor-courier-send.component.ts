import {Component, OnInit} from '@angular/core';
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {WorkDaysModel} from "@app/core/models/store.model";
import {FactorService} from "@app/core/services/factor.service";
import {ModulesService} from "@app/core/services/modules.service";


@Component({
  selector: 'factor-courier-send',
  templateUrl: './factor-courier-send.component.html',
  styleUrls: ['./factor-courier-send.component.scss']
})
export class FactorCourierSendComponent implements OnInit {

  workDays: WorkDaysModel[] = [];
  selectedWorkDay: WorkDaysModel;
  selectedWorkHour: Date = new Date()

  constructor(
    private storeSettingService: StoreSettingService,
    private factorService: FactorService,
    public modulesService: ModulesService
  ) {
  }

  ngOnInit(): void {
    this.getStoreWorkDays();
  }

  getStoreWorkDays(): void {
    this.storeSettingService.getWorkHour().subscribe(res => {
      if (res?.length && res[0].store_hours?.length) {
        this.workDays = res[0].store_hours
        this.workDays = this.workDays.sort((el1, el2) => el1.WEEK_DAY - el2.WEEK_DAY);
        this.setWorkDays();
        this.setWorkHours();
      }
    })
  }

  setWorkDays(): void {
    let today: Date = new Date();
    for (let i = 0; i <= 6; i++) {
      let date: Date = new Date()
      date.setDate(today.getDate() + i)
      if (date.getDay() == 6) {
        const index: number = this.workDays.findIndex(f => f.WEEK_DAY == 1)
        if (index != -1) {
          this.workDays[index].date = date
        }
      } else {
        const index: number = this.workDays.findIndex(f => f.WEEK_DAY == date.getDay() + 2)
        if (index != -1) {
          this.workDays[index].date = date
        }
      }
    }

    this.workDays.sort((a, b) => (+new Date(a.date)) - (+new Date(b.date)))

  }

  setWorkHours(): void {
    this.workDays.forEach(each => {
      each.workHours = []

      let startDate1UTC: string = new Date(`${each.date.toISOString().slice(0, 10).replace(/-/g, '/')} ${each.START_TIME}`).toUTCString()
      const startDate1: Date = new Date(startDate1UTC)

      let endDate1UTC: string = new Date(`${each.date.toISOString().slice(0, 10).replace(/-/g, '/')} ${each.END_TIME}`).toUTCString()
      const endDate1: Date = new Date(endDate1UTC)

      let startDate2UTC: string = new Date(`${each.date.toISOString().slice(0, 10).replace(/-/g, '/')} ${each.START_TIME2}`).toUTCString()
      const startDate2: Date = new Date(startDate2UTC)

      let endDate2UTC: string = new Date(`${each.date.toISOString().slice(0, 10).replace(/-/g, '/')} ${each.END_TIME2}`).toUTCString()
      const endDate2: Date = new Date(endDate2UTC)

      for (let d = new Date(startDate1); d < endDate1; d.setHours(d.getHours() + 1)) {
        const afterHour: Date = new Date(d)
        afterHour.setHours(afterHour.getHours() + 1)
        each.workHours.push({
          startTime: new Date(d).toString(),
          endTime: new Date(afterHour).toString()
        })
      }

      for (let d = new Date(startDate2); d < endDate2; d.setHours(d.getHours() + 1)) {
        const afterHour: Date = new Date(d)
        afterHour.setHours(afterHour.getHours() + 1)
        each.workHours.push({
          startTime: new Date(d).toString(),
          endTime: new Date(afterHour).toString()
        })
      }

    })
  }

  selectSendTime(selectedTime: Date): void {

    const _data = {
      ID: this.factorService.currentOrder.orderID,
      ORDER_DELIVERY_DATE: selectedTime,
    }

    this.factorService.changeOrderSendTime(_data).subscribe(() => {
      this.factorService.orderDeliveryTime = selectedTime
      this.factorService.updateOrderAndCourierValue();
    })

  }

  checkTimePassed(time: Date): boolean {
    if (time) {
      return time < new Date();
    } else {
      return false
    }
  }

}
