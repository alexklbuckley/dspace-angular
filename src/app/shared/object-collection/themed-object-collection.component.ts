import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Observable } from 'rxjs';
import { PageInfo } from '../../core/shared/page-info.model';
import { ThemedComponent } from '../../shared/theme-support/themed.component';
import { ObjectCollectionComponent } from './object-collection.component';
import {ViewMode} from '../../core/shared/view-mode.model';
import {PaginationComponentOptions} from '../pagination/pagination-component-options.model';
import {SortDirection, SortOptions} from '../../core/cache/models/sort-options.model';
import {CollectionElementLinkType} from '../object-collection/collection-element-link.type';
import {Context} from '../../core/shared/context.model';
import {RemoteData} from '../../core/data/remote-data';
import {PaginatedList} from '../../core/data/paginated-list.model';
import {ListableObject} from '../object-collection/shared/listable-object.model';

@Component({
  selector: 'ds-themed-viewable-collection',
  styleUrls: [],
  templateUrl: '../../shared/theme-support/themed.component.html',
})
export class ThemedObjectCollectionComponent extends ThemedComponent<ObjectCollectionComponent> {

  /**
   * The current pagination configuration
   */
  @Input() config?: PaginationComponentOptions;

  /**
   * The current sorting configuration
   */
  @Input() sortConfig: SortOptions;

  /**
   * Whether or not the list elements have a border or not
   */
  @Input() hasBorder = false;

  /**
   * Whether or not to hide the gear to change the sort and pagination configuration
   */
  @Input() hideGear = false;
  @Input() selectable = false;
  @Input() selectionConfig: {repeatable: boolean, listId: string};

  /**
   * Emit custom event for listable object custom actions.
   */
  @Output() customEvent = new EventEmitter<any>();
  @Output() deselectObject: EventEmitter<ListableObject> = new EventEmitter<ListableObject>();
  @Output() selectObject: EventEmitter<ListableObject> = new EventEmitter<ListableObject>();

  /**
   * Emit when one of the collection's object has changed.
   */
  @Output() contentChange = new EventEmitter<any>();

  /**
   * Whether or not to add an import button to the object elements
   */
  @Input() importable = false;

  /**
   * The config to use for the import button
   */
  @Input() importConfig: { buttonLabel: string };

  /**
   * Send an import event to the parent component
   */
  @Output() importObject: EventEmitter<ListableObject> = new EventEmitter<ListableObject>();

  /**
   * The link type of the rendered list elements
   */
  @Input() linkType: CollectionElementLinkType;

  /**
   * The context of the rendered list elements
   */
  @Input() context: Context;

  /**
   * Option for hiding the pagination detail
   */
  @Input() hidePaginationDetail = false;

  /**
   * Whether or not the pagination should be rendered as simple previous and next buttons instead of the normal pagination
   */
  @Input() showPaginator = true;

  /**
   * the page info of the list
   */
  pageInfo: Observable<PageInfo>;

  /**
   * An event fired when the page is changed.
   * Event's payload equals to the newly selected page.
   */
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   * An event fired when the page wsize is changed.
   * Event's payload equals to the newly selected page size.
   */
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter<number>();

  /**
   * An event fired when the sort direction is changed.
   * Event's payload equals to the newly selected sort direction.
   */
  @Output() sortDirectionChange: EventEmitter<SortDirection> = new EventEmitter<SortDirection>();

  /**
   * An event fired one of the pagination parameters is changed
   */
  @Output() paginationChange: EventEmitter<SortDirection> = new EventEmitter<any>();

  /**
   * An event fired when the sort field is changed.
   * Event's payload equals to the newly selected sort field.
   */
  @Output() sortFieldChange: EventEmitter<string> = new EventEmitter<string>();

  /**
   * If showPaginator is set to true, emit when the previous button is clicked
   */
  @Output() prev = new EventEmitter<boolean>();

  /**
   * If showPaginator is set to true, emit when the next button is clicked
   */
  @Output() next = new EventEmitter<boolean>();

  /**
   * Emits the current view mode
   */
  currentMode$: Observable<ViewMode>;

  /**
   * The available view modes
   */
  viewModeEnum = ViewMode;

  /**
   * Placeholder class (defined in global-styles)
   */
  placeholderFontClass: string;

  /**
   * The current listable objects
   */
  private _objects: RemoteData<PaginatedList<ListableObject>>;

  /**
   * Setter for the objects
   * @param objects The new objects
   */
  @Input() set objects(objects: RemoteData<PaginatedList<ListableObject>>) {
    this._objects = objects;
  }

  /**
   * Getter to return the current objects
   */
  get objects() {
    return this._objects;
  }

  /**
   * An event fired when the page is changed.
   * Event's payload equals to the newly selected page.
   */
  @Output() change: EventEmitter<{
    pagination: PaginationComponentOptions,
    sort: SortOptions
  }> = new EventEmitter<{
    pagination: PaginationComponentOptions,
    sort: SortOptions
  }>();

  inAndOutputNames: (keyof ObjectCollectionComponent & keyof this)[] = [
    'objects',
    'config',
    'sortConfig',
    'hasBorder',
    'hideGear',
    'selectable',
    'selectionConfig',
    'customEvent',
    'selectable',
    'selectionConfig',
    'contentChange',
    'importable',
    'importConfig',
    'importObject',
    'linkType',
    'context',
    'hidePaginationDetail',
    'showPaginator',
    'pageChange',
    'pageSizeChange',
    'sortDirectionChange',
    'paginationChange',
    'sortFieldChange',
    'prev',
    'next',
  ];

  protected getComponentName(): string {
    return 'ObjectCollectionComponent';
  }

  protected importThemedComponent(themeName: string): Promise<any> {
    return import(`../../../themes/${themeName}/app/shared/object-collection/object-collection.component`);
  }

  protected importUnthemedComponent(): Promise<any> {
    return import(`./object-collection.component`);
  }

}
