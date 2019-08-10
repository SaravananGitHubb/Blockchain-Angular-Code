/*  */import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FarmerComponent } from './farmer/farmer.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CattleComponent } from './cattle/cattle.component';
import { RouterModule,Routes} from '@angular/router';
import { APP_BASE_HREF} from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ProcessinghouseComponent } from './processinghouse/processinghouse.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './api-service.service';
import { HttpClientModule,HttpClient } from '../../node_modules/@angular/common/http';
import { DistributorComponent } from './distributor/distributor.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { RecallComponent } from './recall/recall.component';
import { HistoryComponent } from './history/history.component';
//changes - integration with backend
import { UtilModule } from './util/util.module';
import {Web3Service} from './util/web3.service';
import {TabModule} from 'angular-tabs-component'; 



//import { PopupModule } from 'ng2-opd-popup';
//import { Observable }from 'rxjs/observable';
//import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

const appRoutes:Routes = [
  { path:'', component: LoginComponent },
  { path:'Farmer', component: FarmerComponent },
  { path:'processinghouse', component: ProcessinghouseComponent },
  { path:'warehouse', component: WarehouseComponent },
  { path:'recall', component: RecallComponent },  
  { path:'distributor', component: DistributorComponent},
  { path:'history', component: HistoryComponent},
];

export function APIServiceFactory(http:HttpClient){
  return new ApiService(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FarmerComponent,
    CattleComponent,
    ProcessinghouseComponent,
    WarehouseComponent,
    DistributorComponent,
    RecallComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes), 
    HttpClientModule ,
    NgbModule.forRoot(),
	TabModule,
    
    //PopupModule.forRoot(),
    //NgbActiveModal,
    // NgbModal
  ],
  exports: [
    RouterModule
     ],
   providers: [{provide: APP_BASE_HREF, useValue : '/' },Web3Service,
   {provide: ApiService,
    useFactory:APIServiceFactory,
     deps:[HttpClient] }],
   bootstrap: [ AppComponent ]
})
export class AppModule { }
