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
  companySize = "100";
  addressName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  postCode;
  telephone = '';
  postalAddressLine1: string;
  postalAddressLine2: string;
  postalCity: string;
  postalCountry: string;
  postalPostCode;
  postalTelephone = '';
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
showMultipleAddress = false;
telephoneValidationFlag = false;
postalTelephoneValidationFlag = false;
otherTelephoneValidationFlag = false;
webAddValidationFlag = false;
emailAddValidationFlag = false;
rssUrlValidationFlag = false;
rssFeedUrlValidationFlag = false;
socialLinkValidationFlag = false;
twitterValidationFlag = false;
linkedinValidationFlag = false;
fullLinkedinValidationFlag = false;
sameAsPerAddFlag = false;
otherAddress =  {
  'addressLine1': '',
  'addressLine2': '',
  'city': '',
  'country': '',
  'postCode': '',
  'telephone': ''
};
profileUrl;
imageFile;
errorMsg = "";
//list = [];
//i = 0;
companySizeArray;
countryValueArray;
addMulAddArray = [{'addresslLine1': 'line1', 'addressLine1Name': 'address1', 'addressLine2': 'line2', 'addressLine2Name': 'address2', 'city': 'city', 'cityName': 'cityN', 'country': 'cou', 'countryName': 'country1', 'postCode': '12', 'postName': 'postN', 'telephone': '134', 'telephone1': 'teleP'}]
addMulSocialArray = [{'otherSocialLink': '', 'otherSocialFeed': '', 'otherRadio': ''}];
  constructor(public _commonRequestService: CommonRequestService) {
    this.addMulAddArray.splice(0,1);
    this.addMulSocialArray.splice(0,1);
   }

  ngOnInit() {
    this.companySizeList();
    this.countryList();
    this.getProfileDta()
  }

  companySizeList() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/company_sizes";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("company size--", data);
          this.companySizeArray = data.data;
          //this.recruiterNameArray = data.data;
        }
    );
  }

  countryList() {
     var input = {
     "email":"test@test7.com",
    "loginToken":"$2y$10$X12zQ8t.VhdVF68dSukD..WGaDyk87NB0ttZ2f42CZEiBPmr1IKWu"

   };
   console.log("input--", input);
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/nationalities";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("country size--", data);
          this.countryValueArray = data.data;
          //this.recruiterNameArray = data.data;
        }
    );
  }

  addMultiplePhone() {
    // this.i++;
    // this.list.push(this.i);
    // console.log("this.list--", this.list);
    var newItem = this.addMulAddArray.length + 1;
    console.log("this.addMulAddArray before", this.addMulAddArray)
    this.addMulAddArray.push({'addresslLine1': '', 'addressLine1Name': 'address1'+newItem, 'addressLine2': '', 'addressLine2Name': 'address2'+newItem, 'city': '', 'cityName': 'cityN'+newItem, 'country': '', 'countryName': 'country1'+newItem, 'postCode': '', 'postName': 'postN'+newItem, 'telephone': '', 'telephone1': 'teleP'+newItem})
    //newItem + 1;
    //this.showMultipleAddress = true;
    console.log("this.addMulAddArray afetr", this.addMulAddArray)
  }

  addAnotherSocialLink() {
    var newItem = this.addMulSocialArray.length + 1;
    console.log("this.addMulAddArray before", this.addMulSocialArray);
    this.addMulSocialArray.push({'otherSocialLink': '', 'otherSocialFeed': '', 'otherRadio': ''})
  }

  removeFunction(myObjects,prop,valu){
     return myObjects.filter(function (val) {
          return val[prop] !== valu;
      });
    }

  removeAddress(value) {
    console.log("value--", value);
    console.log("this.addMulAddArray", this.addMulAddArray)
    this.addMulAddArray = this.removeFunction(this.addMulAddArray,"addresslLine1",value.addresslLine1);
  }

  removeSocialLink(value) {
    console.log("value--", value);
    console.log("this.addMulSocialArray", this.addMulSocialArray)
    this.addMulSocialArray = this.removeFunction(this.addMulSocialArray,"otherSocialLink",value.otherSocialLink);
  }

  samePermanentAdd() {
    if(this.sameAsPerAddFlag) {
      this.postalAddressLine1 = this.addressLine1;
      this.postalAddressLine2 = this.addressLine2;
      this.postalCity = this.city;
      this.postalCountry = this.country;
      this.postalPostCode = this.postCode;
      this.postalTelephone = this.telephone;
    } else {
      this.postalAddressLine1 = '';
      this.postalAddressLine2 = '';
      this.postalCity = '';
      this.postalCountry = '';
      this.postalPostCode = '';
      this.postalTelephone = '';
    }
  }

   recruiterFileChangeEvent(fileInput: any) {
    //  var reader = new FileReader();
    // var readerByte = new FileReader();
    // reader.readAsDataURL(fileInput.target.files[0]);
    // reader.onload = (event:any) => {
    //   var arrayBuffer = reader.result;
    //   this.recruiterProfileUrl = arrayBuffer;
    // }
    // readerByte.onload = (event:any) => {
    //   var arrayBuffer = readerByte.result;  
    //   var fileBytes = new Uint8Array(arrayBuffer);
    //   this.fileArray = fileBytes;     
    // }
    // readerByte.readAsArrayBuffer(fileInput.target.files[0]);

    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.profileUrl = reader.result;
    }

    this.imageFile = fileInput.target.files[0];
    reader.readAsDataURL(this.imageFile);
    console.log("this.imageFile", this.imageFile);
  }

  telephoneValidation(value) {
    if(!value.match(/^\d{10}$/)) {
      this.telephoneValidationFlag = true;
    } else {
      this.telephoneValidationFlag = false;
    }
  }

  postalTelephoneValidation(value) {
    if(!value.match(/^\d{10}$/)) {
      this.postalTelephoneValidationFlag = true;
    } else {
      this.postalTelephoneValidationFlag = false;
    }
  }

  otherTelephoneValidation(value) {
    console.log("value", value);
    if(!value.match(/^\d{10}$/)) {
      this.otherTelephoneValidationFlag = true;
    } else {
      this.otherTelephoneValidationFlag = false;
    }
  }

  webAddressValidation(value) {
    if(!value.match(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/)) {
      this.webAddValidationFlag = true;
    } else {
      this.webAddValidationFlag = false;
    }
  }

  emailAddressValidation(value) {
    if(!value.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) {
      this.emailAddValidationFlag = true;
    } else {
      this.emailAddValidationFlag = false;
    }
  }

  rssUrlValidation(value) {
    if(!value.match(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/)) {
      this.rssUrlValidationFlag = true;
    } else {
      this.rssUrlValidationFlag = false;
    }
  }

  rssFeedUrlValidation(value) {
    if(!value.match(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/)) {
      this.rssFeedUrlValidationFlag = true;
    } else {
      this.rssFeedUrlValidationFlag = false;
    }
  }

  socialLinkValidation(value) {
    if(!value.match(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/)) {
      this.socialLinkValidationFlag = true;
    } else {
      this.socialLinkValidationFlag = false;
    }
  }

  twitterValidation(value) {
    if(!value.match(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/)) {
      this.twitterValidationFlag = true;
    } else {
      this.twitterValidationFlag = false;
    }
  }

  linkedinValidation(value) {
    if(!value.match(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/)) {
      this.linkedinValidationFlag = true;
    } else {
      this.linkedinValidationFlag = false;
    }
  }

  linkedinFeedValidation(value) {
    if(!value.match(/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/)) {
      this.fullLinkedinValidationFlag = true;
    } else {
      this.fullLinkedinValidationFlag = false;
    }
  }

  saveRecruiterProfile(form : NgForm) {
    var otherSocial = {}, otherAdd = {};
  //  alert(4)
  	 var inputprofileData = {
    "email":this.emailAddress,
    "loginToken":"$2y$10$AUQhfigHBiNAzCG9aSYZe.WEbqDIBNVxl6aBoSHJs8.oEuPFWMkHm",
		'companyDetails': {
			'companyName': this.companyName,
			'companySize': this.companySize,
			'companyAddress': this.addressName,
			'addressLine1': this.addressLine1,
			'addressLine2': this.addressLine2,
			'city': this.city,
			'country': this.country.toString(),
			'postCode': this.postCode,
			'telephone': this.telephone,
			'sameAsPermanentAddress': this.sameAsPerAddFlag.toString(),
			'postalAddressLine1': this.postalAddressLine1,
			'postalAddressLine2': this.postalAddressLine2,
			'postalCity': this.postalCity,
			'postalCountry': this.postalCountry.toString(),
			'postalPostCode': this.postalPostCode,
			'postalTelephoneNo': this.postalTelephone,
			'companyUrl': this.imageFile ? this.imageFile : './assets/images/big-tour.png'
      //'otherAddress': []
		},
		'companyDescription': this.companyDescription,
		'companySocial': {
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
			'otherSocialData' : []
		},
    'otherAddress': []
	};
  console.log("this.addMulAddArray before", this.addMulSocialArray);
  if(this.addMulSocialArray && this.addMulSocialArray.length > 0) {
    for(var i = 0; i<this.addMulSocialArray.length; i++) {
      if(this.addMulSocialArray[i].otherSocialLink) {
        otherSocial = {
          'Url': this.addMulSocialArray[i].otherSocialLink,
          'fullUrl': this.addMulSocialArray[i].otherSocialFeed,
          'displayFeed': this.addMulSocialArray[i].otherRadio
        }
        inputprofileData.companySocial.otherSocialData.push(otherSocial);
      }
    }
  }
  console.log("this.addMulAddArray", this.addMulAddArray);
  if(this.addMulAddArray && this.addMulAddArray.length > 0) {
    for(var i = 0; i<this.addMulAddArray.length; i++) {
      if(this.addMulAddArray[i].addresslLine1) {
        otherAdd = {
          'addressLine1': this.addMulAddArray[i].addresslLine1,
          'addressLine2': this.addMulAddArray[i].addressLine2,
          'city': this.addMulAddArray[i].city,
          'country': this.addMulAddArray[i].country.toString(),
          'postCode': this.addMulAddArray[i].postCode,
          'telephone': this.addMulAddArray[i].telephone
        }
        inputprofileData.otherAddress.push(otherAdd);
      } 
    }
  } else {
    inputprofileData.otherAddress.push(this.otherAddress);
  }
	console.log("recruiterProfileJson", inputprofileData);
     this.inputUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/profile/submit";
       this._commonRequestService.postData(this.inputUrl, inputprofileData).subscribe(
        data => {
          this.responseData = data;
          window.scroll(0,0);
          if(this.responseData.status === "TRUE"){
                  this.succesMessageFlag =true;
                  this.ErrorMesageFlag =false
          this.profileData={};
          this.errorMsg = "";
          }
          else{
             this.succesMessageFlag =false;
              this.ErrorMesageFlag =true;
              this.errorMsg = this.responseData.error[0];
          }
    
          // console.log("keySkill: ", this.listSignUpData);
        }
    ); 
  };





getProfileDta(){
   this.profileData =  this._commonRequestService.getDataWithoutObserval('recruiter-profile-view-data');
   console.log("this.pro--", this.profileData);
   var input={
        "email":"test@test7.com",
        "loginToken": ":$2y$10$AUQhfigHBiNAzCG9aSYZe.WEbqDIBNVxl6aBoSHJs8.oEuPFWMkHm"
      }
   var wsUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/recruiter/profile/view";
       this._commonRequestService.postData(wsUrl,input).subscribe(
        data => {
          console.log("profiledta--", data);
          if(data && data.data) {
            this.profileData = data.data;
            this.companyName =this.profileData['companyDetails'] && this.profileData['companyDetails'].companyName ? this.profileData['companyDetails'].companyName : "";
          this.companySize =this.profileData['companyDetails'] && this.profileData['companyDetails'].companySize ? this.profileData['companyDetails'].companySize : "";
          this.addressName =this.profileData['companyDetails'] && this.profileData['companyDetails'].companyAddress ? this.profileData['companyDetails'].companyAddress : "";
          this.addressLine1 =this.profileData['companyDetails'] && this.profileData['companyDetails'].addressLine1 ? this.profileData['companyDetails'].addressLine1 : "";
          this.addressLine2 =this.profileData['companyDetails'] && this.profileData['companyDetails'].addressLine2 ? this.profileData['companyDetails'].addressLine2 : "";
          this.city =this.profileData['companyDetails'] && this.profileData['companyDetails'].city ? this.profileData['companyDetails'].city : "";
          this.country =this.profileData['companyDetails'] && this.profileData['companyDetails'].country ? this.profileData['companyDetails'].country : "";
          this.postCode =this.profileData['companyDetails'] && this.profileData['companyDetails'].postCode ? this.profileData['companyDetails'].postCode : "";
          this.telephone =this.profileData['companyDetails'] && this.profileData['companyDetails'].telephone ? this.profileData['companyDetails'].telephone : "";
          this.sameAsPerAddFlag = this.profileData['companyDetails'] && this.profileData['companyDetails'].sameAsPermanentAddress === "true" ? true : false;
          this.profileUrl = this.profileData['companyDetails'] && this.profileData['companyDetails'].companyUrl ? this.profileData['companyDetails'].companyUrl : "";
          this.postalAddressLine1 =this.profileData['companyDetails'] && this.profileData['companyDetails'].postalAddressLine1 ? this.profileData['companyDetails'].postalAddressLine1 : "";
          this.postalAddressLine2 =this.profileData['companyDetails'] && this.profileData['companyDetails'].postalAddressLine2 ? this.profileData['companyDetails'].postalAddressLine2 : "";
          this.postalCity =this.profileData['companyDetails'] && this.profileData['companyDetails'].postalCity ? this.profileData['companyDetails'].postalCity : "";

          this.postalCountry =this.profileData['companyDetails'] && this.profileData['companyDetails'].postalCountry ? this.profileData['companyDetails'].postalCountry : "";
          this.postalPostCode =this.profileData['companyDetails'] && this.profileData['companyDetails'].postalPostCode ? this.profileData['companyDetails'].postalPostCode : "";
          this.postalTelephone =this.profileData['companyDetails'] && this.profileData['companyDetails'].postalTelephoneNo ? this.profileData['companyDetails'].postalTelephoneNo : ""; 
          this.fileArray =this.profileData['companyDetails'] && this.profileData['companyDetails'].fileArray ? this.profileData['companyDetails'].fileArray : "";
          this.companyDescription= this.profileData && this.profileData.companyDescription ? this.profileData.companyDescription : "";
          this.webAddress= this.profileData['companySocial'] && this.profileData['companySocial'].webAddress ? this.profileData['companySocial'].webAddress : "";
          this.emailAddress= this.profileData['companySocial'] && this.profileData['companySocial'].emailAddress ? this.profileData['companySocial'].emailAddress : "";

          this.rssUrl= this.profileData['companySocial'] && this.profileData['companySocial'].rssData && this.profileData['companySocial'].rssData.rssUrl ? this.profileData['companySocial'].rssData.rssUrl : "";
          this.fullUrlRssFeed= this.profileData['companySocial'] && this.profileData['companySocial'].rssData && this.profileData['companySocial'].rssData.fullUrlRssFeed ? this.profileData['companySocial'].rssData.fullUrlRssFeed : "";
          this.rssDisplayFeed= this.profileData['companySocial'] && this.profileData['companySocial'].rssData && this.profileData['companySocial'].rssData.rssDisplayFeed ? this.profileData['companySocial'].rssData.rssDisplayFeed : "";

          this.socialLinkName= this.profileData['companySocial'] && this.profileData['companySocial'].twitterData && this.profileData['companySocial'].twitterData.socialLinkName ? this.profileData['companySocial'].twitterData.socialLinkName : "";
          this.fullUrlTwitterFeed= this.profileData['companySocial'] && this.profileData['companySocial'].twitterData && this.profileData['companySocial'].twitterData.fullUrlTwitterFeed ? this.profileData['companySocial'].twitterData.fullUrlTwitterFeed : "";
          this.twitterDisplayFeed= this.profileData['companySocial'] && this.profileData['companySocial'].twitterData && this.profileData['companySocial'].twitterData.twitterDisplayFeed ? this.profileData['companySocial'].twitterData.twitterDisplayFeed : "";

          this.linkedinUrl= this.profileData['companySocial'] && this.profileData['companySocial'].linkedinData && this.profileData['companySocial'].linkedinData.linkedinUrl ? this.profileData['companySocial'].linkedinData.linkedinUrl : "";
          this.fullUrlLinkedinFeed= this.profileData['companySocial'] && this.profileData['companySocial'].linkedinData && this.profileData['companySocial'].linkedinData.fullUrlLinkedinFeed ? this.profileData['companySocial'].linkedinData.fullUrlLinkedinFeed : "";
          this.linkedinDisplayFeed= this.profileData['companySocial'] && this.profileData['companySocial'].linkedinData && this.profileData['companySocial'].linkedinData.linkedinDisplayFeed ? this.profileData['companySocial'].linkedinData.linkedinDisplayFeed : "";
          
          if(this.profileData['companySocial'] && this.profileData['companySocial'].otherSocialData && this.profileData['companySocial'].otherSocialData.length > 0) {
            for(var i = 0; i< this.profileData['companySocial'].otherSocialData.length; i++) {
              if(this.profileData['companySocial'].otherSocialData[i].Url) {
                this.addMulSocialArray.push({'otherSocialLink': this.profileData['companySocial'].otherSocialData[i].Url, 'otherSocialFeed': this.profileData['companySocial'].otherSocialData[i].fullUrl, 'otherRadio': this.profileData['companySocial'].otherSocialData[i].displayFeed})
              }
            }
          }

          if(this.profileData['otherAddress'] && this.profileData['otherAddress'].length > 0) {
            for(var i = 0; i< this.profileData['otherAddress'].length; i++) {
              if(this.profileData['otherAddress'][i].addressLine1) {
                var newItem = i;
                this.addMulAddArray.push({'addresslLine1': this.profileData['otherAddress'][i].addressLine1, 'addressLine1Name': 'address1'+newItem, 'addressLine2': this.profileData['otherAddress'][i].addressLine2, 'addressLine2Name': 'address2'+newItem, 'city': this.profileData['otherAddress'][i].city, 'cityName': 'cityN'+newItem, 'country': this.profileData['otherAddress'][i].country, 'countryName': 'country1'+newItem, 'postCode': this.profileData['otherAddress'][i].postCode, 'postName': 'postN'+newItem, 'telephone': this.profileData['otherAddress'][i].telephone, 'telephone1': 'teleP'+newItem})
              }
            }
            console.log('this.addMulAddArray--', this.addMulAddArray);
          }

          }
        }
    );

   if(this.profileData) {
  
}

// this.profileData.
  console.log(this.profileData,"view_data_recru");
}
}
