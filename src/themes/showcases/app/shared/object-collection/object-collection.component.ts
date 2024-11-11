import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { slideSidebarPadding } from '../../../../../app/shared/animations/slide';
import { ObjectCollectionComponent as BaseComponent } from '../../../../../app/shared/object-collection/object-collection.component';
import { filter, map, startWith } from 'rxjs/operators';
import { isNotEmpty } from '../../../../../app/shared/empty.util';
import { ViewMode } from '../../../../../app/core/shared/view-mode.model';

@Component({
  selector: 'ds-viewable-collection',
  // styleUrls: ['./root.component.scss'],
  styleUrls: ['../../../../../app/shared/object-collection/object-collection.component.scss'],
  //templateUrl: '../../../../../app/shared/object-collection/object-collection.component.html',
   templateUrl: './object-collection.component.html',
  animations: [slideSidebarPadding],
})
export class ObjectCollectionComponent extends BaseComponent implements OnInit {
   /**
   * The preferred view-mode to display
   */
    @Input() viewMode: ViewMode;
    // punsarn
  
   constructor(
     cdRef: ChangeDetectorRef,
     public route: ActivatedRoute,
     router: Router,
     elementRef: ElementRef,
    @Inject(PLATFORM_ID) platformId: Object
   )
   {
     super(cdRef, route, router, elementRef, platformId);	
   }


    ngOnInit(): void {
      let url = this.router.url.split('/').pop();
      if (url.split('?')[0] === 'author' || url.split('?')[0] === 'subject') {        
	this.viewMode = ViewMode.ListElement;
      }
      this.currentMode$ = this.route
        .queryParams
        .pipe(
          filter(
	    (params) => isNotEmpty(params.view)
	  ),
          map((params) => params.view),
          startWith(this.viewMode ? this.viewMode : ViewMode.GridElement) // punsarn
        );
    }


}
