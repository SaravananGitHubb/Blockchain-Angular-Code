import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-service.service';

import { FormGroup,FormControl } from '@angular/forms';
import { FormBuilder } from'@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as contract from 'truffle-contract';
import {Web3Service} from '../util/web3.service';

declare let require: any;
const farmer_artifacts = require('../../../build/contracts/Farmer.json');
const processor_artifacts = require('../../../build/contracts/Processor.json');
@Component({
  selector: 'app-recall',
  templateUrl: './recall.component.html',
  styleUrls: ['./recall.component.css']
})
export class RecallComponent implements OnInit {
  
  userid: any;
  displayasset: any;
  account: any;
  Farmer: any;
  Processor: any;
  accounts: string[];
  tempphlotid: any;
  phlotIda: any;
    phlotIdb: any;
	  phlotIdc: any;
	    phlotIdd: any; 

  messageuser:boolean=true; 
  manualInput:boolean=true;
  recallItems = [];
  constructor(private router: Router, private apiService:ApiService,private route:ActivatedRoute, private web3Service: Web3Service ) { 
  this.userid=this.route.snapshot.queryParams["userID"]
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
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.account = accounts[0];
      console.log("Deepak2",this.account);
    });
  }  
 
 async recallAsset(searchText2) {
	 	  		 this.messageuser=false;
    if (!this.Processor) {
		console.log("Ramu:",this.Processor);
      console.log('Processor is not loaded, unable to send transaction');
      return;
    }
	this.displayasset = searchText2;
    console.log("working at 4 36pm:",this.Processor);
	const AssetId = searchText2;
		  this.phlotIda = "1000";
this.phlotIdb = "1001";
this.phlotIdc = "1002";
this.phlotIdd = "1003";

	  if (AssetId == 2000) {
      this.tempphlotid =  this.phlotIda;
	  }
	  else 
	  if (AssetId == 2001) {
      this.tempphlotid =  this.phlotIdb;
	  } else
	  if (AssetId == 2002) {
      this.tempphlotid =  this.phlotIdc;
	  } else
	  if (AssetId == 2003) {
      this.tempphlotid =  this.phlotIdd;	
	  }	
	  
    console.log('Processor contract2' + this.tempphlotid + ' to ' + AssetId);

    try {
      const deployedProcessor = await this.Processor.deployed();
	  console.log("deployedProcessor",deployedProcessor);
      const transaction = await deployedProcessor.recallWhAsset.sendTransaction(this.tempphlotid, searchText2, "Bad", {from: this.account});

     if (!transaction) {
        console.log('Transaction failed!');
      } else {
        console.log('Create Asset complete complete!');
      } 
    } catch (e) {
      console.log(e);
    }
	
  } 
  
  toggleTab(event)
  {
    if(event.tabTitle == "Auto Recall")
      this.automatedInputFn();
    else
      this.manualInputFn();
  }
  manualInputFn()
  {
    this.manualInput = true;   
  }

  automatedInputFn()
  {
    this.manualInput = false;
    this.recallItems = [{'asserid':'LOT1','source':'IOT'}, {'asserid':'LOT2','source':'IOT'}, {'asserid':'LOT3','source':'IOT'}, {'asserid':'LOT4','source':'IOT'},{'asserid':'LOT5','source':'IOT'}];
  }

}
