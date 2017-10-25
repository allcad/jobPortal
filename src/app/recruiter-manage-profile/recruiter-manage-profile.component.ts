import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { CommonRequestService } from '../common-request.service';

@Component({
  selector: 'app-recruiter-manage-profile',
  templateUrl: './recruiter-manage-profile.component.html',
  styleUrls: ['./recruiter-manage-profile.component.css']
})
export class RecruiterManageProfileComponent implements OnInit {
  recruiterProfileUrl: string;
  companyName: string;
  companySize;
  addressName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  postCode;
  telephone: number;
  postalAddressLine1: string;
  postalAddressLine2: string;
  postalCity: string;
  postalCountry: string;
  postalPostCode;
  postalTelephone: number;
  companyDescription: string;
  webAddress;
  emailAddress;
  rssUrl;
  fullUrlRssFeed;
  rssDisplayFeed;
  socialLinkName;
  fullUrlTwitterFeed;
  twitterDisplayFeed;
  linkedinUrl;
  fullUrlLinkedinFeed;
  linkedinDisplayFeed;
  fileArray;profileData;
  inputUrl;
responseData;
succesMessageFlag=false;
ErrorMesageFlag=false;
  constructor(public _commonRequestService: CommonRequestService) { }

  ngOnInit() {
    this.getProfileDta()
  }

   recruiterFileChangeEvent(fileInput: any) {
     var reader = new FileReader();
    var readerByte = new FileReader();
    reader.readAsDataURL(fileInput.target.files[0]);
    reader.onload = (event:any) => {
      var arrayBuffer = reader.result;
      this.recruiterProfileUrl = arrayBuffer;
    }
    readerByte.onload = (event:any) => {
      var arrayBuffer = readerByte.result;  
      var fileBytes = new Uint8Array(arrayBuffer);
      this.fileArray = fileBytes;     
    }
    readerByte.readAsArrayBuffer(fileInput.target.files[0]);
  }

  saveRecruiterProfile(form : NgForm) {
  //  alert(4)
  	 var inputprofileData = {
    "email":this.emailAddress,
    "loginToken":"$2y$10$AUQhfigHBiNAzCG9aSYZe.WEbqDIBNVxl6aBoSHJs8.oEuPFWMkHm",
		companyDetails: {
			'companyName': this.companyName,
			'companySize': this.companySize,
			'companyAddress': this.addressName,
			'addressLine1': this.addressLine1,
			'addressLine2': this.addressLine2,
			'city': this.city,
			'country': this.country,
			'postCode': this.postCode,
			'telephone': this.telephone,
			'sameAsPermanentAddress': false,
			'postalAddressLine1': this.postalAddressLine1,
			'postalAddressLine2': this.postalAddressLine2,
			'postalCity': this.postalCity,
			'postalCountry': this.postalCountry,
			'postalPostCode': this.postalPostCode,
			'postalTelephoneNo': this.postalTelephone,
			'companyUrl': this.fileArray
		},
		companyDescription: this.companyDescription,
		companySocial: {
			'webAddress': this.webAddress,
			'emailAddress': this.emailAddress,
			'rssData' : {
				'rssUrl': this.rssUrl,
				'fullUrlRssFeed': this.fullUrlRssFeed,
				'rssDisplayFeed': this.rssDisplayFeed
			},
			'twitterData' : {
				'twitterUrl': this.socialLinkName,
				'fullUrlTwitterFeed': this.fullUrlTwitterFeed,
				'twitterDisplayFeed': this.twitterDisplayFeed
			},
			'linkedinData' : {
				'linkedinUrl': this.linkedinUrl,
				'fullUrlLinkedinFeed': this.fullUrlLinkedinFeed,
				'linkedinDisplayFeed': this.linkedinDisplayFeed
			},
			'otherSocialData' : [{
				'Url': '',
				'fullUrl': '',
				'displayFeed': 'otherYes'
			}]
		}
	};
	console.log("recruiterProfileJson", inputprofileData);
     this.inputUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/profile/submit";
       this._commonRequestService.postData(this.inputUrl, inputprofileData).subscribe(
        data => {
          this.responseData = data;
          if(this.responseData.status === "TRUE"){
                  this.succesMessageFlag =true;
                  this.ErrorMesageFlag =false
          this.profileData={};
          }
          else{
             this.succesMessageFlag =false;
              this.ErrorMesageFlag =true;
              // this.responseData.status=""
          }
    
          // console.log("keySkill: ", this.listSignUpData);
        }
    ); 
  }






getProfileDta(){
   this.profileData =  this._commonRequestService.getDataWithoutObserval('recruiter-profile-view-data');
this.companyName =this.profileData['companyDetails'].companyName;
this.companySize =this.profileData['companyDetails'].companySize;
this.addressName =this.profileData['companyDetails'].addressName;
this.addressLine1 =this.profileData['companyDetails'].addressLine1;
this.addressLine2 =this.profileData['companyDetails'].addressLine2;
this.city =this.profileData['companyDetails'].city;
this.country =this.profileData['companyDetails'].country;
this.postCode =this.profileData['companyDetails'].postCode;
this.telephone =this.profileData['companyDetails'].telephone;
this.postalAddressLine1 =this.profileData['companyDetails'].postalAddressLine1;
this.postalAddressLine2 =this.profileData['companyDetails'].postalAddressLine2;
this.postalCity =this.profileData['companyDetails'].postalCity;

this.postalCountry =this.profileData['companyDetails'].postalCountry;
this.postalPostCode =this.profileData['companyDetails'].postalPostCode;
this.postalTelephone =this.profileData['companyDetails'].postalTelephone;
this.fileArray =this.profileData['companyDetails'].fileArray;
this.companyDescription= this.profileData.companyDescription;
this.webAddress= this.profileData['companySocial'].webAddress;
this.emailAddress= this.profileData['companySocial'].emailAddress;

this.rssUrl= this.profileData['companySocial'].rssData.rssUrl;
this.fullUrlRssFeed= this.profileData['companySocial'].rssData.fullUrlRssFeed;
this.rssDisplayFeed= this.profileData['companySocial'].rssData.rssDisplayFeed;

this.socialLinkName= this.profileData['companySocial'].twitterData.socialLinkName;
this.fullUrlTwitterFeed= this.profileData['companySocial'].twitterData.fullUrlTwitterFeed;
this.twitterDisplayFeed= this.profileData['companySocial'].twitterData.twitterDisplayFeed;

this.linkedinUrl= this.profileData['companySocial'].linkedinData.linkedinUrl;
this.fullUrlLinkedinFeed= this.profileData['companySocial'].linkedinData.fullUrlLinkedinFeed;
this.linkedinDisplayFeed= this.profileData['companySocial'].linkedinData.linkedinDisplayFeed;

// this.profileData.
  console.log(this.profileData,"view_data_recru");
}
}
