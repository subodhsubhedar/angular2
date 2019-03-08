import { ContactMeComponent } from './contact-me/contact-me.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation/nav.component';
import { ProfileSummaryComponent } from './profile-summary/profile-summary.component';
import { ProfileHighlightsComponent } from './profile-highlights/profile-highlights.component';
import { ProjectsComponent } from './projects/projects.component';
import { PersonalDetailsComponent } from './personal/personal.component';
import { ExperienceComponent } from './experience/experience.component';
import { ContactService } from './contact-me/contact.service';
import { StatusMsgEmitterService } from './common/status-msg-emitter.service';

@NgModule({
  declarations: [
    AppComponent, NavigationBarComponent, ProfileSummaryComponent, ProfileHighlightsComponent,
    ProjectsComponent, PersonalDetailsComponent, ExperienceComponent, ContactMeComponent
  ],
  imports: [
    BrowserModule, FormsModule, RouterModule.forRoot([
      {
        path: 'profileSummary',
        component: ProfileSummaryComponent
      },
      {
        path: 'profileHighlights',
        component: ProfileHighlightsComponent,
      },
      {
        path: 'projects',
        component: ProjectsComponent
      },
      {
        path: 'experience',
        component: ExperienceComponent
      },
      {
        path: 'personaldetails',
        component: PersonalDetailsComponent
      },
      {
        path: 'contact',
        component: ContactMeComponent
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'profileSummary'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profileSummary'
      }
    ]
    )],
  providers: [ContactService, StatusMsgEmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
