import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DemoAppService } from '../demo-app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-registraion-form',
  templateUrl: './registraion-form.component.html',
  styleUrls: ['./registraion-form.component.css'],
})
export class RegistraionFormComponent {
  @ViewChild('chipInput') chipInput: ElementRef<HTMLInputElement> | any;

  form!: FormGroup;
  url: string = '';
  jobChips: string[] = [];
  imageWidth: number | undefined;
  imageHeight: number | undefined;

  constructor(
    private dialogRef: MatDialogRef<RegistraionFormComponent>,
    private router: Router,
    private demoAppService: DemoAppService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+$/),
        Validators.maxLength(20),
      ]),
      lastName: new FormControl(null),
      email: new FormControl(null),
      contact: new FormControl(null),
      age: new FormControl(null),
      state: new FormControl(''),
      country: new FormControl(''),
      address: new FormControl(null),
      jobs: new FormControl(''),
      newsletter: new FormControl(false),
      profilePhotoPath: new FormControl(null),
    });

    // console.log(this.form.controls['profilePhotoPath'].value);
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
          // event.target.value = null;
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
    this.form.controls['jobs'].setValue([this.jobChips]);

    // console.log(this.form.value);
    this.spinner.show();

    if (this.form.valid) {
      this.demoAppService.onAddUser(this.form.value).subscribe({
        next: (res) => {
          this.spinner.hide();

          this.snackBar.open('User registered successfully !!!', 'X', {
            duration: 5000,
          });

          this.dialogRef.close();
          this.router.navigate(['/user-profile', res.id]);
        },
        error: () => {
          this.spinner.hide();

          this.snackBar.open('Something went wrong...', 'X', {
            duration: 5000,
          });
        },
      });
    }
  }

  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
}
