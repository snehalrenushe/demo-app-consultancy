import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DemoAppService } from '../demo-app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserProfile } from '../demo-app.model';

@Component({
  selector: 'app-edit-registraion-form',
  templateUrl: './edit-registraion-form.component.html',
  styleUrls: ['./edit-registraion-form.component.css'],
})
export class EditRegistraionFormComponent {
  @ViewChild('chipInput') chipInput: ElementRef<HTMLInputElement> | any;

  form!: FormGroup;
  url: string = '';
  jobChips: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<EditRegistraionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserProfile,
    private router: Router,
    private demoAppService: DemoAppService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.url = this.data.profilePhotoPath;
    this.form = new FormGroup({
      firstName: new FormControl(this.data.firstName, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+$/),
        Validators.maxLength(20),
      ]),
      lastName: new FormControl(this.data.lastName),
      email: new FormControl(this.data.email),
      contact: new FormControl(this.data.contact),
      age: new FormControl(this.data.age),
      state: new FormControl(this.data.state),
      country: new FormControl(this.data.country),
      address: new FormControl(this.data.address),
      jobs: new FormControl(''),
      newsletter: new FormControl(this.data.newsletter),
      profilePhotoPath: new FormControl(null),
    });

    this.jobChips = this.data.jobs.reduce((acc, val) => acc.concat(val), []);
    console.log(this.jobChips);
  }

  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = () => {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        let ctx: any = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;

      console.log(img.src);
    });
  }

  add(chipValue: string) {
    if (chipValue) {
      this.jobChips.push(chipValue);
      this.form.controls['jobs'].setValue('');
    }
  }

  remove(chip: string) {
    const index = this.jobChips.indexOf(chip);
    if (index >= 0) {
      this.jobChips.splice(index, 1);
    }
  }

  onSelectFile(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;

      image.onload = () => {
        if (image.width === 310 && image.height === 325) {
          this.url = e.target.result;
        } else {
          alert('Please upload an image with dimensions 310x325 pixels.');
          event.target.value = null;
          this.url = '../../../assets/sample-profile.png';
        }
      };
    };

    reader.readAsDataURL(file);

    this.getBase64ImageFromURL(this.form.controls['profilePhotoPath'].value);
  }

  deleteProfilePhoto() {
    this.url = '../../../assets/sample-profile.png';
  }

  onCancel() {
    this.form.reset();
    this.jobChips = [];
    this.url = '../../../assets/sample-profile.png';
  }

  onSubmit() {
    this.form.controls['jobs'].setValue(this.jobChips);

    if (this.form.valid) {
      this.demoAppService
        .onEditUser(
          this.data.id,
          this.form.value.firstName,
          this.form.value.lastName,
          this.form.value.email,
          this.form.value.contact,
          this.form.value.age,
          this.form.value.state,
          this.form.value.country,
          this.form.value.address,
          this.form.value.jobs,
          this.form.value.newsletter,
          this.form.value.profilePhotoPath
        )
        .subscribe({
          next: (res) => {
            this.snackBar.open('User updated successfully !!!', 'X', {
              duration: 5000,
            });
            this.dialogRef.close(true);
          },
          error: () => {
            this.snackBar.open('Something went wrong...', 'X', {
              duration: 5000,
            });
          },
        });
    }
  }
}
