import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recruiter-saved-search',
  templateUrl: './recruiter-saved-search.component.html',
  styleUrls: ['./recruiter-saved-search.component.css']
})
export class RecruiterSavedSearchComponent implements OnInit {
  savedSearchName: string;
  addToWatchDogCheck= false;
  jobTitle: string;
  keywordSearch;
  stemmedTerms = false;
  coreSkills;
  certificationValues;
  dontShowContractor;
  cityTownValue;
  includeRelocators = false;
  minRate: number;
  maxRate: number;
  dailyHourlyValue;
  timeLeftOnCutCont;
  includeUnavailable = false;
  showContractors;
  contractorName;
  educationValue;
  drivingLicenceValue;
  constructor() { }

  ngOnInit() {
  }

  saveSearch() {
  	var savedSearchSaveJson = {
  		'savedSearchName': this.savedSearchName,
  		'addToWatchDogCheck': this.addToWatchDogCheck,
  		'jobTitle': this.jobTitle,
  		'keywordSearch': this.keywordSearch,
  		'stemmedTerms': this.stemmedTerms,
  		'coreSkills': this.coreSkills,
  		'certificationValues': this.certificationValues,
  		'dontShowContractor': this.dontShowContractor,
  		'cityTownValue': this.cityTownValue,
  		'includeRelocators': this.includeRelocators,
  		'minRate': this.minRate,
  		'maxRate': this.maxRate,
  		'dailyHourlyValue': this.dailyHourlyValue,
        'timeLeftId': this.timeLeftOnCutCont,
  		'includeUnavailable': this.includeUnavailable,
  		'showContractorsId': this.showContractors,
  		'contractorName': this.contractorName,
  		'educationId': this.educationValue,
  		'industrySectorId': 1,
  		'securityId': 1,
  		'drivingLicenceValue': this.drivingLicenceValue
  	}
  }

}
