import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserProfile } from '../demo-app.model';
import { DemoAppService } from '../demo-app.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditRegistraionFormComponent } from '../edit-registraion-form/edit-registraion-form.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  id!: number;
  userProfile!: UserProfile[];

  constructor(
    private route: ActivatedRoute,
    private demoAppService: DemoAppService,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.loadData();
    });
  }

  loadData() {
    console.log("hi")
    this.demoAppService.getUserProfile(this.id).subscribe({
      next: (res: UserProfile[]) => {
        this.userProfile = res;
        console.log(this.userProfile);
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
      },
    });
  }

  getDefaultPhotoLocal(): string {
    return '../../../assets/sample-profile.png';
  }

  onEditRegisterationForm(userProfile: UserProfile[]) {
    this.matDialog
      .open(EditRegistraionFormComponent, {
        data: userProfile[0],
        width: '800px',
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (result === true) {
          this.loadData();
        }
      });
  }
}
