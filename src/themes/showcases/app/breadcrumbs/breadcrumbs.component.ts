import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { BreadcrumbsService } from '../../../../app/breadcrumbs/breadcrumbs.service';
import { BreadcrumbsComponent as BaseComponent } from '../../../../app/breadcrumbs/breadcrumbs.component';
import {
  APP_CONFIG,
  AppConfig,
} from '../../../../config/app-config.interface';


/**
 * Component representing the breadcrumbs of a page
 */
@Component({
  selector: 'ds-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  // templateUrl: '../../../../app/breadcrumbs/breadcrumbs.component.html',
  // styleUrls: ['./breadcrumbs.component.scss']
  styleUrls: ['../../../../app/breadcrumbs/breadcrumbs.component.scss']
})
export class BreadcrumbsComponent extends BaseComponent {
  showcaseBreadcrumbsNeeded: boolean;
  url: string;
  useCollectionHomePage: boolean;
  useCollectionHomePageUUID: string

  constructor(
    breadcrumbsService: BreadcrumbsService,
    private router: Router,
    @Inject(APP_CONFIG) protected appConfig: AppConfig,
  ) {
    super(breadcrumbsService);
    this.router.events.subscribe(events => {
      if (events instanceof NavigationEnd) {
        this.url = router.url.split('/').pop();
        if (this.url === 'home') {
          this.showcaseBreadcrumbsNeeded = false;
        } else {
          this.showcaseBreadcrumbsNeeded = true;
        }
      }
    });
  }

  ngOnInit() {
    this.url = this.router.url.split('/').pop();
    if (this.url === 'home') {
       this.showcaseBreadcrumbsNeeded = false;
    } else {
       this.showcaseBreadcrumbsNeeded = true;
    }
    this.useCollectionHomePage = this.appConfig.collection.routeThrough.collectionHomePage;
    this.useCollectionHomePageUUID = this.appConfig.collection.routeThrough.uuid;
  }
}
