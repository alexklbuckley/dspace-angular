import { Component, OnDestroy } from '@angular/core';
import { FooterComponent as BaseComponent } from '../../../../app/footer/footer.component';
import { KlaroService } from '../../../../app/shared/cookies/klaro.service';
import { Observable, Subscription } from 'rxjs';
import { CollectionStylesDataService } from '../../../../app/shared/theme-support/collection-styles.service';
import { CollectionDataService } from '../../../../app/core/data/collection-data.service';
import { RemoteData } from '../../../../app/core/data/remote-data';
import { Collection } from '../../../../app/core/shared/collection.model';

@Component({
  selector: 'ds-footer',
  styleUrls: ['footer.component.scss'],
  // styleUrls: ['../../../../app/footer/footer.component.scss'],
  templateUrl: './footer.component.html'
  //templateUrl: '../../../../app/footer/footer.component.html'
})
export class FooterComponent extends BaseComponent implements OnDestroy {
  showcaseCollection: Collection;
  subscription: Subscription;
  collectionRD$: Observable<RemoteData<Collection>>;

  constructor(
    cookies: KlaroService,
    private collectionStylesDataService: CollectionStylesDataService,
    public collectionService: CollectionDataService,
  ) {
    super(cookies);
    this.subscription = this.collectionStylesDataService.styledCollectionName$.subscribe(styledCollectionName => {
      this.showcaseCollection = styledCollectionName;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
