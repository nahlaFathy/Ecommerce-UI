declare var require: any
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AppComponent} from './app.component'
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { ErrorComponent } from './Components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrderComponent } from './components/order/order.component';
import { SliderComponent } from './components/home/slider/slider.component';
import { EventEmitterService } from './services/event-emitter.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthGuardService } from './services/auth-guard.service';
import { LogginAuthGuardService } from './services/loggin-auth-guard.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { OrdersComponent } from './components/orders/orders.component';
import { AboutComponent } from './components/about/about.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent, canActivate: [LogginAuthGuardService] },
  { path: 'login', component: LoginComponent, canActivate: [LogginAuthGuardService] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuardService] },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuardService] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuardService] },
  { path: 'about', component: AboutComponent },
  { path: '**', component: ErrorComponent },
]
@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ProductComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    FooterComponent,
    NavbarComponent,
    OrderComponent,
    CartComponent,
    SliderComponent,
    AboutComponent,
    OrdersComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    
    RouterModule.forRoot(routes),
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    EventEmitterService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
