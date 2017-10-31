import { Component, OnInit,NgModule } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { CommonRequestService } from '../common-request.service';

// import { Http,Response } from '@angular/http';

@Component({
  selector: 'app-contractor-sign-up',
  templateUrl: './contractor-sign-up.component.html',
  styleUrls: ['./contractor-sign-up.component.css']

})

export class ContractorSignUpComponent implements OnInit {
 userForm;
 inputData;
 contractor_first_name;
 contractor_last_name;
 contractor_email;
 contractor_tel_no;
 contractor_current_password;
 contractor_job_title;
 contractor_key_skills;
 fileForCV:any;contractor_employment_situation:any;contractService:any;
 contractor_rate;checkAgree;
 valid;
 fileForCv;
 dataForService:any;
 data;
 ErrorMesageFlag =false;
 contractor_agree_terms_status;
 contractor_services;
 keySkill;completeUrl;url;dataUrl;skillData=[];listSignUpData;inputUrl;fileUpload;succesMessageFlag=false;validateMsg;
 fd;
 categoryData = [];
 selectedSkill="";
 selectedSkillObject;
 selectedSkillArray=[];
 selectedSkillIdArray = [];
 constructor(public _commonRequestService: CommonRequestService) { }

ngOnInit() {
this.getKeySkillData();
this.getContractorServices();
}

    onFormSubmit(userForm:NgForm){
      this.inputData={
        "contractor_first_name" :this.contractor_first_name,
        "contractor_last_name":this.contractor_last_name,
        "contractor_email":this.contractor_email,
        "contractor_tel_no":this.contractor_tel_no,
        "contractor_current_password":this.contractor_current_password,
        "contractor_rate":this.contractor_rate ? this.contractor_rate : "200",
        "fileForCv":this.fd ,
        "contractor_job_title":this.contractor_job_title,
        "contractor_key_skills":this.selectedSkillIdArray,
        "contractor_employment_situation":this.contractor_employment_situation ? this.contractor_employment_situation : "permanant",
        "contractor_services": this.getSelecetdContractorServices(),
        "contractor_agree_terms_status" :this.contractor_agree_terms_status

      }
      console.log( this.inputData,"fdf")
   this.inputUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/signup";
       this._commonRequestService.postData(this.inputUrl, this.inputData).subscribe(
        data => {
          this.listSignUpData = data;
          if(this.listSignUpData.status === "TRUE"){
                  this.succesMessageFlag =true;
                  this.ErrorMesageFlag =false
          this.inputData={};
          }
          else{
            this.validateMsg = this.listSignUpData.error[0];
             this.succesMessageFlag =false;
              this.ErrorMesageFlag =true;
          }
    
          // console.log("keySkill: ", this.listSignUpData);
        }
    );     

}

     logRadio(value): void {
       this.contractor_employment_situation = value;
    }




  getKeySkillData() {
   this.dataUrl="http://dev.contractrecruit.co.uk/contractor_admin/api/get/contractre/skillist";
       this._commonRequestService.getData(this.dataUrl).subscribe(
        data => {
          this.skillData = data.data;
          console.log("keySkill: ", this.skillData);
        }
    );


  }

  
fileChangeEvent(fileInput: any) {
    var file = fileInput.target.files[0];
    this.fd = new FormData();
    this.fd.append('fileForCv', file);

    
  }
  getRangeSliderValue(event){
    this.contractor_rate =event.from;
  }


  getContractorServices(){
   var url ="http://dev.contractrecruit.co.uk/contractor_admin/api/post/contractre/hub/category";
    var inputJson = {
      "email" : "test@gmail.com",
      "loginToken":"$2y$10$S.H5i.UJ5CkSBHjinFY.VuWZ2kR8pDEcZGNtRrb1/lNBBNcw7gFBK"
    }
       this._commonRequestService.postData(url, inputJson).subscribe(
        data => {
          console.log("categoryData", data.data)
          this.categoryData = data.data;
         
        }
    );
  }
   

   getSelecetdContractorServices(){
     var selectedArray = [];
     for(var i=0; i<this.categoryData.length; i++){
       if(this.categoryData[i].checked){
         selectedArray.push(this.categoryData[i].contract_hub_category_id.toString())
       }
     }
     console.log("selectedArray", selectedArray);
     return selectedArray;
   }

   selectSkill(){
    if(this.selectedSkill){

      this.selectedSkillObject = this.getSkillObjectById(this.selectedSkill); 
      this.addSkill();
    }
    
  }

  addSkill(){
    if(this.selectedSkillObject && this.selectedSkillArray.indexOf(this.selectedSkillObject) == -1){
      this.selectedSkillIdArray.push(this.selectedSkillObject.skill_id.toString())
      this.selectedSkillArray.push(this.selectedSkillObject);
      this.selectedSkill = "";
    }
    
  }

  removeSelectedSkill(index){
    this.selectedSkillArray.splice(index, 1);
  }

  getSkillObjectById(skill_id){
    for(var i=0; i<this.skillData.length; i++){
      if(this.skillData[i].skill_id == skill_id){
        return this.skillData[i];
      }
    }
  }


}