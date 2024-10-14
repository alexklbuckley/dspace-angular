import { Component } from '@angular/core';
import { ComcolMetadataComponent } from '../../../shared/comcol/comcol-forms/edit-comcol-page/comcol-metadata/comcol-metadata.component';
import { Collection } from '../../../core/shared/collection.model';
import { CollectionDataService } from '../../../core/data/collection-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemTemplateDataService } from '../../../core/data/item-template-data.service';
import { combineLatest as combineLatestObservable, Observable } from 'rxjs';
import { RemoteData } from '../../../core/data/remote-data';
import { Item } from '../../../core/shared/item.model';
import { getFirstCompletedRemoteData, getFirstSucceededRemoteDataPayload } from '../../../core/shared/operators';
import { map, switchMap } from 'rxjs/operators';
import { NotificationsService } from '../../../shared/notifications/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import { RequestService } from '../../../core/data/request.service';
import { getCollectionItemTemplateRoute } from '../../collection-page-routing-paths';
import { NoContent } from '../../../core/shared/NoContent.model';
import { hasValue } from '../../../shared/empty.util';


/**
 * Component for editing a collection's metadata
 */
@Component({
  selector: 'ds-collection-style-form',
  templateUrl: './collection-styles.component.html',
})
export class CollectionStylesComponent extends ComcolMetadataComponent<Collection> {
  protected frontendURL = '/collections/';
  protected type = Collection.type;

  /**
   * The collection's item template
   */
  itemTemplateRD$: Observable<RemoteData<Item>>;

  public constructor(
    protected collectionDataService: CollectionDataService,
    protected itemTemplateService: ItemTemplateDataService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected notificationsService: NotificationsService,
    protected translate: TranslateService,
    protected requestService: RequestService,
  ) {
    super(collectionDataService, router, route, notificationsService, translate);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
