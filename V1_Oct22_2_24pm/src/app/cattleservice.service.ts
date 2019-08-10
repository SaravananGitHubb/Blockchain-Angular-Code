import { Injectable } from '@angular/core';
import  { Cattle } from './cattle';
import { ApiService } from './api-service.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class CattleserviceService {
  lastId: number = 0;
  cattles: Cattle[] = [];
  id:number;

  constructor(private api: ApiService) { }

  
  
}
