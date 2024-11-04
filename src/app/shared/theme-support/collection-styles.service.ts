import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CollectionDataService } from '../../../app/core/data/collection-data.service';
import { RemoteData } from '../../../app/core/data/remote-data';
import { Collection } from '../../../app/core/shared/collection.model';
import {
  getFirstCompletedRemoteData,
} from '../../../app/core/shared/operators';


@Injectable({
  providedIn: 'root',
})
export class CollectionStylesDataService {
 
 constructor(private collectionService: CollectionDataService)
 { }

 private styledCollectionName: ReplaySubject<Collection> = new ReplaySubject(1);
 styledCollectionName$ = this.styledCollectionName.asObservable();

 setStyledCollectionName(collection: string) {
    const collectionRD$ = this.collectionService.findById(collection).pipe(
      getFirstCompletedRemoteData());
      
    collectionRD$.subscribe((collectionRD: RemoteData<Collection>) => {
      this.styledCollectionName.next(collectionRD.payload);
    });
 }
}
