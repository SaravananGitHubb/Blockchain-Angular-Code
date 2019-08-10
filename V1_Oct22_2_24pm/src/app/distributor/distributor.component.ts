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
  selector: 'app-distributor',
  templateUrl: './distributor.component.html',
  styleUrls: ['./distributor.component.css']
})
export class DistributorComponent implements OnInit {

  inbound:boolean=false;
  outbound:boolean=true;
  inboundAccept:boolean=true;
  inboundReject:boolean=true;
  moredetails : boolean=true;
  assetCreated:boolean=true;
  assetTransferred:boolean=true;
 fileUrl;
 
  userName:string;
  searchText1:string;
  searchText2:string;
  Lotid: any;
  userid: any;
  AssetId: any;
  so:any;
  customerlocation: any;
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
  dsaccepttest: any;
  dsrejecttest: any;
  dscreatetest: any;
  dstransfertest: any;
  temprespstatus:any;
  temprespstatusa:any;

 /* inbound:boolean=false;
  outbound:boolean=true;
  inboundAccept=true;
  inboundReject=true;
  moredetails:boolean=true;
  assetCreated:boolean=true;
  assetTransferred:boolean=true;*/
  packingdate: any;
  useby: any;
  location: any;
  binlocation: any;
  racktype: any;
  deliverby: any;
  intime: any;  
  truckid: any;
  
  //deepak
  farmer_ID: any;
  Reason:any;
  lot_ID: any;
  ph_ID: any;
  Phlotid: any;
  PhlotId:any;
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
  tempwhlotid: any;
  tempphlotid: any;
  messageuser:boolean=true;  
  whlotIda: any;
    whlotIdb: any;
	  whlotIdc: any;
	    whlotIdd: any;
		
		  phlotIda: any;
    phlotIdb: any;
    phlotIdc: any;
    phlotIdd: any;
  
  constructor(private router: Router, private apiService:ApiService,private route:ActivatedRoute, private web3Service: Web3Service, private sanitizer: DomSanitizer
  ) {
    this.userid=this.route.snapshot.queryParams["userID"]
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
  
  inboundAcceptfn() {
    this.inboundAccept=false;
    this.inboundReject=true;

  }

  inboundRejectfn() {
    this.inboundReject=false;
    this.inboundAccept=true;

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
       var distributor=response[0];
       this.AssetId=distributor.assetid;
       this.userid=distributor.userid;
        this.Status=distributor.status;    
       this.Targetid=distributor.target;
       this.so=distributor.sono;
       this.truckid=distributor.truckid;
       this.deliverby=distributor.deliverby;
       this.customerlocation=distributor.customerlocation;
	   
	   /*
      "assetid": "3000",
      "userid": "Dist001",
      "status": "",
      "target": "",
      "sono": "loc1A",
      "truckid": "rack3B",
      "deliverby": "12-12-18",
      "customerlocation": "detroit"   
	   */
     }
    }
   );	
  }

  backtoOutbound(){
    this.moredetails=true;
    this.inbound=true;
    this.outbound=false;
  }

  createAsset(){
    this.assetCreated=false;
    this.assetTransferred=true;
  }

  public transfer(binlocation,intime){
        this.assetCreated=true;
        this.assetTransferred=false;
      }
	  
//backend

 async distreceivesLot(useridin, AssetIdin) {
	// debugger;
    if (!this.Processor) {
		console.log("Ramu:",this.Processor);
		
      /*this.setStatus*/console.log('Processor is not loaded, unable to send transaction');
      return;
    }
    console.log("working at 4 36pm:",this.Processor);
	console.log("useridin:",this.useridin);
	console.log("AssetIdin:",this.AssetIdin);
    const farmerId = useridin;
    const lotId = AssetIdin;	

    console.log('receives asset' + AssetIdin);
      console.log("account oct17:",this.account);
   // this.setStatus('Initiating transaction... (please wait)');
    try {
      const deployedProcessor = await this.Processor.deployed();
	  console.log("deployedProcessor",deployedProcessor);
      const transaction = await deployedProcessor.distreceiveLot.sendTransaction(useridin, AssetIdin, {from: this.account});

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
  this.dsaccepttest=1;
    this.searchWHAsset(AssetIdin, useridin);
/*},
5000);*/
this.messageuser=false;
    this.inboundAccept=false;
    this.inboundReject=true;		
  }

 async distrejectsLot(useridin, AssetIdin) {
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
      const transaction = await deployedProcessor.distrejectLot.sendTransaction(useridin, AssetIdin, {from: this.account});

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
  this.dsrejecttest=1;
    this.searchWHAsset(AssetIdin, useridin);
/*},
5000);	*/
this.messageuser=false;
    this.inboundReject=false;
    this.inboundAccept=true;	
  }  

 async createDistAsset(AssetId,PhlotId) {
    if (!this.Processor) {
		console.log("Ramu:",this.Processor);
      /*this.setStatus*/console.log('Processor is not loaded, unable to send transaction');
      return;
    }
    console.log("working at 4 36pm:",this.Processor);
    const ProcessorId = PhlotId;
	const lotId = AssetId;
   // const lotId = this.AssetId;
	console.log('Processor contract0' + PhlotId + ' to ' + AssetId);
    console.log('Processor contract2' + lotId + ' to ' + AssetId);

	  this.whlotIda = "2000";
this.whlotIdb = "2001";
this.whlotIdc = "2002";
this.whlotIdd = "2003";	

	  if (AssetId == 3000) {
      this.tempwhlotid =  this.whlotIda;
	  }
	  else 
	  if (AssetId == 3001) {
      this.tempwhlotid =  this.whlotIdb;
	  } else
	  if (AssetId == 3002) {
      this.tempwhlotid =  this.whlotIdc;
	  } else
	  if (AssetId == 3003) {
      this.tempwhlotid =  this.whlotIdd;	
	  }	
      console.log('whlotId', this.tempwhlotid);	 	
   // this.setStatus('Initiating transaction... (please wait)');
    try {
      const deployedProcessor = await this.Processor.deployed();
	  console.log("deployedProcessor",deployedProcessor);
      const transaction = await deployedProcessor.createDistAsset.sendTransaction(PhlotId, this.tempwhlotid, AssetId, {from: this.account});

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

  this.dscreatetest=1;
    this.searchAsset(AssetId);
/*},
3000);*/	
this.messageuser=false;	
    this.assetCreated=false;
    this.assetTransferred=true;	
  }

 async transferDistAsset(AssetId, PhlotId, Targetid) {
    if (!this.Processor) {
		console.log("Ramu:",this.Processor);
      /*this.setStatus*/console.log('Processor is not loaded, unable to send transaction');
      return;
    }
    console.log("working at 4 36pm:",this.Processor);
    const farmerId = PhlotId;
    const lotId = AssetId;	
    const phId = Targetid;

    console.log('transfer asset' + phId);

   // this.setStatus('Initiating transaction... (please wait)');
    try {
      const deployedProcessor = await this.Processor.deployed();
	  console.log("deployedProcessor",deployedProcessor);
      const transaction = await deployedProcessor.transferDistAsset.sendTransaction(PhlotId, this.tempwhlotid, AssetId, Targetid, {from: this.account});

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
{*/ this.dstransfertest=1;
    this.searchAsset(AssetId);
/*},
3000);	*/
this.messageuser=false;
	    this.assetCreated=true;
    this.assetTransferred=false;
  }
  
 async searchWHAsset(searchText1, searchText2) {
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
      const deployedProcessor = await this.Processor.deployed();
      console.log(deployedProcessor);
      console.log('Account', this.account);
	  console.log('searchText2:',searchText2);
	  console.log('searchText1', searchText1);
	  this.useridin = searchText2;
	  
	  this.AssetIdin = searchText1;
      this.temprespstatus = await deployedProcessor.readWhAsset.call(searchText2, searchText1);
      console.log('this.temprespstatus: ' + this.temprespstatus);






      if (this.dsaccepttest == 1) {
        while(this.temprespstatus == 2) {
               console.log("while is workking:");
               console.log("this.temprespstatus:", this.temprespstatus);
        
        
                this.temprespstatus = await deployedProcessor.readWhAsset.call(searchText2, searchText1);
               console.log('this.temprespstatus: ' + this.temprespstatus);
                setTimeout( () => {
        console.log("settieout:");
        
        },
        3000);
        }
        this.Statusin = "AssetAcceptedbyDist";
        }
  
  
        if (this.dsrejecttest == 1) {
          while(this.temprespstatus == 2) {
                 console.log("while is workking:");
                 console.log("this.temprespstatus:", this.temprespstatus);
          
          
                  this.temprespstatus = await deployedProcessor.readWhAsset.call(searchText2, searchText1);
                 console.log('this.temprespstatus: ' + this.temprespstatus);
                  setTimeout( () => {
          console.log("settimeout:");
          
          },
          3000);
          }
          this.Statusin = "AssetRejectedbyDist";
          }
  
  
  
          if (this.dscreatetest == 1) {
            while(this.temprespstatus == 0) {
                   console.log("while is workking:");
                   console.log("this.temprespstatus:", this.temprespstatus);
            
            
                    this.temprespstatus = await deployedProcessor.readWhAsset.call(searchText2, searchText1);
                   console.log('this.temprespstatus: ' + this.temprespstatus);
                    setTimeout( () => {
            console.log("settimeout:");
            
            },
            3000);
            }
            this.Statusin = "AssetCreated";
            }
  
            if (this.dstransfertest == 1) {
              while(this.temprespstatus == 1) {
                     console.log("while is workking:");
                     console.log("this.temprespstatus:", this.temprespstatus);
              
              
                     this.temprespstatus = await deployedProcessor.readWhAsset.call(searchText2, searchText1);
                     console.log('this.temprespstatus: ' + this.temprespstatus);
                      setTimeout( () => {
              console.log("settimeout:");
              
              },
              3000);
              }
              this.Statusin = "AssetTransferredtoDist";
              }
  
  










	  if (this.temprespstatus == 1){
		  this.Statusin = "AssetCreated";
	  }
	  else if (this.temprespstatus == 2)
		   {
		  this.Statusin = "AssetTransferredtoDist";
	  }
	  else if (this.temprespstatus == 3)
		   {
		  this.Statusin = "AssetAcceptedbyDist";
	  }
	  else if (this.temprespstatus == 4)
		   {
		  this.Statusin = "AssetRejectedbyDist";
	  }	 
	  	  else if (this.temprespstatus == 5)
		   {
		  this.Statusin = "LotRecalledbyWH";
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

 async searchAsset(searchText3) {
    console.log('Refreshing balance ph search');
			 this.messageuser=true;
    const phuserid = this.userid;
    this.AssetId = searchText3;
	  this.whlotIda = "2000";
this.whlotIdb = "2001";
this.whlotIdc = "2002";
this.whlotIdd = "2003";	

	  this.phlotIda = "1000";
this.phlotIdb = "1001";
this.phlotIdc = "1002";
this.phlotIdd = "1003";	

	  if (this.AssetId == 3000) {
      this.tempwhlotid =  this.whlotIda;
	  this.tempphlotid = this.phlotIda;
	  }
	  else 
	  if (this.AssetId == 3001) {
      this.tempwhlotid =  this.whlotIdb;
	  this.tempphlotid = this.phlotIdb;
	  } else
	  if (this.AssetId == 3002) {
      this.tempwhlotid =  this.whlotIdc;
	  this.tempphlotid = this.phlotIdc;
	  } else
	  if (this.AssetId == 3003) {
      this.tempwhlotid =  this.whlotIdd;	
	  this.tempphlotid = this.phlotIdd;
	  }		

    try {
		//debugger;
      const deployedProcessor = await this.Processor.deployed();
      console.log(deployedProcessor);
      console.log('Account', this.account);
	  console.log('AssetId', searchText3);
	  console.log('this.tempphlotid', this.tempphlotid);
	  console.log('this.tempwhlotid', this.tempwhlotid);
	  
	  console.log('phuserid', phuserid);
      this.temprespstatusa = await deployedProcessor.distState.call(this.tempphlotid, this.tempwhlotid, searchText3);
	  console.log("state:",this.temprespstatusa);	  
	  this.temprespstatus = this.temprespstatusa.toNumber();
	  console.log("state:",this.temprespstatus);
      console.log('Processor ID: ' + phuserid);






      if (this.dsaccepttest == 1) {
        while(this.temprespstatus == 2) {
               console.log("while is workking:");
               console.log("farmerID:", this.temprespstatus);
        
        
               this.temprespstatusa = await deployedProcessor.distState.call(this.tempphlotid, this.tempwhlotid, searchText3);
               console.log("state:",this.temprespstatusa);	  
               this.temprespstatus = this.temprespstatusa.toNumber();
             
                setTimeout( () => {
        console.log("settieout:");
        
        },
        3000);
        }
        this.Status = "AssetAcceptedbyPH";
        }


        if (this.dsrejecttest == 1) {
          while(this.temprespstatus == 2) {
                 console.log("while is workking:");
                 console.log("farmerID:", this.temprespstatus);
          
          
                  this.temprespstatusa = await deployedProcessor.distState.call(this.tempphlotid, this.tempwhlotid, searchText3);
                 console.log("state:",this.temprespstatusa);	  
                  this.temprespstatus = this.temprespstatusa.toNumber();
               
                  setTimeout( () => {
          console.log("settimeout:");
          
          },
          3000);
          }
          this.Status = "AssetRejectedbyPH";
          }



          if (this.dscreatetest == 1) {
            while(this.temprespstatus == 0) {
                   console.log("while is workking:");
                   console.log("farmerID:", this.temprespstatus);
            
            
                    this.temprespstatusa = await deployedProcessor.distState.call(this.tempphlotid, this.tempwhlotid, searchText3);
                   console.log("state:",this.temprespstatusa);	  
                    this.temprespstatus = this.temprespstatusa.toNumber();
                
                    setTimeout( () => {
            console.log("settimeout:");
            
            },
            3000);
            }
            this.Status = "AssetCreated";
            }

            if (this.dstransfertest == 1) {
              while(this.temprespstatus == 1) {
                     console.log("while is workking:");
                     console.log("farmerID:", this.temprespstatus);
              
              
                      this.temprespstatusa = await deployedProcessor.distState.call(this.tempphlotid, this.tempwhlotid, searchText3);
                     console.log("state:",this.temprespstatusa);	  
                      this.temprespstatus = this.temprespstatusa.toNumber();
                   
                      setTimeout( () => {
              console.log("settimeout:");
              
              },
              3000);
              }
              this.Status = "AssetTransferredtoWH";
              }





	  
	  if (this.temprespstatus == 1){
		  console.log("Deepak working2:",this.Status);
		  this.Status = "AssetCreated";
		  
		  console.log("Deepak working3:",this.Status);
	  }
	  else if (this.temprespstatus == 2)
		   {
		  this.Status = "AssetTransferredtoFSO";
	  }
	  else if (this.temprespstatus == 3)
		   {
		  this.Status = "AssetAcceptedbyFSO";
	  }
	  else if (this.temprespstatus == 4)
		   {
		  this.Status = "AssetRejectedbyFSO";
	  }	 
	  	  else if (this.temprespstatus == 5)
		   {
		  this.Status = "LotRecalledbyWH";
	  }
this.PhlotId = this.tempphlotid;	  
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
    
    this.messageuser=true;
	  
    } catch (e) {
      console.log(e);
      /*this.setStatus*/
	  console.log('Error getting balance; see log.');
    }
  }
  
 async searchStateAsset(AssetId, userid) {
    console.log('Refreshing balance');
			 this.messageuser=true;
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
      const deployedProcessor = await this.Processor.deployed();
      console.log(deployedProcessor);
      console.log('Account', this.account);
      const farmerID = await deployedProcessor.processState.call(farmerId, lotId);
      console.log('Farmer ID: ' + farmerID);
	  if (farmerID == 1){
		  this.Status = "AssetCreated";
	  }
	  else if (farmerID == 2)
		   {
		  this.Status = "AssetTransferredtoFSO";
	  }
	  else if (farmerID == 3)
		   {
		  this.Status = "AssetAcceptedbyFSO";
	  }
	  else if (farmerID == 4)
		   {
		  this.Status = "AssetRejectedbyFSO";
	  }	 
	  	  else if (farmerID == 5)
		   {
		  this.Status = "LotRecalledbyWH";
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

