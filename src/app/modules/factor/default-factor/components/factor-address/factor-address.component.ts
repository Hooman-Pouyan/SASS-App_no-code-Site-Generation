import {Component, OnInit} from '@angular/core';
import {AddressModel} from "@app/core/models/address.model";
import {AddressService} from "@app/core/services/address.service";
import {MatDialog} from "@angular/material/dialog";
import {AddressDialogComponent} from "@app/shared/address-dialog/address-dialog.component";
import {FactorService} from "@app/core/services/factor.service";

@Component({
  selector: 'factor-address',
  templateUrl: './factor-address.component.html',
  styleUrls: ['./factor-address.component.scss']
})
export class FactorAddressComponent implements OnInit {

  addresses: AddressModel[] = [];
  selectedAddress = {} as AddressModel;

  constructor(
    private addressService: AddressService,
    private dialog: MatDialog,
    private factorService: FactorService
  ) {
  }

  ngOnInit(): void {
    this.getAddresses();
  }

  getAddresses(): void {
    this.addressService.getAddressUser().subscribe(addresses => {
      this.addresses = addresses;
      this.selectedAddress = addresses.find(f => f.SELECTED == 1)
      this.factorService.orderAddressID = this.selectedAddress?.ID
      if (this.selectedAddress.ID) {
        this.factorService.updateCourierValue()
      }
    })
  }

  changeOrderAddress(address: AddressModel): void {
    this.addressService.changeCurrentAddress(address).subscribe(() => {
      this.addressService.changeOrderAddress(this.factorService.currentOrder.orderID).subscribe(() => {
        this.factorService.orderAddressID = address.ID
        this.getAddresses()
      })
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
