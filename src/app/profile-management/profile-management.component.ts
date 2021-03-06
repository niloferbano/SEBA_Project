
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from '../models/usermodel';
import { UserService } from '../services/index';
import { Router, ActivatedRoute , Params} from '@angular/router';

import { AlertService, AuthenticationService } from '../services/index';

@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: './profile-management.component.html'
})

export class ProfileManagementComponent implements OnInit {
  currentUser: User;
  loadedFeature = '';
  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const  temp  = localStorage.getItem('currentUser');
    const json = JSON.parse(temp);
    this.currentUser = json.user;

    // this.router.navigate(['getProfile'], {relativeTo: this.routes, queryParamsHandling: 'preserve'});
  }
  public logout() {
    localStorage.removeItem('currentUser');
    window.location.reload();

    this.ngOnInit();
  }
  ngOnInit() {
    console.log('-------', this.routes);
     // this.router.navigate(['getProfile'], {relativeTo: this.routes, queryParamsHandling: 'preserve'});
  }

}
