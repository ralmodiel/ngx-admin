/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';
import { NB_WINDOW } from '@nebular/theme';

import { BUNDLE_LICENSE, BundlesService, Feature, Product } from '../../../@core/data/service/bundles.service';
import { Descriptions, DescriptionsService } from '../../../@core/data/service/descriptions.service';

@Component({
  selector: 'ngx-backend-bundles-section',
  templateUrl: 'backend-bundles-section.component.html',
  styleUrls: ['./backend-bundles-section.component.scss'],
})
export class BackendBundlesSectionComponent implements AfterViewInit {

  @Output() loaded = new EventEmitter();

  selectedLicenseType = BUNDLE_LICENSE.single;

  licenses = Object.values(BUNDLE_LICENSE);

  descriptions: Observable<Descriptions[]> = this.descriptionService.getBundleDescriptions();
  // bundles: Observable<Bundle[]> = this.bundlesService.getBundles();
  products: Observable<Product[]> = this.bundlesService.getProducts();
  features: Observable<Feature[]> = this.bundlesService.getFeatures();

  constructor(private descriptionService: DescriptionsService,
              private bundlesService: BundlesService,
              private activatedRoute: ActivatedRoute,
              private el: ElementRef<HTMLElement>,
              @Inject(NB_WINDOW) private window) {
  }

  ngAfterViewInit() {
    this.activatedRoute.fragment
      .pipe(
        filter(fragment => fragment === 'backend-bundles'),
        delay(500),
        take(1),
      )
      .subscribe((fragment: string) => {
        this.window.scrollTo(0, this.el.nativeElement.offsetTop);
      });
  }

  getBackground(url: string) {
    return {
      'background-image': `url(\'${url}\')`,
    };
  }
}
