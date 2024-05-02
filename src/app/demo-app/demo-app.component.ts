import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistraionFormComponent } from './registraion-form/registraion-form.component';

@Component({
  selector: 'app-demo-app',
  templateUrl: './demo-app.component.html',
  styleUrls: ['./demo-app.component.css'],
})
export class DemoAppComponent {
  images = [
    '../../assets/homepage-bg-1.png',
    '../../assets/homepage-bg-1.png',
    '../../assets/homepage-bg-1.png',
    '../../assets/homepage-bg-1.png',
  ];
  currentIndex = 0;

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.startSlider();
  }

  startSlider() {
    setInterval(() => {
      if (this.currentIndex === this.images.length - 1) {
        this.currentIndex = 0; // Reset to the first image
      } else {
        this.currentIndex++;
      }
    }, 2000); // Change slide every 3 seconds
  }

  setCurrentIndex(index: number) {
    this.currentIndex = index;
  }

  slideWidth(): number {
    return document.querySelector('.slide')?.clientWidth || 0;
  }

  onRegisterationForm() {
    this.matDialog
      .open(RegistraionFormComponent, {
        width: '800px',
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (result === true) {
          // this.loadExpenses();
        }
      });
  }
}
