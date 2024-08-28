import { NgIf } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  APP_CONFIG,
  AppConfig,
} from 'src/config/app-config.interface';

import { DSONameService } from '../../../core/breadcrumbs/dso-name.service';
import { Collection } from '../../../core/shared/collection.model';
import { ViewMode } from '../../../core/shared/view-mode.model';
import { listableObjectComponent } from '../../object-collection/shared/listable-object/listable-object.decorator';
import { AbstractListableElementComponent } from '../../object-collection/shared/object-collection-element/abstract-listable-element.component';

@Component({
  selector: 'ds-collection-list-element',
  styleUrls: ['./collection-list-element.component.scss'],
  templateUrl: './collection-list-element.component.html'
})
/**
 * Component representing list element for a collection
 */
@listableObjectComponent(Collection, ViewMode.ListElement)
export class CollectionListElementComponent extends AbstractListableElementComponent<Collection> implements OnInit {

  useCollectionHomePage: boolean;

  constructor(
    @Inject(APP_CONFIG) protected appConfig: AppConfig,
    public dsoNameService: DSONameService,
  ) {
    super(dsoNameService);
  }

  ngOnInit(): void {
    this.useCollectionHomePage = this.appConfig.collection.routeThrough.collectionHomePage;
  }
}
