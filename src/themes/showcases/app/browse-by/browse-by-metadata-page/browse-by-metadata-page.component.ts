import { Component, Input } from '@angular/core';
import { BrowseByMetadataPageComponent as BaseComponent } from '../../../../../app/browse-by/browse-by-metadata-page/browse-by-metadata-page.component';
import { ViewMode } from '../../../../../app/core/shared/view-mode.model';


@Component({
  selector: 'ds-browse-by-metadata-page',
  // styleUrls: ['./browse-by-metadata-page.component.scss'],
  styleUrls: ['../../../../../app/browse-by/browse-by-metadata-page/browse-by-metadata-page.component.scss'],
  templateUrl: './browse-by-metadata-page.component.html'
  // templateUrl: '../../../../../app/browse-by/browse-by-metadata-page/browse-by-metadata-page.component.html'
})

/**
 * Component for determining what Browse-By component to use depending on the metadata (browse ID) provided
 */

export class BrowseByMetadataPageComponent extends BaseComponent {
  @Input() viewMode =  'ListElement';
}
