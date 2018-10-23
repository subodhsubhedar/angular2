import { ContactResolve } from './services/contact.resolve';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { ProfileComponent } from './components/profile.component';
import { AlwaysAuthGuardService } from './services/alwaysauthguard.service';
import { ContactComponent } from './components/contact.component';



const myRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AlwaysAuthGuardService] },
    { path: 'contacts/:id', component: ContactComponent, resolve : {
       resolvedContact: ContactResolve
    } },
    { path: '**', pathMatch: 'full', redirectTo: 'routePath' }

];
 
export const MyAppRouting = RouterModule.forRoot(myRoutes);
