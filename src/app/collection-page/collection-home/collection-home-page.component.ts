import { ChangeDetectionStrategy, Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest as observableCombineLatest, Observable, Subject } from 'rxjs';
import { filter, map, mergeMap, startWith, switchMap, take } from 'rxjs/operators';
import { PaginatedSearchOptions } from '../../shared/search/models/paginated-search-options.model';
import { SearchService } from '../../core/shared/search/search.service';
import { SortDirection, SortOptions } from '../../core/cache/models/sort-options.model';
import { CollectionDataService } from '../../core/data/collection-data.service';
import { PaginatedList } from '../../core/data/paginated-list.model';
import { RemoteData } from '../../core/data/remote-data';
import { Bitstream } from '../../core/shared/bitstream.model';

import { Collection } from '../../core/shared/collection.model';
import { DSpaceObjectType } from '../../core/shared/dspace-object-type.model';
import { Item } from '../../core/shared/item.model';
import {
  getAllSucceededRemoteDataPayload,
  getFirstSucceededRemoteData,
  toDSpaceObjectListRD
} from '../../core/shared/operators';

import { fadeIn, fadeInOut } from '../../shared/animations/fade';
import { hasValue, isNotEmpty } from '../../shared/empty.util';
import { PaginationComponentOptions } from '../../shared/pagination/pagination-component-options.model';
import { AuthService } from '../../core/auth/auth.service';
import { PaginationService } from '../../core/pagination/pagination.service';
import { AuthorizationDataService } from '../../core/data/feature-authorization/authorization-data.service';
import { FeatureID } from '../../core/data/feature-authorization/feature-id';
import { getCollectionPageRoute } from '../collection-page-routing-paths';
import { redirectOn4xx } from '../../core/shared/authorized.operators';
import { BROWSE_LINKS_TO_FOLLOW } from '../../core/browse/browse.service';


@Component({
  selector: 'ds-base-collection-home-page',
  styleUrls: ['./collection-home-page.component.scss'],
  templateUrl: './collection-home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeIn,
    fadeInOut,
  ],
})
export class CollectionHomePageComponent implements OnInit {
  collectionRD$: Observable<RemoteData<Collection>>;
  logoRD$: Observable<RemoteData<Bitstream>>;
  paginationConfig: PaginationComponentOptions;
  sortConfig: SortOptions;

  /**
   * Whether the current user is a Community admin
   */
  isCollectionAdmin$: Observable<boolean>;

  /**
   * Route to the community page
   */
  collectionPageRoute$: Observable<string>;

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected authService: AuthService,
    protected authorizationDataService: AuthorizationDataService,
    protected sanitizer: DomSanitizer,
  ) {
  }

  ngOnInit(): void {
    this.collectionRD$ = this.route.data.pipe(
      map((data) => data.dso as RemoteData<Collection>),
      redirectOn4xx(this.router, this.authService),
      take(1),
    );
    this.logoRD$ = this.collectionRD$.pipe(
      map((rd: RemoteData<Collection>) => rd.payload),
      filter((collection: Collection) => hasValue(collection)),
      mergeMap((collection: Collection) => collection.logo),
    );
    this.isCollectionAdmin$ = this.authorizationDataService.isAuthorized(FeatureID.IsCollectionAdmin);

    this.collectionPageRoute$ = this.collectionRD$.pipe(
      getAllSucceededRemoteDataPayload(),
      map((collection) => getCollectionPageRoute(collection.id)),
    );
  }

  isNotEmpty(object: any) {
    return isNotEmpty(object);
  }

  public sanitizeCustomHeaderText(value) {
    return this.sanitizer.sanitize(SecurityContext.HTML, value);
  }
  public sanitizeCustomIntrotext(value) {
    return this.sanitizer.sanitize(SecurityContext.HTML, value);
  }
  public sanitizeOwnerNameText(value) {
    return this.sanitizer.sanitize(SecurityContext.HTML, value);
  }
  public sanitizeCustomFootertext(value) {
    return this.sanitizer.sanitize(SecurityContext.HTML, value);
  }
}
