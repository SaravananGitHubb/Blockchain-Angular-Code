import { Component, OnInit } from '@angular/core';
import * as contract from 'truffle-contract';
import { FormGroup,FormControl } from '@angular/forms';
import { FormBuilder } from'@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api-service.service';
import {Web3Service} from '../util/web3.service';
import { DomSanitizer } from '@angular/platform-browser';

declare let require: any;
const farmer_artifacts = require('../../../build/contracts/Farmer.json');
const processor_artifacts = require('../../../build/contracts/Processor.json');


@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  userName:string;
  searchText1:string;
  searchText2:string;
  Lotid: any;
  userid: any;
  AssetId: any;
  useridin: any;
  AssetIdin: any;
  Statusin: any;
  certid:any;
  Targetid:any;
  Status:any;
  modal:any;
  NgbdModalContent:any;
  hideAlert:boolean=true;
  myGroup:FormGroup;
  inbound:boolean=false;
  outbound:boolean=true;
  inboundAccept=true;
  inboundReject=true;
  moredetails:boolean=true;
  assetCreated:boolean=true;
  assetTransferred:boolean=true;
  packingdate: any;
  useby: any;
  location: any;
    binLocation: any;
  racktype: any;
  deliverby: any;
  intime: any;
   iotdata:any;
  iotRejected:Boolean=true;
  temperature:any;
  startTime:any;
  Sensor:any;
  fileUrl;
   tempfarmerID:any;
  //deepak
  farmer_ID: any;
  Reason:any;
  lot_ID: any;
  ph_ID: any;
  Phlotid: any;
  State: any;
  status:any;
  account:any;
  Farmer: any;
  Processor: any;
  accounts: string[];
  farmerID: any;
  lotID: any;
  state: any;
  phID: any;
  tempphlotid: any;
  phlotIda: any;
    phlotIdb: any;
	  phlotIdc: any;
	    phlotIdd: any;
		transferreject:boolean=true;
  messageuser:boolean=true;
  phrejecttest:any;
  phcreatetest:any;
  phtransfertest:any;
  whaccepttest: any;
  whrejecttest: any;
  whcreatetest: any;
  whtransfertest: any;
  resultPHa:any;
  resultPH:any;
  
  constructor(private router: Router, private apiService:ApiService,private route:ActivatedRoute, private web3Service: Web3Service, private sanitizer: DomSanitizer  ) {
    this.userid=this.route.snapshot.queryParams["userID"]
   }

  
  inboundfn() {
    this.inbound=false;
    this.outbound= true;
    this.moredetails=true;
  }

  outboundfn() {
    this.inbound=true;
    this.outbound= false;
    this.moredetails=true;
  }
  mdetails(){
    this.moredetails=false;
    this.inbound=true;
    this.outbound=true;

  // debugger;
   this.apiService.mdetails(this.AssetId)
   .subscribe((response) => {
     if(response){
       var wareHouse=response[0];
       this.AssetId=wareHouse.assetid;
       this.userid=wareHouse.userid;
     
       this.Targetid=wareHouse.target;
       this.binLocation=wareHouse.binlocation;
       this.intime=wareHouse.intime;
       this.racktype=wareHouse.racktype;
       this.deliverby=wareHouse.deliverby;
       this.location=wareHouse.location;
     }
    }
   );

  }
  mdetailswh(){
    this.moredetails=false;
    this.inbound=true;
    this.outbound=true;

  // debugger;
   this.apiService.mdetailswh(this.AssetId)
   .subscribe((response) => {
     if(response){
       var wareHouse=response[0];
       this.AssetId=wareHouse.assetid;
       this.userid=wareHouse.userid;
     
       //this.Targetid=wareHouse.target;
       this.binLocation=wareHouse.binlocation;
       this.intime=wareHouse.intime;
       this.racktype=wareHouse.racktype;
       this.deliverby=wareHouse.deliverby;
       this.location=wareHouse.location;
     }
    }
   );

  }  
  backtoOutbound(){
    this.moredetails=true;
    this.inbound=true;
    this.outbound=false;
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
	console.log("Deepak 4 pm:",processor_artifacts);
    this.web3Service.artifactsToContract(processor_artifacts)
     .then((ProcessorAbstraction) => {
        this.Processor = ProcessorAbstraction;
		console.log("DeepakOct8:",ProcessorAbstraction);
      });
     //this.testreload();	  	  
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

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.account = accounts[0];
      console.log("Deepak2",this.account);
	  
	  //this.refreshData();
//      this.refreshBalance();
    });
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
  
  inboundAcceptfn() {
    this.inboundAccept=false;
    this.inboundReject=true;

  }

  inboundRejectfn() {
    this.inboundReject=false;
    this.inboundAccept=true;

  }
  createAsset(){
    this.assetCreated=false;
    this.assetTransferred=true;
  }
 /* public transfer(binLocation,intime){
//debugger;
    var intimestamp =this.intime;
    var seconds=intimestamp.getTime();
    this.apiService.transfer(this.binLocation)
    .subscribe((response) => {
      if(response){
        var iotdata=response[0];
        var endtimestamp=iotdata.endtime;
        }
     }
    );


    this.assetCreated=true;
    this.assetTransferred=false;
  }*/
  public transferwh(binLocation,AssetId, Phlotid, Targetid){
     //debugger;
	 
    if (this.binLocation=="loc1A"){
      this.Sensor="s1";
    }
    else if(this.binLocation=="loc2A"){
      this.Sensor="s2";
	  console.log("iot testing:",this.Sensor);
    }
    else if(this.binLocation=="loc3A"){
      this.Sensor="s3";
    }
    else if(this.binLocation=="loc4A"){
      this.Sensor="s4";
    }
    else if (this.binLocation=="loc5A"){
      this.Sensor="s5";
    }
	
    this.apiService.transfer(this.Sensor)
    .subscribe((response) => {
      if(response){
        //debugger;
        var iotdata = response[0];
        this.startTime= iotdata.starttime;
       const sTime = new Date(this.startTime);
      const iTime  = new  Date(this.intime);
console.log("stime:",sTime);
console.log("iTime:",iTime);      
console.log("binlocation:",this.binLocation);
if (iTime < sTime) {
        this.iotRejected=false;
          console.log('TransferRejected');
		  this.transferreject = false;
        }
        else{
		 this.transferWhAsset(this.AssetId, this.Phlotid, this.Targetid);
          this.assetCreated=true;
        this.assetTransferred=false;
        console.log('TrasnferAccepted!');
        }
     }
    }
    );
  }
    
  

  public createOutbound(){
    //debugger;
   this.apiService.createOutbound({"assetid":this.AssetId,"userid":this.userid,"lotid":this.Lotid})
   .subscribe((response) => {
     //debugger;
     if(response){
       this.hideAlert=false;
       // var farmer=response[0];
       // this.AssetId=farmer.assetid;
       // this.userid=farmer.userid;
     }
    }
   );
  }
  
  public getwhdetails(AssetIdin,useridin){
    //debugger;
   this.apiService.getwhdetails(AssetIdin,useridin)
   .subscribe((response) => {
     if(response){
       var processingHouse=response[0];
       this.AssetIdin=processingHouse.assetid;
       this.useridin=processingHouse.userid;
      
     }
    }
   );
  }





  public getwhdetailsoutbound(AssetId){
   //debugger;
   this.apiService.getwhdetailsoutbound(AssetId)
   .subscribe((response) => {
     if(response){
       var wareHouse=response[0];
       this.AssetId=wareHouse.assetid;
       this.userid=wareHouse.userid;
       //this.Targetid=wareHouse.target;
       this.binLocation=wareHouse.binlocation;
       this.intime=wareHouse.intime;
       this.racktype=wareHouse.racktype;
       this.deliverby=wareHouse.deliverby;
       this.location=wareHouse.location;
     }
    }
   );
  }

//DEEPAK's FUNCTIONS

//DEEPAK's FUNCTIONS INBOUND SEARCH

  async searchphAsset(searchText1, searchText2) {
	  		 this.messageuser=true;
			 this.transferreject=true;
    console.log('Refreshing balancePH');
    const farmerId = searchText2;
    const lotId = searchText1;	
	//hero:Hero[]=[];
	//farmerID:FarmerID[] = [];
	//var tupleArray: [(num1: Int, num2: Int)] = []

   // var farmerID: [(string1: String, string2: String, int3: Int)] = [];	
	//let stringToSplit = "abc def ghi";
//let x = stringToSplit.split(" ");
//console.log(x[0]);

    try {
      const deployedProcessor = await this.Processor.deployed();
      console.log(deployedProcessor);
      console.log('Account', this.account);
	  console.log('searchText2:',searchText2);
	  console.log('searchText1', searchText1);
	  this.useridin = searchText2;
	  
	  this.AssetIdin = searchText1;
      this.tempfarmerID = await deployedProcessor.processState.call(searchText1, searchText2);
      console.log('Farmer ID: ' + this.tempfarmerID);
	  if (this.tempfarmerID == 1){
		  this.Statusin = "AssetCreated";
	  }
	  else if (this.tempfarmerID == 2)
		   {
		  this.Statusin = "AssetTransferredtoWH";
	  }
	  else if (this.tempfarmerID == 3)
		   {
		  this.Statusin = "AssetAcceptedbyWH";
	  }
	  else if (this.tempfarmerID == 4)
		   {
		  this.Statusin = "AssetRejectedbyWH";
	  }	 	
	  else if (this.tempfarmerID == 5)
		   {
		  this.Statusin = "AssetRecalledbyWH";
	  }		  
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
	  
    } catch (e) {
      console.log(e);
      /*this.setStatus*/
	  console.log('Error getting balance; see log.');
    }
  } 	   
  
  
//DEEPAK's FUNCTIONS OUTBOUND SEARCH

  async searchAsset(searchText3) {
	  		 this.messageuser=true;
			 this.transferreject=true;
    console.log('Refreshing balance ph search');
    const phuserid = this.searchText2;
	//const phuserid = "Ph001";
    //const lotId = AssetId;	
	//hero:Hero[]=[];
	//farmerID:FarmerID[] = [];
	//var tupleArray: [(num1: Int, num2: Int)] = []

   // var farmerID: [(string1: String, string2: String, int3: Int)] = [];	
	//let stringToSplit = "abc def ghi";
//let x = stringToSplit.split(" ");
//console.log(x[0]);

    try {
      const deployedProcessor = await this.Processor.deployed();
      console.log(deployedProcessor);
      console.log('Account', this.account);
	  console.log('AssetId', searchText3);
	  console.log('phuserid', phuserid);
      this.resultPHa = await deployedProcessor.processState.call(searchText3, phuserid);
	  console.log("state:",this.resultPHa);	  
	  this.resultPH = this.resultPHa.toNumber();
	  console.log("state:",this.resultPH);
      console.log('Processor ID: ' + phuserid);




      if (this.whaccepttest == 1) {
             console.log("in while ths.resultph:",this.resultPH);
        while(this.resultPH == 2) {
               console.log("while is workking1:oct227pm");
               console.log("this.tempfarmerID1:", this.tempfarmerID);
        
        
                this.resultPHa = await deployedProcessor.processState.call(searchText3, phuserid);
               console.log("state:",this.resultPHa);	  
                this.resultPH = this.resultPHa.toNumber();
                setTimeout( () => {
        console.log("settieout:");
        
        },
        3000);
        }
        this.Statusin = "AssetAcceptedbyWH";
        console.log("acceptedbyWH");
        this.whaccepttest = 0;        
}


        if (this.whrejecttest == 1) {
          while(this.resultPH == 2) {
                 console.log("while is workking2:");
                 console.log("this.tempfarmerID2:", this.tempfarmerID);
          
          
                 this.resultPHa = await deployedProcessor.processState.call(searchText3, phuserid);
                 console.log("state:",this.resultPHa);	  
                  this.resultPH = this.resultPHa.toNumber();
                  setTimeout( () => {
          console.log("settimeout:");
          
          },
          3000);
          }
          this.Statusin = "AssetRejectedbyWH";
          this.whrejecttest = 0;          
}



          if (this.phcreatetest == 1) {
            while(this.resultPH == 0) {
                   console.log("while is workking3:");
                   console.log("this.tempfarmerID3:", this.tempfarmerID);
            
            
                   this.resultPHa = await deployedProcessor.processState.call(searchText3, phuserid);
               console.log("state:",this.resultPHa);	  
                this.resultPH = this.resultPHa.toNumber();
                    setTimeout( () => {
            console.log("settimeout:");
            
            },
            3000);
            }
            this.Statusin = "AssetCreated";
            this.phcreatetest = 0;            
}

            if (this.phtransfertest == 1) {
              while(this.resultPH == 1) {
                     console.log("while is workking4:");
                     console.log("this.tempfarmerID4:", this.tempfarmerID);
              
              
                     this.resultPH = await deployedProcessor.processState.call(searchText3, phuserid);
                     console.log("state:",this.resultPH);	  
                   //   this.resultPH = this.resultPHa.toNumber();
                      setTimeout( () => {
              console.log("settimeout:");
              
              },
              3000);
              }
              this.Statusin = "AssetTransferred";
               this.phtransfertest = 0;              
}




	  if (this.resultPH == 1){
		  this.Statusin = "AssetCreated";
	  }
	  else if (this.resultPH == 2)
		   {
		  this.Statusin = "AssetTransferred";
	  }
	  else if (this.resultPH == 3)
		   {
		  this.Statusin = "LotAcceptedbyWH";
	  }
	  else if (this.resultPH == 4)
		   {
		  this.Statusin = "LotRejectedbyWH";
    }	  
    


    this.messageuser=true;
//let stringToSplit = this.tempfarmerID;
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
	  
    } catch (e) {
      console.log(e);
      /*this.setStatus*/
	  console.log('Error getting balance; see log.');
    }
  }



//DEEPAK's FUNCTIONS INBOUND ACCEPT
  async whreceivesLot(useridin, AssetIdin) {
    // debugger;
      if (!this.Processor) {
      console.log("Ramu:",this.Processor);
      
        /*this.setStatus*/console.log('Processor is not loaded, unable to send transaction');
        return;
      }
      console.log("working at 4 36pm:",this.Processor);
      const farmerId = useridin;
      const lotId = AssetIdin;	
  
      console.log('receives asset' + AssetIdin);
  
     // this.setStatus('Initiating transaction... (please wait)');
      try {
        const deployedProcessor = await this.Processor.deployed();
      console.log("deployedProcessor",deployedProcessor);
        const transaction = await deployedProcessor.whreceiveLot.sendTransaction(AssetIdin, useridin, {from: this.account});
  
       if (!transaction) {
          /*this.setStatus*/console.log('Receive asset failed!');
        } else {
          /*this.setStatus*/console.log('Receive asset complete!');
        
        } 
      } catch (e) {
        console.log(e);
      /*  this.setStatus('Error sending coin; see log.');*/
      }
   /* setTimeout(() => 
  {  */ this.whaccepttest=1;
      this.searchAsset(AssetIdin);
 /* },
  5000);*/
this.messageuser=false;
  this.inboundAccept=false;
  this.inboundReject=true;
      
    }
  
//DEEPAK's FUNCTIONS INBOUND REJECT    
   async whrejectsLot(useridin, AssetIdin) {
      if (!this.Processor) {
      console.log("Ramu:",this.Processor);
        /*this.setStatus*/console.log('Processor is not loaded, unable to send transaction');
        return;
      }
      console.log("working at 4 36pm:",this.Processor);
      const farmerId = useridin;
      const lotId = AssetIdin;	
  
      console.log('receives asset' + AssetIdin);
  
     // this.setStatus('Initiating transaction... (please wait)');
      try {
        const deployedProcessor = await this.Processor.deployed();
      console.log("deployedProcessor",deployedProcessor);
        const transaction = await deployedProcessor.whrejectLot.sendTransaction(AssetIdin, useridin, {from: this.account});
  
       if (!transaction) {
          /*this.setStatus*/console.log('Receive asset failed!');
        } else {
          /*this.setStatus*/console.log('Receive asset complete!');
      
        } 
      } catch (e) {
        console.log(e);
      /*  this.setStatus('Error sending coin; see log.');*/
      }
 /*   setTimeout(() => 
  {*/

    this.whrejecttest=1;
      this.searchAsset(AssetIdin);
 /* },
  5000);	*/
this.messageuser=false;
  this.inboundReject=false;
  this.inboundAccept=true;
    
    }  


//DEEPAK's FUNCTIONS OUTBOUND CREATE 
    async createWhAsset(AssetId, Phlotid) {
      if (!this.Processor) {
      console.log("Ramu:",this.Processor);
        /*this.setStatus*/console.log('Processor is not loaded, unable to send transaction');
        return;
      }
      console.log("working at 4 36pm:",this.Processor);
      //const ProcessorId = Phlotid;
    //const AssetId = AssetId;
     // const AssetId = this.AssetId;
    console.log('Processor contract0' + Phlotid + ' to ' + Phlotid);
      console.log('Processor contract2' + AssetId + ' to ' + AssetId);
  
     // this.setStatus('Initiating transaction... (please wait)');
      try {
        const deployedProcessor = await this.Processor.deployed();
      console.log("deployedProcessor",deployedProcessor);
        const transaction = await deployedProcessor.createWhAsset.sendTransaction(Phlotid, AssetId, {from: this.account});
  
       if (!transaction) {
          /*this.setStatus*/console.log('Transaction failed!');
        } else {
          /*this.setStatus*/console.log('Create Asset complete complete!');
        } 
      } catch (e) {
        console.log(e);
      /*  this.setStatus('Error sending coin; see log.');*/
      }
 /*   setTimeout(() => 
  {*/
      this.whcreatetest=1;     
      this.searchAssetwh(AssetId);
 /* },
  3000);	*/	
this.messageuser=false;
  this.assetCreated=false;
  this.assetTransferred=true;
    
    }
  

//DEEPAK's FUNCTIONS OUTBOUND CREATE 

   async transferWhAsset(AssetId, Phlotid, Targetid) {
      if (!this.Processor) {
      console.log("Ramu:",this.Processor);
        /*this.setStatus*/console.log('Processor is not loaded, unable to send transaction');
        return;
      }
      console.log("working at 4 36pm:",this.Processor);
      //const farmerId = userid;
      const lotId = AssetId;	
      const phId = Targetid;
  
      console.log('transfer asset' + phId);
  
     // this.setStatus('Initiating transaction... (please wait)');
      try {
        const deployedProcessor = await this.Processor.deployed();
      console.log("deployedProcessor",deployedProcessor);
        const transaction = await deployedProcessor.transferWhAsset.sendTransaction(Phlotid, AssetId,  Targetid, {from: this.account});
  
       if (!transaction) {
          /*this.setStatus*/console.log('Transfer asset failed!');
        } else {
          /*this.setStatus*/console.log('Transfer asset complete!');
      
        } 
      } catch (e) {
        console.log(e);
      /*  this.setStatus('Error sending coin; see log.');*/
      }
 /*   setTimeout(() => 
  { */  this.whtransfertest=1;
      this.searchAssetwh(AssetId);
 /* },
  3000);	*/
 if (this.Status == "AssetTransferredtoDist")
 {	 
this.apiService.getwhdetailsoutbound(AssetId)
   .subscribe((response) => {
     if(response){
       var wareHouse=response[0];
       this.Targetid=wareHouse.target;
     }
    }
   );
 }  
 this.messageuser=false;
  this.assetCreated=true;
  this.assetTransferred=false;
    }    


    async searchAssetwh(searchText3) {
				 this.messageuser=true;
				 			 this.transferreject=true;
      console.log('Refreshing balancePH');
      //const whlotId = searchText4;
     // const phlotId = "1000";	
    //hero:Hero[]=[];
    //farmerID:FarmerID[] = [];
    //var tupleArray: [(num1: Int, num2: Int)] = []
  
     // var farmerID: [(string1: String, string2: String, int3: Int)] = [];	
    //let stringToSplit = "abc def ghi";
  //let x = stringToSplit.split(" ");
  //console.log(x[0]);
  
      try {
        const deployedProcessor = await this.Processor.deployed();
        console.log(deployedProcessor);
        console.log('Account', this.account);
      console.log('whlotid:',searchText3);

      //this.userid;
      this.Targetid = "DistID01";
      this.AssetId = searchText3;
	  
	  this.phlotIda = "1000";
this.phlotIdb = "1001";
this.phlotIdc = "1002";
this.phlotIdd = "1003";

	  if (searchText3 == 2000) {
      this.tempphlotid =  this.phlotIda;
	  }
	  else 
	  if (searchText3 == 2001) {
      this.tempphlotid =  this.phlotIdb;
	  } else
	  if (searchText3 == 2002) {
      this.tempphlotid =  this.phlotIdc;
	  } else
	  if (searchText3 == 2003) {
      this.tempphlotid =  this.phlotIdd;	
	  }	
      console.log('phlotId', this.tempphlotid);	  
        this.tempfarmerID = await deployedProcessor.readWhAsset.call(this.tempphlotid, searchText3);
        console.log('Processor ID: ' + this.tempfarmerID);
				this.Phlotid = this.tempphlotid;
    //this.Phlotid = phlotId;
    






    if (this.whaccepttest == 1) {
      while(this.tempfarmerID == 2) {
             console.log("while is workking:");
             console.log("this.tempfarmerID:", this.tempfarmerID);
      
      
              this.tempfarmerID = await deployedProcessor.readWhAsset.call(this.tempphlotid, searchText3);
              setTimeout( () => {
      console.log("settieout:");
      
      },
      3000);
      }
      this.Statusin = "AssetAcceptedbyWH";
       this.whaccepttest = 0;      
}


      if (this.whrejecttest == 1) {
        while(this.tempfarmerID == 2) {
               console.log("while is workking:");
               console.log("this.tempfarmerID:", this.tempfarmerID);
        
        
                this.tempfarmerID = await deployedProcessor.readWhAsset.call(this.tempphlotid, searchText3);
                setTimeout( () => {
        console.log("settimeout:");
        
        },
        3000);
        }
        this.Statusin = "AssetRejectedbyWH";
        this.whrejecttest = 0;        
}



        if (this.whcreatetest == 1) {
          while(this.tempfarmerID == 0) {
                 console.log("while is workking:");
                 console.log("this.tempfarmerID:", this.tempfarmerID);
          
          
                  this.tempfarmerID = await deployedProcessor.readWhAsset.call(this.tempphlotid, searchText3);
                  setTimeout( () => {
          console.log("settimeout:");
          
          },
          3000);
          }
          this.Status = "AssetCreated";
          this.whcreatetest = 0;          
}

          if (this.whtransfertest == 1) {
            while(this.tempfarmerID == 1) {
                   console.log("while is workking:");
                   console.log("this.tempfarmerID:", this.tempfarmerID);
            
            
                    this.tempfarmerID = await deployedProcessor.readWhAsset.call(this.tempphlotid, searchText3);
                    setTimeout( () => {
            console.log("settimeout:");
            
            },
            3000);
            }
            this.Status = "AssetTransferredtoDist";
            this.whtransfertest = 0;           
 }





  if (this.tempfarmerID == 1){
        this.Status = "AssetCreated";
      }
      else if (this.tempfarmerID == 2)
         {
        this.Status = "AssetTransferredtoDist";
		this.Targetid = "Ds001";
      }
      else if (this.tempfarmerID == 3)
         {
        this.Status = "AssetAcceptedbyDist";
		this.Targetid = "Ds001";
      }
      else if (this.tempfarmerID == 4)
         {
        this.Status = "AssetRejectedbyDist";
		this.Targetid = "Ds001";
      }	
 	        else if (this.tempfarmerID == 5)
         {
        this.Status = "LotRecalledbyWH";
		this.Targetid = "Ds001";
      }	 	




      this.messageuser=true;
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
      
      } catch (e) {
        console.log(e);
        /*this.setStatus*/
      console.log('Error getting balance; see log.');
      }
    } 




}

