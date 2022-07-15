import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './Auth/registration/registration.component';
import { LoginComponent } from './Auth/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './Pages/product-list/product-list.component';
import { OrdersComponent } from './Admin/Components/orders/orders.component';
import { AdminComponent } from './Admin/admin.component';
import { AdminNavBarComponent } from './Admin/Components/admin-nav-bar/admin-nav-bar.component';
import { CategoryComponent } from './Admin/Components/category/category.component';
import { tokenInterceptor } from './Interceptors/tokenInterceptor';
import { RefreshTokenInterceptor } from './Interceptors/RefreshTokenInterceptor';
import { DishesComponent } from './Admin/Components/dishes/dishes.component';
import { IngredientsComponent } from './Admin/Components/ingredients/ingredients.component';

const routes: Routes = [
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, children: [
    {
      path: '',
      redirectTo: 'orders',
      pathMatch: 'full'
    },
    {
      path: 'orders',
      component: OrdersComponent
    },
    {
      path: 'category',
      component: CategoryComponent
    },
    {
      path: 'dishes',
      component: DishesComponent
    },
    {
      path: 'ingredients',
      component: IngredientsComponent
    },]
  },

  {path: '', component: ProductListComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ProductListComponent,
    OrdersComponent,
    AdminComponent,
    AdminNavBarComponent,
    CategoryComponent,
    DishesComponent,
    DishesComponent,
    IngredientsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: tokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
