import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import{ Apiservice } from '@'
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/Rx";
import { Profile } from '../../../node_modules/@types/selenium-webdriver/firefox';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName:string;
   pasWord:string;
   valid:boolean = true;
   public input: any;
   Profiles = [
     {key:"Farmer",value:"Farmer"},
     {key:"PhUser",value:"PhUser"},
     {key:"WhUser",value:"WhUser"},
     {key:"Distributer",value:"Distributer"},
   ]
   
   constructor(private router:Router) {
    
    }

  ngOnInit() {
  }
  onSubmit(){
    //debugger;
    if(this.userName.startsWith("Far")){
      this.router.navigate(['Farmer'],{queryParams:{userID:this.userName}});
    }
    
    else if(this.userName.startsWith("Ph")){
      this.router.navigate(['processinghouse'],{queryParams:{userID:this.userName}});

    }
    else if(this.userName.startsWith("Wh")){
      this.router.navigate(['warehouse'],{queryParams:{userID:this.userName}});

    }
    else if(this.userName.startsWith("Ds")){
      this.router.navigate(['distributor'],{queryParams:{userID:this.userName}});

    }
    }

}
