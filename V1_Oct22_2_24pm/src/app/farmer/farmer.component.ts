import { Component, OnInit, Input } from '@angular/core';
import * as contract from 'truffle-contract';
import { FormGroup,FormControl } from '@angular/forms';
import { FormBuilder } from'@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api-service.service';
import {Web3Service} from '../util/web3.service';
import { DomSanitizer } from '@angular/platform-browser';
//import { Observable }from 'rxjs/Observable';
//import { Popup } from 'ng2-opd-popup';

declare let require: any;
const farmer_artifacts = require('../../../build/contracts/Farmer.json');
//const processor_artifacts = require('../../../build/contracts/Processor.json');

@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.component.html',
  styleUrls: ['./farmer.component.css']
})
export class FarmerComponent implements OnInit {
  @Input() 
  userName:string;
  searchText:string;
  Lotid: any;
  userid: any;
  AssetId: any;
  cattleType: any;
  BirthDate: any;
  Age:any;
  Weight: number;
  Location: String;
  hideAlert:boolean=true;
  moredetails:boolean=true;
  outbound:boolean=false;
  assetCreated:boolean=true;
  assetTransferred:boolean=true;
  certid:any;
  Targetid:any;
  Status:any;
  NgbdModalContent:any;
  myGroup:FormGroup;
  hideAlert1:boolean=true;
  hideAlert2:boolean=false;
  messageuser:boolean=true;
  fileUrl; 
  //deepak
  farmer_ID: any;
  Reason:any;
  lot_ID: any;
  ph_ID: any;
  State: any;
  status:any;
  modal:any;
  account:any;
  Farmer: any;
  accounts: string[];
  farmerID: any;
  lotID: any;
  state: any;
  phID: any;
  createst:any;
transferst:any;
tempfarmerID:any;
  
  //let reason = "Reason";

  constructor(private router: Router, private apiService:ApiService,private route:ActivatedRoute, private web3Service: Web3Service,private sanitizer: DomSanitizer ){
    this.userid=this.route.snapshot.queryParams["userID"];
    }
 //ClickButton(){this.popup.show();}
 public getassetid(AssetId){
   //debugger;
  this.apiService.getassetid(AssetId)
  .subscribe((response) => {
    if(response){
      var farmer=response[0];
      this.AssetId=farmer.assetid;
      this.userid=farmer.userid;
      this.Targetid=farmer.target;
      
    }
   }
  );
 }
 public addfarmer(){
   //debugger;
  this.apiService.addfarmer({"assetid":this.AssetId,"userid":this.userid,"target":this.Targetid,"location":this.Location,
  "weight":this.Weight,"cattletype":this.cattleType,})
  .subscribe((response) => {
    //debugger;
    if(response){
      this.assetCreated=false;
      this.assetTransferred=true;	
      // var farmer=response[0];
      // this.AssetId=farmer.assetid;
      // this.userid=farmer.userid;
    }
   }
  );
 }
//  cattleInit() {
//       this.hideAlert1=false;
//       this.hideAlert2=true;
//       //console.log('success!');
//       //this.router.navigate(['./cattle'],{queryParams:{userID:this.userName}})
//             }
  cancel() {
      this.hideAlert1=true;
        this.hideAlert2=false;
         }

  ngOnInit() {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
	//this.reloadPage();
	
    this.watchAccount();
      //let win = (window as any);
     /* if(win.location.search !== '?loaded' ) {
          win.location.search = '?loaded';
          win.location.reload();
      }	*/
    console.log("Deepak1",this.account);
	console.log("Deepak 4 pm:",farmer_artifacts);
    this.web3Service.artifactsToContract(farmer_artifacts)
     .then((FarmerAbstraction) => {
        this.Farmer = FarmerAbstraction;
		console.log("DeepakOct8:",FarmerAbstraction);
      });       	  
	 // this.testreload();
   /* this.myGroup = new FormGroup({
      Lotid:new FormControl(''),
      userid:new FormControl(''),
      AssetId:new FormControl(''),
      status:new FormControl(''),
      Targetid:new FormControl('')})       
	  
            }*/
			
			//reloadPage() {
 // this.router.navigate(['processinghouse'],{queryParams:{userID:this.userid}});
//this.router.navigate(["http://localhost:4200/Farmer"/*, { queryParams: {userID:this.userid}}*/);
 const data = 'some text';
    const blob = new Blob([data], { type: 'application/octet-stream' });
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
}


backtoOutbound(){
  this.moredetails=true;
    this.outbound=false;
}



testreload()
{
  if( window.localStorage )
  {
    if( !localStorage.getItem('firstLoad') )
    {
      localStorage['firstLoad'] = true;
      window.location.reload();
    }  
    else
      localStorage.removeItem('firstLoad');
  }
}

  /*public getcattledetails(AssetId){
              this.outbound=true;
              this.moredetails=false;
             // debugger;

            }*/
			
  public getcattledetails(AssetId){
              this.outbound=true;
              this.moredetails=false;
             // debugger;
             this.apiService.getcattledetails(AssetId)
             .subscribe((response) => {
               if(response){
                 var farmer=response[0];
                 this.cattleType=farmer.cattletype;
                 this.Weight=farmer.weight;
                 this.Location = farmer.location;
                // this.Targetid = farmer.target;
                 this.BirthDate = farmer.birthdate;
                 this.Age = farmer.age;
                 
               }
              }
             );
            }			
			
  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.account = accounts[0];
      console.log("Deepak2",this.account);
	  //window.location.reload();
	  //this.refreshData();
//      this.refreshBalance();
    });
  }
  
  // public addcattle(){
  //             debugger;
  //            this.apiService.addcattle({"cattletype":this.cattleType,"weight":this.Weight,
  //            "location":this.Location,"userid":this.userid})
  //            .subscribe((response) => {
  //              //debugger;
  //              if(response){
  //                this.hideAlert=false;
  //                // var farmer=response[0];
  //                // this.AssetId=farmer.assetid;
  //                // this.userid=farmer.userid;
  //              }
  //             }
  //            );
  //           }
   public  transfer(){
              //if(this.Location="")
              //debugger;
              //     console.log('coming inside PH function')
              // this.router.navigate(['processinghouse'],{queryParams:{userID:this.userid}});
             this.assetTransferred=false;
             this.hideAlert=true;
              
            }
			

 async createAssets(userid, AssetId) {
    if (!this.Farmer) {
		console.log("Ramu:",this.Farmer);
      /*this.setStatus*/console.log('Farmer is not loaded, unable to send transaction');
      return;
    }
    console.log("working at 4 36pm:",this.Farmer);
    const farmerId = userid;
	const lotId = AssetId;
   // const lotId = this.AssetId;
	console.log('Farmer contract0' + userid + ' to ' + AssetId);
      console.log('Farmer contract1' + farmerId + ' to ' + AssetId);
    console.log('Farmer contract2' + lotId + ' to ' + AssetId);

   // this.setStatus('Initiating transaction... (please wait)');
    try {
      const deployedFarmer = await this.Farmer.deployed();
	  console.log("deployedFarmer",deployedFarmer);
      const transaction = await deployedFarmer.createAsset.sendTransaction(userid, AssetId, AssetId, {from: this.account});

     if (!transaction) {
        /*this.setStatus*/console.log('Transaction failed!');
      } else {
        /*this.setStatus*/console.log('Create Asset complete complete!');
        console.log("Metamask check");
      } 
    } catch (e) {
      console.log(e);
    /*  this.setStatus('Error sending coin; see log.');*/
    }

/*	setTimeout(() => 
{*/
this.createst = 1;    
this.searchAsset(AssetId);
       console.log("create:",this.createst);
/*},
3000);*/	
this.messageuser=false;
//this.assetCreated=false;
//this.assetTransferred=true;	
  }

 async transferAsset(userid, AssetId, Targetid) {
    if (!this.Farmer) {
		console.log("Ramu:",this.Farmer);
      /*this.setStatus*/console.log('Farmer is not loaded, unable to send transaction');
      return;
    }
    console.log("working at 4 36pm:",this.Farmer);
    const farmerId = userid;
    const lotId = AssetId;	
    const phId = Targetid;
console.log('transfer assetuserid' + userid);
    console.log('transfer assetAssetId' + AssetId);
console.log('transfer asset' + phId);
   // this.setStatus('Initiating transaction... (please wait)');
    try {
      const deployedFarmer = await this.Farmer.deployed();
	  console.log("deployedFarmer",deployedFarmer);
      const transaction = await deployedFarmer.transferAsset.sendTransaction(userid, AssetId, Targetid, Targetid, {from: this.account});

     if (!transaction) {
        /*this.setStatus*/console.log('Transfer asset failed!');
      } else {
        /*this.setStatus*/console.log('Transfer asset complete!');
		this.Targetid = Targetid;
      } 
    } catch (e) {
      console.log(e);
    /*  this.setStatus('Error sending coin; see log.');*/
    }
/*	setTimeout(() => 
{*/
  this.transferst = 1;
		this.searchAsset(AssetId);
 /*}/*,
5000);*/
this.messageuser=false;
if (this.Status == "AssetTransferredtoPH")
{
  this.apiService.getassetid(AssetId)
  .subscribe((response) => {
    if(response){
      var farmer=response[0];
      this.Targetid=farmer.target;
      
    }
   }
  );	
}

	
  }
  
 async searchAsset(AssetId) {
	 this.messageuser=true;
    console.log('Refreshing balance');
    const farmeraId = "Far001";
    
	//hero:Hero[]=[];
	//farmerID:FarmerID[] = [];
	//var tupleArray: [(num1: Int, num2: Int)] = []

   // var farmerID: [(string1: String, string2: String, int3: Int)] = [];	
	//let stringToSplit = "abc def ghi";
//let x = stringToSplit.split(" ");
//console.log(x[0]);

    try {
      const deployedFarmer = await this.Farmer.deployed();
      console.log(deployedFarmer);
      console.log('Account', this.account);
      this.tempfarmerID = await deployedFarmer.readAsset.call(farmeraId, AssetId);
      console.log('Farmer ID: ' + this.tempfarmerID);


      if (this.createst == 1) {
        while(this.tempfarmerID == 0) {
               console.log("while is workking:");
               console.log("this.tempfarmerID:", this.tempfarmerID);
        
        
                this.tempfarmerID = await deployedFarmer.readAsset.call(farmeraId, AssetId);
                setTimeout( () => {
        console.log("settieout:");
        
        },
        3000);
        }
        this.Status = "Asset Created";
        this.createst=0;
        }



        if (this.transferst == 1) {
          while(this.tempfarmerID == 1) {
          console.log("while is workking1:");
           // console.log("this.tempfarmerID:", this.tempfarmerID);
  
  
           this.tempfarmerID = await deployedFarmer.readAsset.call(farmeraId, AssetId);
         //  this.tempfarmerID = this.farmerID.toNumber();
          console.log("this.tempfarmerID:",this.tempfarmerID);
          setTimeout( () => {
  
          console.log("settie1out:");
          },
           3000);
         }
           this.Status = "AssetTransferredtoPH";
           this.transferst=0;
        }





	  if (this.tempfarmerID == 1){
		  this.Status = "AssetCreated";
	  }
	  else if (this.tempfarmerID == 2)
		   {
		  this.Status = "AssetTransferredtoPH";
		  	  this.Targetid = "Ph001";
	  }
	  else if (this.tempfarmerID == 3)
		   {
		  this.Status = "AssetAcceptedbyPH";
		  	  this.Targetid = "Ph001";
	  }
	  else if (this.tempfarmerID == 4)
		   {
		  this.Status = "AssetRejectedbyPH";
		  	  this.Targetid = "Ph001";
	  }	  
	  else if (this.tempfarmerID == 5)
		   {
		  this.Status = "AssetRecalledbyWH";
		  	  this.Targetid = "Ph001";
    }		
    
    this.messageuser=true;
	  
	  this.AssetId = AssetId;	
	 // this.Targetid = this.Targetid;
//let stringToSplit = farmerID;
//let x = stringToSplit.split(",");
//StringToSplit.split(",");
//console.log(stringToSplit[0]);		  
	  //console.log(farmerID[0].string1);
	  
	  
	 //console.log('Farmer ID: ' + this.farmerID[0]);	  
	 // console.log('Lot ID: ' + lotID);
	 // console.log('state: ' + state);
	 // console.log('phID ID: ' + phID);
	  
      //this.userid = farmerID;
	 // this.AssetId = lotID;
	 // this.ph_ID = phID;
	  //this.State = state;
/*if (this.Status == "AssetTransferredtoPH")
{
this.assetCreated=true;
this.assetTransferred=false;		
}*/
	  
    } catch (e) {
      console.log(e);
      /*this.setStatus*/
	  console.log('Error getting balance; see log.');
    }
  } 			
}
