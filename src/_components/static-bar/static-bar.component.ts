import { Component, OnInit } from '@angular/core';
import { ProfileName } from '_models/profile/profileName';
import { Skill } from '_models/skill/skill';
import { Team } from '_models/team/team';
import { Duration } from '_models/duration';
import { UserProfile } from '_models/profile/userProfile';
import { ProjectProfile } from '_models/profile/projectProfile';
import { UniversityProfile } from '_models/profile/universityProfile';
import { UserProfileService } from '_service/profile/user/userProfile.service';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '_service/utils/utils.service';


@Component({
  selector: 'app-static-bar',
  templateUrl: 'static-bar.component.html',
  styleUrls: ['./static-bar.component.less']
})
export class StaticBarComponent implements OnInit {
  id: number;
  showMenu = false;
  private sub: any;
  user: UserProfile;
  showProjects = false;
  showUniversities = false;
  projects: Array<ProjectProfile>;
  universities: Array<UniversityProfile>;


  constructor(
    private route: ActivatedRoute,
    private utils: UtilsService,
    private userProfileService: UserProfileService,
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      // temporary id init
      // this.id = 162;
      // this.getUser(this.id);
  });
}

  getUser(id: number): void {
    this.userProfileService.getUser(id).subscribe(
        data => { this.user = data; },
    );
}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  toggleProjects() {
    this.showProjects = !this.showProjects;
  }

  toggleUniversities() {
    this.showUniversities = !this.showUniversities;
  }

  closeNav() {
    // document.getElementById('mySidenav').style.width = '0';
    this.showMenu = false;
  }

  openNav() {
    this.showMenu = true;
    // document.getElementById('mySidenav').style.width = '200px';
  }
}
