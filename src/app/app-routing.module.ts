import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  // {
  //   path: "",
  //   redirectTo: "auth",
  //   pathMatch: "full"
  // },
  // {
  //   path: "auth",
  //   loadChildren:
  //     "./web/main/authentication/authentication.module#AuthenticationModule"
  // },
  {
    path: "",
    loadChildren:
      "./web/main/home/home.module#HomeModule"
  },
  {
    path: "**",
    loadChildren:
      "./web/main/home/home.module#HomeModule"
    //component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
