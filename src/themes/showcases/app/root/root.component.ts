import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { slideSidebarPadding } from '../../../../app/shared/animations/slide';
import { RootComponent as BaseComponent } from '../../../../app/root/root.component';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { MetadataService } from '../../../../app/core/metadata/metadata.service';
import { HostWindowState } from '../../../../app/shared/search/host-window.reducer';
import { NativeWindowRef, NativeWindowService } from '../../../../app/core/services/window.service';
import { AuthService } from '../../../../app/core/auth/auth.service';
import { CSSVariableService } from '../../../../app/shared/sass-helper/sass-helper.service';
import { MenuService } from '../../../../app/shared/menu/menu.service';
import { HostWindowService } from '../../../../app/shared/host-window.service';
import { Angulartics2DSpace } from '../../../../app/statistics/angulartics/dspace-provider';

@Component({
  selector: 'ds-root',
  // styleUrls: ['./root.component.scss'],
  styleUrls: ['../../../../app/root/root.component.scss'],
  templateUrl: './root.component.html',
  //templateUrl: '../../../../app/root/root.component.html',
  animations: [slideSidebarPadding],
})
export class RootComponent extends BaseComponent implements OnInit {
  showcaseClassName: string;
  url: string;
  
  ngOnInit() {
    this.getShowcaseMainClassName();
  }
  ngOnChanges() {
    this.getShowcaseMainClassName();
  }

  getShowcaseMainClassName() {
    this.url = this.router.url.split('/').pop();
    if (this.url === 'home') {
       this.showcaseClassName = 'main-showcase-home-content';
    } else {
       this.showcaseClassName = 'main-content';
    }
  }
}
