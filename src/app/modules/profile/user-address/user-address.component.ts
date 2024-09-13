import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddressService} from '@app/core/services/address.service';
import {AddressModel} from "@app/core/models/address.model";
import {AddressDialogComponent} from "@app/shared/address-dialog/address-dialog.component";
import {NotificationService} from "@app/core/services/notification.service";
import {ConfirmComponent} from "@app/shared/confirm/confirm.component";

@Component({
  selector: 'mk-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss']
})
export class UserAddressComponent implements OnInit {

  addresses: AddressModel[] = [];
  selectedAddress = {} as AddressModel;


  constructor(
    private addressService: AddressService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.getAddresses();
  }

  getAddresses(): void {
    this.addressService.getAddressUser().subscribe(addresses => {
      this.addresses = addresses;
      this.selectedAddress = addresses.find(f => f.SELECTED == 1)
    })
  }

  changeOrderAddress(address: AddressModel): void {
    this.addressService.changeCurrentAddress(address).subscribe(() => {
      this.notificationService.valid('با موفقعیت ویرایش شد')
      this.getAddresses()
    })
  }

  deleteAddress(address: AddressModel): void {
    this.dialog.open(ConfirmComponent, {
      width: '250px'
    }).afterClosed().subscribe(confirm => {
      if (confirm == true) {
        this.addressService.deleteAddress(address.ID).subscribe(() => {
          this.notificationService.valid('با موفقعیت حذف شد')
          this.getAddresses()
        })
      }
    })
  }

  openAddressDialog(address?: AddressModel): void {
    this.dialog.open(AddressDialogComponent, {
      width: '1000px',
      maxWidth: '95%',
      data: address ? address : undefined
    }).afterClosed().subscribe(() => this.getAddresses())
  }

}
