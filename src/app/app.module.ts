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
import { AuthGuard } from './Auth/auth.guard';
import { TableModule } from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import { DishComponent } from './Admin/Components/dishes/dish/dish.component';
import { ListComponent } from './Admin/Components/dishes/list/list.component';
import { YouTubePlayerModule} from '@angular/youtube-player';
import { ProductInfoComponent } from './Pages/product-info/product-info.component';
import { ProductsComponent } from './Pages/products/products.component';
import { CartComponent } from './Pages/cart/cart.component';
const routes: Routes = [
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin',canActivate: [AuthGuard], component: AdminComponent, children: [
    {
      path: '',
      redirectTo: 'orders',
      pathMatch: 'full',

    },
    {
      path: 'orders',
      component: OrdersComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'category',
      component: CategoryComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'dishes',
      component: DishesComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: 'dish/:dishId/:categoryId',
          component: DishComponent,
          canActivate: [AuthGuard],
        },
        {
          path: 'list',
          component: ListComponent,
          canActivate: [AuthGuard],
        },
        {
          path: '',
          redirectTo: 'list',
          pathMatch: 'full'
        },
      ]
    },
    {
      path: 'ingredients',
      component: IngredientsComponent,
      canActivate: [AuthGuard],
    },]
  },
  {path: 'products',
  component: ProductsComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: 'product-list',
      component: ProductListComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'product-info/:id',
      component: ProductInfoComponent,
      canActivate: [AuthGuard],
    },
    {
      path: '',
      redirectTo: 'product-list',
      pathMatch: 'full'
    },
  ]},

  {path: '', redirectTo: 'products', pathMatch: 'full'},
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
    DishComponent,
    IngredientsComponent,
    ListComponent,
    ProductInfoComponent,
    ProductsComponent,
    CartComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DropdownModule,
    TableModule,
    HttpClientModule,
    YouTubePlayerModule,
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
