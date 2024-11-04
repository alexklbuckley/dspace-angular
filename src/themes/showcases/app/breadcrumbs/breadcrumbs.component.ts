import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { BreadcrumbsService } from '../../../../app/breadcrumbs/breadcrumbs.service';
import { BreadcrumbsComponent as BaseComponent } from '../../../../app/breadcrumbs/breadcrumbs.component';

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

  constructor(
    breadcrumbsService: BreadcrumbsService,
    private router: Router,
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
  }
}
