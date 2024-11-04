import { Component, Injector, OnDestroy } from '@angular/core';
import { hasValue } from '../../../../app/shared/empty.util';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent as BaseComponent } from '../../../../app/navbar/navbar.component';
import { HeaderComponent } from '../../../../app/header/header.component';
import { slideMobileNav } from '../../../../app/shared/animations/slide';
import { ExpandableNavbarSectionComponent } from '../../../../app/navbar/expandable-navbar-section/expandable-navbar-section.component';
import { CollectionStylesDataService } from '../../../../app/shared/theme-support/collection-styles.service';
import { Observable, Subscription } from 'rxjs';
import { CollectionDataService } from '../../../../app/core/data/collection-data.service';
import { RemoteData } from '../../../../app/core/data/remote-data';
import { Collection } from '../../../../app/core/shared/collection.model';
import { MenuService } from '../../../../app/shared/menu/menu.service';
import { HostWindowService } from '../../../../app/shared/host-window.service';
import { BrowseService } from '../../../../app/core/browse/browse.service';
import { AuthorizationDataService } from '../../../../app/core/data/feature-authorization/authorization-data.service';
import { ThemeService } from '../../../../app/shared/theme-support/theme.service';

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
export class NavbarComponent extends BaseComponent implements OnDestroy {
  showcaseCollection: Collection;
  subscription: Subscription;
  showcaseNavNeeded: boolean;
  url: string;

  constructor(
    protected menuService: MenuService,
    protected injector: Injector,
    public windowService: HostWindowService,
    public browseService: BrowseService,
    public authorizationService: AuthorizationDataService,
    public route: ActivatedRoute,
    protected themeService: ThemeService,
    protected collectionStylesDataService: CollectionStylesDataService,
    protected collectionService: CollectionDataService,
    public router: Router,
  ) {
    super(menuService, injector, windowService, browseService, authorizationService, route, themeService);
    this.subscription = this.collectionStylesDataService.styledCollectionName$.subscribe(styledCollectionName => {
      this.showcaseCollection = styledCollectionName;
    });

    this.router.events.subscribe(events => {
      if (events instanceof NavigationEnd) {
        this.url = router.url.split('/').pop();
        if (this.url === 'home') {
          this.showcaseNavNeeded = false;
        } else {
          this.showcaseNavNeeded = true;
        }
      }
    });
  }

  ngOnInit() {
    this.url = this.router.url.split('/').pop();
    if (this.url === 'home') {
       this.showcaseNavNeeded = false;
    } else {
       this.showcaseNavNeeded = true;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
