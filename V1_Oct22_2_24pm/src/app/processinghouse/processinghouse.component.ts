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
  selector: 'app-processinghouse',
  templateUrl: './processinghouse.component.html',
  styleUrls: ['./processinghouse.component.css']
})
export class ProcessinghouseComponent implements OnInit {

  userName:string;
  Lotid: any;
  userid: any;
  AssetId: any;
  useridin: any;
  AssetIdin: any;  
  searchText1:any;
  searchText2:any;
  certid:any;
  Targetid:any;
  Status:any;
    Statusin:any;
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
 fileUrl;
 phaccepttest: any;
 phrejecttest: any;
 phcreatetest: any;
 phtransfertest: any;
 FassetId:any;
  //deepak
  farmer_ID: any;
  Reason:any;
  lot_ID: any;
  ph_ID: any;
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
  messageuser:boolean=true;
  tempfarmerID:any;
  resultPHa:any;
  resultPH:any;
  
  constructor(private router: Router, private apiService:ApiService,private route:ActivatedRoute, private web3Service: Web3Service, private sanitizer: DomSanitizer ) {
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



   //debugger;
   this.apiService.mdetails(this.AssetId)
   .subscribe((response) => {
     if(response){
       var processingHouse=response[0];
       this.AssetId=processingHouse.assetid;
       this.userid=processingHouse.userid;
       //this.Status=processingHouse.status;
       this.Targetid=processingHouse.target;
       this.packingdate=processingHouse.packingdate;
       this.useby=processingHouse.useby;
       this.location=processingHouse.location;
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
    this.watchAccount();
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
  transfer(){
    this.assetCreated=true;
    this.assetTransferred=false;
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
  
  public getphdetails(AssetIdin,useridin){
    //debugger;
   this.apiService.getphdetails(AssetIdin,useridin)
   .subscribe((response) => {
     if(response){
       var farmer=response[0];
       this.AssetIdin=farmer.assetid;
       this.useridin=farmer.userid;
       this.Status=farmer.status;
     }
    }
   );
  }


  public getphdetailsoutbound(AssetId){
   //debugger;
   this.apiService.getphdetailsoutbound(AssetId)
   .subscribe((response) => {
     if(response){
       var processingHouse=response[0];
       this.AssetId=processingHouse.assetid;
       this.userid=processingHouse.userid;
       this.Status=processingHouse.status;
       //this.Targetid=processingHouse.target;
       this.packingdate=processingHouse.packingdate;
       this.useby=processingHouse.useby;
       this.location=processingHouse.location;
     }
    }
   );
  }

 async phreceivesLot(useridin, AssetIdin) {
	// debugger;
    if (!this.Farmer) {
		console.log("Ramu:",this.Farmer);
		
      /*this.setStatus*/console.log('Farmer is not loaded, unable to send transaction');
      return;
    }
    console.log("working at 4 36pm:",this.Farmer);
    const farmerId = useridin;
    const lotId = AssetIdin;	

    console.log('receives asset' + AssetIdin);
     console.log("oct17 this.account:",this.account);
   // this.setStatus('Initiating transaction... (please wait)');
    try {
      const deployedFarmer = await this.Farmer.deployed();
	  console.log("deployedFarmer",deployedFarmer);
      const transaction = await deployedFarmer.phreceiveLot.sendTransaction(useridin, AssetIdin, {from: this.account});

     if (!transaction) {
        /*this.setStatus*/console.log('Receive asset failed!');
      } else {
        /*this.setStatus*/console.log('Receive asset complete!');
			
      } 
    } catch (e) {
      console.log(e);
    /*  this.setStatus('Error sending coin; see log.');*/
    }
/*	setTimeout(() => 
{*/
    
    this.phaccepttest = 1;
    console.log("Accept:",this.phaccepttest);
    this.searchFmrAsset(AssetIdin, useridin);
   console.log("this phaccepttest called:");
/*},
5000);*/
this.messageuser=false;
    this.inboundAccept=false;
    this.inboundReject=true;		
  }

 async phrejectsLot(useridin, AssetIdin) {
    if (!this.Farmer) {
		console.log("Ramu:",this.Farmer);
      /*this.setStatus*/console.log('Farmer is not loaded, unable to send transaction');
      return;
    }
    console.log("working at 4 36pm:",this.Farmer);
    const farmerId = useridin;
    const lotId = AssetIdin;	

    console.log('receives asset' + AssetIdin);

   // this.setStatus('Initiating transaction... (please wait)');
    try {
      const deployedFarmer = await this.Farmer.deployed();
	  console.log("deployedFarmer",deployedFarmer);
      const transaction = await deployedFarmer.phrejectLot.sendTransaction(useridin, AssetIdin, {from: this.account});

     if (!transaction) {
        /*this.setStatus*/console.log('Receive asset failed!');
      } else {
        /*this.setStatus*/console.log('Receive asset complete!');
		
      } 
    } catch (e) {
      console.log(e);
    /*  this.setStatus('Error sending coin; see log.');*/
    }
/*	setTimeout(() => 
{*/
  this.phrejecttest = 1;
  console.log("Accept:",this.phaccepttest);
  this.searchFmrAsset(AssetIdin, useridin);
 console.log("this phaccepttest called:");
/*5000);*/	
this.messageuser=false;
    this.inboundReject=false;
    this.inboundAccept=true;	
  }  

 async createsAsset(AssetId, userid, FassetId) {
    if (!this.Processor) {
		console.log("Ramu:",this.Processor);
      /*this.setStatus*/console.log('Processor is not loaded, unable to send transaction');
      return;
    }
    console.log("working at 4 36pm:",this.Processor);
    const ProcessorId = userid;
	const lotId = AssetId;
   // const lotId = this.AssetId;
	console.log('Processor contract0' + userid + ' to ' + AssetId);
    console.log('Processor contract2' + lotId + ' to ' + AssetId);

   // this.setStatus('Initiating transaction... (please wait)');
    try {
      const deployedProcessor = await this.Processor.deployed();
	  console.log("deployedProcessor",deployedProcessor);
      const transaction = await deployedProcessor.createAsset.sendTransaction(AssetId, userid, AssetId, {from: this.account});

     if (!transaction) {
        /*this.setStatus*/console.log('Transaction failed!');
      } else {
        /*this.setStatus*/console.log('Create Asset complete complete!');
		
      } 
    } catch (e) {
      console.log(e);
    /*  this.setStatus('Error sending coin; see log.');*/
    }
/*	setTimeout(() => 
{*/
  this.phcreatetest = 1;
  this.FassetId = FassetId;
    this.searchAsset(AssetId);
/*},
3000);*/	
this.messageuser=false;	
    this.assetCreated=false;
    this.assetTransferred=true;	
  }

 async transfersAsset(AssetId, userid, Targetid) {
    if (!this.Processor) {
		console.log("Ramu:",this.Processor);
      /*this.setStatus*/console.log('Processor is not loaded, unable to send transaction');
      return;
    }
    console.log("working at 4 36pm:",this.Processor);
    const farmerId = userid;
    const lotId = AssetId;	
    const phId = Targetid;

    console.log('transfer asset' + phId);

   // this.setStatus('Initiating transaction... (please wait)');
    try {
      const deployedProcessor = await this.Processor.deployed();
	  console.log("deployedProcessor",deployedProcessor);
      const transaction = await deployedProcessor.transferAsset.sendTransaction(AssetId, userid,  Targetid, {from: this.account});

     if (!transaction) {
        /*this.setStatus*/console.log('Transfer asset failed!');
      } else {
        /*this.setStatus*/console.log('Transfer asset complete!');
		
      } 
    } catch (e) {
      console.log(e);
    /*  this.setStatus('Error sending coin; see log.');*/
    }
/*	setTimeout(() => 
{*/
  this.phtransfertest = 1;
    this.searchAsset(AssetId);
    
/*},
3000);*/	
this.messageuser=false;
if (this.Status == "AssetTransferredtoWH")
{
  this.apiService.getphdetailsoutbound(AssetId)
   .subscribe((response) => {
     if(response){
       var processingHouse=response[0];
       this.Targetid=processingHouse.target;
     }
    }
   );
}
	    this.assetCreated=true;
    this.assetTransferred=false;
  }
  
 async searchFmrAsset(searchText1, searchText2) {
    console.log('Refreshing balancePH');
		 this.messageuser=true;
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
      const deployedFarmer = await this.Farmer.deployed();
      console.log(deployedFarmer);
      console.log('Account', this.account);
	  console.log('searchText2:',searchText2);
	  console.log('searchText1', searchText1);
	  this.useridin = searchText2;
	  this.AssetIdin = searchText1;
      this.tempfarmerID = await deployedFarmer.readAsset.call(searchText2, searchText1);
      console.log('Farmer ID: ' + this.tempfarmerID);



      if (this.phaccepttest == 1) {
        while(this.tempfarmerID == 2) {
               console.log("while is workking:");
               console.log("this.tempfarmerID:", this.tempfarmerID);
        
        
                this.tempfarmerID = await deployedFarmer.readAsset.call(searchText2, searchText1);
                setTimeout( () => {
        console.log("settieout:");
        
        },
        3000);
        }
        this.Statusin = "AssetAcceptedbyPH";
        this.phaccepttest = 0;        
}


        if (this.phrejecttest == 1) {
          while(this.tempfarmerID == 2) {
                 console.log("while is workking:");
                 console.log("this.tempfarmerID:", this.tempfarmerID);
          
          
                 this.tempfarmerID = await deployedFarmer.readAsset.call(searchText2, searchText1);
                  setTimeout( () => {
          console.log("settimeout:");
          
          },
          3000);
          }
          this.Statusin = "AssetRejectedbyPH";
           this.phrejecttest = 0;         
 }



          if (this.phcreatetest == 1) {
            while(this.tempfarmerID == 1) {
                   console.log("while is workking:");
                   console.log("this.tempfarmerID:", this.tempfarmerID);
            
            
                   this.tempfarmerID = await deployedFarmer.readAsset.call(searchText2, searchText1);
                    setTimeout( () => {
            console.log("settimeout:");
            
            },
            3000);
            }
            this.Statusin = "AssetCreated";
             this.phcreatetest = 0;            
}

            if (this.phtransfertest == 1) {
              while(this.tempfarmerID == 2) {
                     console.log("while is workking:");
                     console.log("this.tempfarmerID:", this.tempfarmerID);
              
              
                     this.tempfarmerID = await deployedFarmer.readAsset.call(searchText2, searchText1);
                      setTimeout( () => {
              console.log("settimeout:");
              
              },
              3000);
              }
              this.Statusin = "AssetTransferredtoWH";
              this.phtransfertest = 0;             
 }






	  if (this.tempfarmerID == 1){
		  this.Statusin = "AssetCreated";
	  }
	  else if (this.tempfarmerID == 2)
		   {
		  this.Statusin = "AssetTransferredtoPH";
		    this.Targetid = "Wh001";
	  }
	  else if (this.tempfarmerID == 3)
		   {
		  this.Statusin = "AssetAcceptedbyPH";
		  this.Targetid = "Wh001";
	  }
	  else if (this.tempfarmerID == 4)
		   {
		  this.Statusin = "AssetRejectedbyPH";
		  this.Targetid = "Wh001";
	  }	 
	  	  else if (this.tempfarmerID == 5)
		   {
		  this.Statusin = "AssetRecalledbyWH";
		  this.Targetid = "Wh001";
    }	 
    

    this.messageuser=true;
//let stringToSplit = this.tempfarmerID;
//let x = stringToSplit.split(",");
//StringToSplit.split(",");
//console.log(stringToSplit[0]);		  
	  //console.log(this.tempfarmerID[0].string1);
	  
	  
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

 async searchAsset(searchText3) {
	 	 this.messageuser=true;
    console.log('Refreshing balance ph search');
    const phuserid = this.userid;
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
	  this.AssetId = searchText3;
	  //this.FassetId = FassetId;
	  console.log("state:",this.resultPH);
      console.log('Processor ID: ' + phuserid);






      if (this.phaccepttest == 1) {
        while(this.resultPH == 2) {
               console.log("while is workking:");
               console.log("this.tempfarmerID:", this.resultPH);
        
        
                this.resultPHa = await deployedProcessor.processState.call(searchText3, phuserid);
               console.log("state:",this.resultPHa);	  
                this.resultPH = this.resultPHa.toNumber();
                setTimeout( () => {
        console.log("settieout:");
        
        },
        3000);
        }
        this.Status = "AssetAcceptedbyPH";
        this.phaccepttest = 0;       
       
 }


        if (this.phrejecttest == 1) {
          while(this.resultPH == 2) {
                 console.log("while is workking:");
                 console.log("this.tempfarmerID:", this.resultPH);
          
          
                 this.resultPHa = await deployedProcessor.processState.call(searchText3, phuserid);
                 console.log("state:",this.resultPHa);	  
                  this.resultPH = this.resultPHa.toNumber();
                  setTimeout( () => {
          console.log("settimeout:");
          
          },
          3000);
          }
          this.Status = "AssetRejectedbyPH";
          this.phrejecttest = 0;         
 }



          if (this.phcreatetest == 1) {
            while(this.resultPH == 0) {
                   console.log("while is workking:");
                   console.log("this.tempfarmerID:", this.tempfarmerID);
            
            
                   this.resultPHa = await deployedProcessor.processState.call(searchText3, phuserid);
                   console.log("state:",this.resultPHa);	  
                    this.resultPH = this.resultPHa.toNumber();
                    setTimeout( () => {
            console.log("settimeout:");
            
            },
            3000);
            }
            this.Status = "AssetCreated";
            this.phcreatetest = 0;            
}

            if (this.phtransfertest == 1) {
              while(this.resultPH == 1) {
                     console.log("while is workking:");
                     console.log("this.tempfarmerID:", this.tempfarmerID);
              
              
                     this.resultPHa = await deployedProcessor.processState.call(searchText3, phuserid);
                     console.log("state:",this.resultPHa);	  
                      this.resultPH = this.resultPHa.toNumber();
                      setTimeout( () => {
              console.log("settimeout:");
              
              },
              3000);
              }
              this.Status = "AssetTransferredtoWH";
              this.phtransfertest = 0;             
 }










	  if (this.resultPH == 1){
		  this.Status = "AssetCreated";
	  }
	  else if (this.resultPH == 2)
		   {
		  this.Status = "AssetTransferredtoWH";
		  this.Targetid = "Wh001";
	  }
	  else if (this.resultPH == 3)
		   {
		  this.Status = "AssetAcceptedbyWH";
		  this.Targetid = "Wh001";
	  }
	  else if (this.resultPH == 4)
		   {
		  this.Status = "AssetRejectedbyWH";
		  this.Targetid = "Wh001";
	  }	 
	  	  else if (this.resultPH == 5)
		   {
		  this.Status = "AssetRecalledbyWH";
		  this.Targetid = "Wh001";
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
  
 async searchStateAsset(AssetId, userid) {
    console.log('Refreshing balance');
    const farmerId = "Far001";
    const lotId = AssetId;	
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
      this.tempfarmerID = await deployedFarmer.processState.call(farmerId, lotId);
      console.log('Farmer ID: ' + this.tempfarmerID);
	  if (this.tempfarmerID == 1){
		  this.Status = "AssetCreated";
	  }
	  else if (this.tempfarmerID == 2)
		   {
		  this.Status = "AssetTransferred";
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
  
}

