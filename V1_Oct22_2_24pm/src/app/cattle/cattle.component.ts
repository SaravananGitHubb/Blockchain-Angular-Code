import { Component, OnInit, Input } from '@angular/core';
import {Location } from '@angular/common';
import {Router } from '@angular/router';
import { Cattle } from '../cattle';
import { ApiService } from '../api-service.service';
import {  ActivatedRoute } from '@angular/router';
//import  { CattleserviceService } from 'src/app/cattleservice.service';

@Component({
  selector: 'app-cattle',
  templateUrl: './cattle.component.html',
  styleUrls: ['./cattle.component.css'],
  providers:[  ]
})
export class CattleComponent implements OnInit {
  valid:boolean = true;
  Cattles: Cattle[] = [];
  searchText:any;
  cattleType: any;
  BirthDate: any;
  Weight: number;
  Location: String;
  hideAlert:boolean=true;
  @Input()
  AssetId:any;
  userid:any
  //public animal: Animals[];
  constructor(private location: Location, private router:Router,private route:ActivatedRoute,
    private apiService:ApiService) {
      this.userid=this.route.snapshot.queryParams["userID"];
     }
  cancel(){
    this.location.back();
  }
  public ngOnInit() {}
  public getcattledetails(AssetId){
    //debugger;
   this.apiService.getcattledetails(AssetId)
   .subscribe((response) => {
     if(response){
       var farmer=response[0];
       this.cattleType=farmer.assetid;
       this.Weight=farmer.weight;
       this.Location = farmer.location;
     }
    }
   );
  }
    
//  public addcattle(){
//    debugger;
//   this.apiService.addcattle({"cattletype":this.cattleType,"weight":this.Weight,
//   "location":this.Location,"userid":this.userid})
//   .subscribe((response) => {
//     //debugger;
//     if(response){
//       this.hideAlert=false;
//       // var farmer=response[0];
//       // this.AssetId=farmer.assetid;
//       // this.userid=farmer.userid;
//     }
//    }
//   );
//  }
  pHouse(){
    if(this.Location="")
        console.log('coming inside PH function')
    this.router.navigate(['./processinghouse']);
  }


}
