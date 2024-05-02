import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DemoAppComponent } from './demo-app.component';
import { Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { RegistraionFormComponent } from './registraion-form/registraion-form.component';
import { EditRegistraionFormComponent } from './edit-registraion-form/edit-registraion-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxSpinnerModule } from 'ngx-spinner';

export const routes: Routes = [
  { path: '', component: DemoAppComponent, pathMatch: 'full' },
  { path: 'user-profile/:id', component: UserProfileComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSliderModule,
    HttpClientModule,
    MatSnackBarModule,
    NgxSpinnerModule,
  ],
  declarations: [
    DemoAppComponent,
    RegistraionFormComponent,
    EditRegistraionFormComponent,
    UserProfileComponent,
  ],
})
export class DemoAppModule {}
