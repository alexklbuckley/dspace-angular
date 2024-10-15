import { Component } from '@angular/core';
import { NavbarComponent as BaseComponent } from '../../../../app/navbar/navbar.component';
import { HeaderComponent } from '../../../../app/header/header.component';
import { slideMobileNav } from '../../../../app/shared/animations/slide';
import { ExpandableNavbarSectionComponent } from '../../../../app/navbar/expandable-navbar-section/expandable-navbar-section.component';

/**
 * Component representing the public navbar
 */
@Component({
  selector: 'ds-navbar',
  styleUrls: ['./navbar.component.scss'],
  //styleUrls: ['../../../../app/navbar/navbar.component.scss'],
  templateUrl: './navbar.component.html',
  //templateUrl: '../../../../app/navbar/navbar.component.html',
  animations: [slideMobileNav]
})
export class NavbarComponent extends BaseComponent {
  homepage: boolean = false;
  ngOnInit() {
    console.log(this.route.snapshot['_routerState'].url.split('/').pop());
    if (this.route.snapshot['_routerState'].url.split('/').pop() == "home") {
      this.homepage = true;
    }
  }
}
