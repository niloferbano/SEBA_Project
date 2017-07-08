
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { User } from '../../models/usermodel';
import { UserService } from '../../services/index';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../../services/index';
// import {NgForm} from '@angular/forms';

@Component({
  moduleId:    module.id,
  selector:    'app-update-profile',
  templateUrl: './update-profile.component.html'
})

export class UpdateProfileComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  currentUser: User;
  UpdateStatus: string;


  @Output() featureSelected = new EventEmitter<string>();
  OnSelect(feature: string) {
    console.log('********on select*******', feature);
    this.featureSelected.emit(feature);
  }
  getAge(dateString) {
    // console.log("in getAge");
    const today = new Date();
    const birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const temp  = localStorage.getItem('currentUser');
    const json = JSON.parse(temp);
    this.currentUser = json.user;
  }

  ngOnInit() {
    console.log('in Oninit update profile');
    this.getUserProfile();
  }
  getUserProfile() {

    const sendData = {
      email : this.currentUser.email
    };
    this.userService.getUserProfile(sendData)
      .subscribe(
        currentUser => {
          this.currentUser = currentUser;
          this.currentUser.age =  Number(this.getAge(this.currentUser.birthdate));
          console.log('******** Current User: ', this.currentUser);
        }
        );
  }
  OnUpdateProfile() {
    this.UpdateStatus = 'successful';
    this.userService.onUpdateProfile(this.currentUser)
      .subscribe(
        data => {
          this.alertService.success('Profile Updated', true);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  UploadAvatar() {
    console.log('**********', this.currentUser.image);
    this.userService.uploadAvatar(this.currentUser)
      .subscribe(
        data => {
          this.alertService.success('Imaged Uploaded', true)
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      )
  }
  getImage(data) {
    if (data) {
      return data;
    }
    else {
      return "../../assets/img/avatar1.png";
    }
  }
  getInput(fileInput) {

    const reader = new FileReader();
    reader.onload = ((e: any) => {
      this.currentUser.image = e.target.result;
    });
    if (fileInput.target.files[0].size > 1024 * 50) {
      this.alertService.error("Choose a smaller file with 50kb size");
    }
    else {
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
