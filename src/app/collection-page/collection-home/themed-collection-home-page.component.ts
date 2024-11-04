import { ThemedComponent } from '../../shared/theme-support/themed.component';
import { CollectionHomePageComponent } from './collection-home-page.component';
import { Component } from '@angular/core';

@Component({
  selector: 'ds-themed-collection-home-page',
  styleUrls: [],
  templateUrl: '../../shared/theme-support/themed.component.html',
})
export class ThemedCollectionHomePageComponent extends ThemedComponent<CollectionHomePageComponent> {
  protected getComponentName(): string {
    return 'CollectionHomePageComponent';
  }

  protected importThemedComponent(themeName: string): Promise<any> {
    return import(`../../../themes/${themeName}/app/collection-page/collection-home/collection-home-page.component`);
  }

  protected importUnthemedComponent(): Promise<any> {
    return import(`./collection-home-page.component`);
  }

}
