import { Component } from '@angular/core';
import { slideSidebarPadding } from '../../../../../app/shared/animations/slide';
import { CollectionHomePageComponent as BaseComponent } from '../../../../../app/collection-page/collection-home/collection-home-page.component';

@Component({
  selector: 'ds-collection-home-page',
  // styleUrls: ['./root.component.scss'],
  styleUrls: ['../../../../../app/collection-page/collection-home/collection-home-page.component.scss'],
  templateUrl: './collection-home-page.component.html',
  // templateUrl: '../../../../../app/collection-page/collection-home/collection-home-page.component.html',
  animations: [slideSidebarPadding],
})
export class CollectionHomePageComponent extends BaseComponent {
}
