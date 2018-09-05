import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Address } from '_models/address';
import { CompanyProfile } from '_models/profile/companyProfile';
import { CompanyProfileService } from '_service/profile/company/companyProfile.service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { UniversityProfile } from '_models/profile/universityProfile';
import { ProfileName } from '_models/profile/profileName';
import { UniversityProfileService } from '_service/profile/university/universityProfile.service';
import { DISABLED } from '../../../../node_modules/@angular/forms/src/model';

const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-company-university-edit-modal',
  templateUrl: './company-university-edit-modal.component.html',
  styleUrls: ['./company-university-edit-modal.component.less']
})
export class CompanyUniversityEditModalComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });

  address: Address;
  profileName: ProfileName;

  isCompany: boolean;
  isUniversity: boolean;

  submittedStudent: boolean = false;
  submittedUniversity: boolean = false;
  submittedCompany: boolean = false;

  addressFormGroup: FormGroup;
  registrationFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  fullNameFormGroup: FormGroup;
  socialServicesFormpGroup: FormGroup;

  accountStudentDetailsFormGroup: FormGroup;
  accountUniversityDetailsFormGroup: FormGroup;
  accountDetailsFormGroup: FormGroup;


  socialServices: string[];

  companyProfile: CompanyProfile;
  univeristyProfile: UniversityProfile;


  file: string;
  fileToUpload: File = null;

  countries = ['Poland', 'Germany', 'Spain']
  items = ['Select social media', 'github', 'twitter', 'facebook', 'instagram', 'linkedin', 'goldenline', 'youtube', 'pinterest', 'google', 'custom'];
  selected = ""




  isDisabled: Array<boolean> = [];
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private companyProfileService: CompanyProfileService,
    private universityProfileService: UniversityProfileService
  ) { }

  ngOnInit() {
    this.setDisableState();

    this.setDisableSocialInputs();
    if (this.isCompany) {
      this.address = this.companyProfile.address;
      this.profileName = this.companyProfile.profileName;
      this.createCompanyForm();
    }
    else if (this.isUniversity) {
      this.address = this.univeristyProfile.address;
      this.profileName = this.univeristyProfile.profileName;
      this.createUniversityForm();
    }
  }

  setDisableState() {

    for (let i = 0; i < 10; i++) {
      this.isDisabled.push(false);
    }
    this.isDisabled.forEach(element => {
      console.log(element);
    });
  }

  setDisableSocialInputs() {
    this.isDisabled.forEach((element, index) => { element = this.socialServices[index] == "" ? false : true })
  }

  close() {
    this.activeModal.close();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  createUniversityForm() {
    this.socialServicesFormpGroup = this.formBuilder.group({
      github: [''],
      twitter: [''],
      facebook: [''],
      instagram: [''],
      linkedin: [''],
      goldenline: [''],
      youtube: [''],
      pinterest: [''],
      google: [''],
      custom: [''],
    });

    this.addressFormGroup = this.formBuilder.group({
      town: [this.address.town, [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ]+")]],
      postalCode: [this.address.postCode, [Validators.required, Validators.pattern("^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]")]],
      street: [this.address.street, [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ]+")]],
      country: [this.address.country, [Validators.required]],
      houseNo: [this.address.houseNo, [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ0-9]+")]]
    });

    this.accountDetailsFormGroup = this.formBuilder.group({
      name: [this.univeristyProfile.profileName.name, [Validators.required]],
      address: this.addressFormGroup,
      socialServices: this.socialServicesFormpGroup,
      description: [this.univeristyProfile.description, [Validators.required]],
    })
  }

  createCompanyForm() {
    this.socialServicesFormpGroup = this.formBuilder.group({
      github: [this.socialServices[0]],
      twitter: [this.socialServices[1]],
      facebook: [this.socialServices[2]],
      instagram: [this.socialServices[3]],
      linkedin: [this.socialServices[4]],
      goldenline: [this.socialServices[5]],
      youtube: [this.socialServices[6]],
      pinterest: [this.socialServices[7]],
      google: [this.socialServices[8]],
      custom: [this.socialServices[9]]
    });

    this.addressFormGroup = this.formBuilder.group({
      town: [this.address.town, [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ]+")]],
      postalCode: [this.address.postCode, [Validators.required, Validators.pattern("^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]")]],
      street: [this.address.street, [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ]+")]],
      country: [this.address.country, [Validators.required]],
      houseNo: [this.address.houseNo, [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ0-9]+")]]
    });

    this.accountDetailsFormGroup = this.formBuilder.group({
      name: [this.companyProfile.profileName.name, [Validators.required]],
      address: this.addressFormGroup,
      description: [this.companyProfile.description, [Validators.required]],
      socialServices: this.socialServicesFormpGroup,
      socialValue: ['', [Validators.required]],
    })

  }

  addSocial() {
    //this.isGithubDisable = !this.isGithubDisable;
    //this.isTwitterDisable = !this.isTwitterDisable;
  }

  deleteSocialMedia() {
    //this.isGithubDisable = !this.isGithubDisable;
    //.isTwitterDisable = !this.isTwitterDisable;
  }

  onSubmitCompany() {
    this.setAddressDetails();
    this.setProfileName();
    this.setSocialServices();
    this.setProfileDescription();
    if (this.isCompany)
      this.companyProfileService.updateCompany(this.companyProfile).subscribe();
    else if (this.isUniversity)
      this.universityProfileService.updateUniversity(this.univeristyProfile).subscribe();
    this.activeModal.close();
  }


  setSocialServices() {
    this.socialServices[0] = this.socialServicesFormpGroup.get('github').value;
    this.socialServices[1] = this.socialServicesFormpGroup.get('twitter').value;
    this.socialServices[2] = this.socialServicesFormpGroup.get('facebook').value;
  }

  setProfileName() {
    this.profileName.name = this.accountDetailsFormGroup.get('name').value;
  }

  setProfileDescription() {
    if (this.isCompany)
      this.companyProfile.description = this.accountDetailsFormGroup.get('description').value;
    else if (this.isUniversity)
      this.univeristyProfile.description = this.accountDetailsFormGroup.get('description').value;
  }

  setAddressDetails() {
    this.address.town = this.addressFormGroup.get('town').value;
    this.address.postCode = this.addressFormGroup.get('postalCode').value;
    this.address.street = this.addressFormGroup.get('street').value;
    this.address.country = this.addressFormGroup.get('country').value;
    this.address.houseNo = this.addressFormGroup.get('houseNo').value;
  }

}

