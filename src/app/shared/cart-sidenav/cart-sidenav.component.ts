import {Component, OnInit} from '@angular/core';
import {CartService} from "@app/core/services/cart.service";
import {SidenavStatus} from "@app/core/models/cart.model";
import {ModulesService} from "@app/core/services/modules.service";
import {CredentialsService} from "@app/core/services/credentials.service";

@Component({
  selector: 'cart-sidenav',
  templateUrl: './cart-sidenav.component.html',
  styleUrls: ['./cart-sidenav.component.scss']
})
export class CartSidenavComponent implements OnInit {

  CartSidenavStatus = SidenavStatus;
  links: {
    type: 'cart' | 'noteBook',
    name: string,
    badge?: number,
  }[] = [
    {
      name: 'سبد خرید',
      type: 'cart',
    },
    {
      name: 'خرید بعدی',
      type: 'noteBook',
    },
  ];
  activeLink: 'cart' | 'noteBook' = "cart";

  constructor(
    public cartService: CartService,
    public modulesService: ModulesService,
    private credentialsService: CredentialsService
  ) {
  }

  ngOnInit(): void {
    this.checkCount();
    this.checkNotebook();
  }

  checkCount(): void {
    this.cartService.cartCount.subscribe(count => {
      this.links.find(f => f.type == 'cart').badge = count
    })
    this.cartService.noteBookCount.subscribe(count => {
      if (this.links.find(f => f.type == 'noteBook')) {
        this.links.find(f => f.type == 'noteBook').badge = count
      }
    })
  }

  checkNotebook(): void {
    if (!this.modulesService.secondCart || this.credentialsService.isGuest) {
      this.links.pop()
    }
  }

}
