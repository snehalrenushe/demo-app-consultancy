import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./demo-app/demo-app.module').then((m) => m.DemoAppModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
      onSameUrlNavigation: 'reload', // Added to solve refresh issue
      // useHash: true
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
