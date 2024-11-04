import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from '../../../../app/shared/menu/menu.service';
import { CollectionStylesDataService } from '../../../../app/shared/theme-support/collection-styles.service';
import { Subscription } from 'rxjs';
import { CollectionDataService } from '../../../../app/core/data/collection-data.service';
import { RemoteData } from '../../../../app/core/data/remote-data';
import { Collection } from '../../../../app/core/shared/collection.model';
import { HeaderComponent as BaseComponent } from '../../../../app/header/header.component';

/**
 * Represents the header with the logo and simple navigation
 */
@Component({
  selector: 'ds-header',
  // styleUrls: ['header.component.scss'],
  styleUrls: ['../../../../app/header/header.component.scss'],
  templateUrl: 'header.component.html',
  //templateUrl: '../../../../app/header/header.component.html',
})
export class HeaderComponent extends BaseComponent implements OnDestroy {
  showcaseCollection: Collection;
  subscription: Subscription;
  collectionRD$: Observable<RemoteData<Collection>>;

  constructor(
    menuService: MenuService,
    private collectionStylesDataService: CollectionStylesDataService,
    public collectionService: CollectionDataService,
  ) {
    super(menuService);
    this.subscription = this.collectionStylesDataService.styledCollectionName$.subscribe(styledCollectionName => {
      this.showcaseCollection = styledCollectionName;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
